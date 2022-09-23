
// --- Global Variables ---
const hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
let cityArr = [];
let locationTotals = [];

// ---- table's parent ---
let tableSection = document.getElementById('table-sect');
let tbl = document.getElementById('sales-table');
tableSection.appendChild(tbl);

let tBody = document.createElement('tbody');
tbl.appendChild(tBody);

// >>> grabbing the form id for Event listener <<<
let myForm = document.getElementById('my-form');




// --- Helper Functions ---

// function that generates random number of customers
// Math.random from MDN docs
function randomCust(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


// function that calculates simulated amounts of cookies
// Math.round from MDN docs
function cookiePurchased(avgCookie, cust) {
  return Math.round(avgCookie * cust);
}


//  Creating Constructors
function City(location, minCust, maxCust, avgCookie) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookie = avgCookie;
  this.numOfCust = [];
  this.cookiesPerHour = [];
  cityArr.push(this);
}

// Creating prototype methods
City.prototype.getNumCust = function() {
  for (let i = 0; i < hours.length; i++) {
    this.numOfCust.push(randomCust(this.minCust, this.maxCust));
  }
};

City.prototype.getNumOfCookies = function() {
  for (let i = 0; i < this.numOfCust.length; i++) {
    this.cookiesPerHour.push(cookiePurchased(this.avgCookie, this.numOfCust[i]));
  }
};


// >>> render method <<<
City.prototype.render = function() {

  // >>> Lab 07 <<<
  // --- create TABLE ----
  // let tBody = document.createElement('tbody');
  // tbl.appendChild(tBody);

  let trElem1 = document.createElement('tr');
  tBody.appendChild(trElem1);

  let tdElem1 = document.createElement('td');
  tdElem1.textContent = this.location;
  trElem1.appendChild(tdElem1);

  let sum = 0;
  for (let i = 0; i < hours.length; i++) {
    sum += this.cookiesPerHour[i];
    let tdElem2 = document.createElement('td');
    tdElem2.textContent = this.cookiesPerHour[i];
    trElem1.appendChild(tdElem2);
  }

  let tdElem2 = document.createElement('td');
  tdElem2.textContent = sum;
  trElem1.appendChild(tdElem2);
};


// ------ worked with TA Brandon on headerRender() ------
// modified some part to see if it works
function headerRender() {

  let tHead = document.createElement('thead');
  tbl.appendChild(tHead);

  let tableRow = document.createElement('tr');
  tHead.appendChild(tableRow);

  let thElem1 = document.createElement('th');
  thElem1.textContent = ' ';
  tableRow.appendChild(thElem1);

  for (let i = 0; i < hours.length; i++) {

    let thElem2 = document.createElement('th');
    thElem2.textContent = hours[i];
    tableRow.appendChild(thElem2);
    locationTotals[i] = 0;
  }
  let thElem3 = document.createElement('th');
  thElem3.textContent = 'Daily Location Total';
  tableRow.appendChild(thElem3);

}

// creating a footer function to add daily cookie total
// >> worked w/ TA Tammy, changed tBody variable to tFoot, she caught the
// missing j++ (causing my function to not work)
function footerRender() {

  let tFoot = document.createElement('tfoot');

  let tableRow2 = document.createElement('tr');
  // tFoot.appendChild(tableRow2);

  let tdElem4 = document.createElement('td');
  tdElem4.textContent = 'Total:';
  tableRow2.appendChild(tdElem4);

  let grandTotal = 0;

  for (let i = 0; i < hours.length; i++) {
    let totalPerHour = 0;
    console.log(totalPerHour);

    for (let j = 0; j < cityArr.length; j++) {
      totalPerHour += cityArr[j].cookiesPerHour[i];
    }
    grandTotal += totalPerHour;

    let tdElem5 = document.createElement('td');
    tdElem5.textContent = totalPerHour;
    tableRow2.appendChild(tdElem5);

  }

  let tdElem6 = document.createElement('td');
  tdElem6.textContent = grandTotal;
  tableRow2.appendChild(tdElem6);
  tFoot.appendChild(tableRow2);
  tbl.appendChild(tFoot);
}


// Creating objects using constructor
new City('Seattle', 23, 65, 6.3);
new City('Tokyo', 3, 24, 1.2);
new City('Dubai', 11, 38, 3.7);
new City('Paris', 20, 38, 2.3);
new City('Lima', 2, 16, 4.6);


// creating function to render/iterate through all prototype methods
function renderMethods() {
  for (let i = 0; i < cityArr.length; i++) {
    cityArr[i].getNumCust();
    cityArr[i].getNumOfCookies();
    cityArr[i].render();
  }
}

// invoke the renderMethods()
renderMethods();
headerRender();
footerRender();


// >>> Create Form <<<

// --- function to be called on Submit action ---
function handleSubmit(event) {
  event.preventDefault();

  // gathering info from form
  let location = event.target.loc.value;
  console.log(location);
  let minCust = +event.target.min.value;
  let maxCust = +event.target.max.value;
  let avgCookie = +event.target.avg.value;

  // create new City Object via Constructors
  let newCity = new City(location, minCust, maxCust, avgCookie);

  // Render City
  newCity.getNumCust();
  newCity.getNumOfCookies();

  console.log('newCity', newCity);
  console.log('cityArr', cityArr);


  // create table elements
  let row = document.createElement('trow');
  tBody.appendChild(row);

  let tdNew = document.createElement('td');
  tdNew.textContent = newCity.location;
  row.appendChild(tdNew);

  // let td2New = document.createElement('td');
  // td2New.textContent = newCity.cookiesPerHour;

  for (let i = 0; i < newCity.length; i++) {
    let tdNew = document.createElement('td');
    tdNew.textContent = newCity.cookiesPerHour[i];
    row.appendChild(tdNew);
    tBody.appendChild(row);

    // sum += this.cookiesPerHour[i];
    // let tdElem2 = document.createElement('td');
    // tdElem2.textContent = this.cookiesPerHour[i];
    // trElem1.appendChild(tdElem2);

  }

  // clear the form for next input
  myForm.reset();
}


//  >>> Attaching the Event Listener <<<
myForm.addEventListener('submit', handleSubmit);

// this.location = location;
// this.minCust = minCust;
// this.maxCust = maxCust;
// this.avgCookie = avgCookie;

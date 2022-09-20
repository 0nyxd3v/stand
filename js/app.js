// --- Global Variables ---
const hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
let cityArr = [];


// --- main parent ---
let salesSection = document.getElementById('sales-sect');
let tableSection = document.getElementById('table-sect');

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


// render method
City.prototype.render = function() {
  // create div
  let divElem = document.createElement('div');
  salesSection.appendChild(divElem); // adding divElem to our parent section


  // create h2
  let h2Elem = document.createElement('h2');
  h2Elem.textContent = this.location; // adding location name to h2
  divElem.appendChild(h2Elem);


  // create ul
  let ulElem = document.createElement('ul');
  divElem.appendChild(ulElem);

  let sum = 0;
  for (let i = 0; i < hours.length; i++) {
    let liElem = document.createElement('li');
    liElem.textContent = hours[i] + ': ' + this.cookiesPerHour[i] + ' cookies';
    sum += this.cookiesPerHour[i];
    // if (i === hours.length - 1) {     // -> won't work
    //   liElem.textContent = `Total: ${sum} cookies`;
    // }
    ulElem.appendChild(liElem);
  }
  // this works, prints total
  let liTotal = document.createElement('li');
  liTotal.textContent = `Total: ${sum} cookies`;
  ulElem.appendChild(liTotal);




  // --- creating TABLE to display location and cookie sales per hour ---

  // creating section for table


  // grabbing table in the html
  let salesTable = document.getElementById('sales-table');
  tableSection.appendChild(salesTable);


  let tHead = document.createElement('thead');
  salesTable.appendChild(tHead);

  let tableRow = document.createElement('tr');
  tHead.appendChild(tableRow);

  let tBody = document.createElement('tbody');
  salesTable.appendChild(tBody);

  for (let i = 0; i < 17; i++) {
    let thElem = document.createElement('th');
    let tdElem = document.createElement('td');

    // create th element
    if (i === 0) {
      thElem.textContent = ' ';
    } else if (i === 16) {
      thElem.textContent = 'Daily Location Total';
    } else {
      thElem.textContent = hours[i];

      tdElem.textContent = this.cookiesPerHour[i];
    }




    tableRow.appendChild(thElem);
    tableRow.appendChild(tdElem);

  }


};


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

/*function setup() {
    // Write your code here.
}

// Example case. 
document.body.innerHTML = `
<div class="image">
  <img src="https://goo.gl/kjzfbE" alt="First">
  <button class="remove">X</button>
</div>
<div class="image">
  <img src="https://goo.gl/d2JncW" alt="Second">
  <button class="remove">X</button>
</div>`;

setup();

document.getElementsByClassName("remove")[0].click();
console.log(document.body.innerHTML);*/
/*
function format(userDate) {
    splitDate = userDate.split('/');
    newDate = splitDate[2] + splitDate[0] + splitDate[1];
    return newDate;
}

console.log(format('12/31/2014'));
console.log(format('13/08/2020'));*/

//user date has to be strings and result also. And final result will look like '20141231'.

var john = {
  firstName: 'John',
  lastName: 'Smith',
  birthYear: 1992,
  family: ['Jane', 'Mark', 'Bob', 'Emily'],
  job: 'teacher',
  isMarried: false,
  calcAge: function () {
    this.age = 2018 - this.birthYear;
  }
};

john.calcAge();
console.log(john);
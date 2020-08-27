//Es5
/*  const variable doesnt change its value
var name5 = 'John Smith';
var age5 = 23;
name5 = 'John Miller';
console.log(name5)

//Es6
const name6 = 'John Smith';
let age6 = 23;
//name6 = 'John Miller';
console.log(name6);
*/

//Es5
/* these are function scope   {we can access name here in es5 but not in Es6 because let and const are block scope not function scope}
function driverLicense5(passedTest) {
    if (passedTest) {
        var name = 'john';
        var yearOfBirth = 1990;
    }
    console.log(name + ' born in ' + yearOfBirth + ' is officially can drive the cars.');
} 

driverLicense5(true);

//Es6
These are block scope
function driverLicense6(passedTest) {
    if (passedTest) {
        let name = 'john';
        const yearOfBirth = 1990;
    }
    //console.log(name + 'born in ' + yearOfBirth + ' is officially can drive the car.');
}

driverLicense6(false);

let i = 23;

for (i= 0 ; i<5 ; i++) {
    console.log(i);
}

console.log(i);   // result will be 0,1,2,3,4,5.And 23 if both let  , if one 23 is let then it will be overwrites and for var it will overwrites.


//Es6
{
    let a = 5;
    const b = 6;
    var j = 3; //we can access this because this is not a block scope its a function scope
};
//console.log(a + b);
console.log(j);

//Es5

(function () {
    var c = 3;
}) ();
//console.log(c);

//Strings

let firstName = 'John'
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2020 - year; 
}
//Es5
console.log('This is ' + firstName + ' ' + lastName + ' born in ' + yearOfBirth + ' and now ' + calcAge(yearOfBirth) + ' years old');

//Es6
console.log(`This is ${firstName} ${lastName} born in ${yearOfBirth} and now ${calcAge(yearOfBirth)} years old`);

n = firstName + ' ' + lastName;
n = `${firstName} ${lastName}`
console.log(n.startsWith('J'));
console.log(n.endsWith('th'));
console.log(n.includes('oh'));
console.log(`${firstName} `.repeat(4));*/

//Arrow functions
//Es5
/*const years = [1990,1995,1987,1996,2000]

var ages5 = years.map(function (el) {
    return 2020 - el;
})
console.log(ages5);

//Es6
//1.only one parameter
let ages6 = years.map(el => 2020 - el);
console.log(ages6);

//two parameters we write in brackets
ages6 = years.map((el, index) => `Age element ${index + 1} : ${2020 - el}`);
console.log(ages6);

//returning more than one line here we add paranthesis and return explicitly
ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    age = now - el;
    return `Age element ${index + 1} : ${age}`;
});

console.log(ages6);*/

//Arrow functions2

/*
//Es5
var box5 = {
    color : 'green',
    position : 1,
    clickMe : function() {
        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            //str = 'This is at position ' + this.position + ' and it is ' + this.color; values are undefined here because this keyword here is limited to this function
            str = 'This is a box at position ' + self.position + ' and it is ' + self.color;
            alert(str);
        })
    }
}

//box5.clickMe();

var box6 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        document.querySelector('.green').addEventListener('click', () => {
            //str = 'This is at position ' + this.position + ' and it is ' + this.color; values are undefined here because this keyword here is limited to this function
            str = 'This is a box at position ' + this.position + ' and it is ' + this.color;
            alert(str);
        })
    }
}

//box6.clickMe();

var box66 = {
    color: 'green',
    position: 1,
    clickMe: () => {
        document.querySelector('.green').addEventListener('click', () => {
            //str = 'This is at position ' + this.position + ' and it is ' + this.color; values are undefined here because this keyword here is limited to this function
            str = 'This is a box at position ' + this.position + ' and it is ' + this.color;
            alert(str);
        })
    }
}

box66.clickMe();   Now the result will be undefined because now clickMe function has */  

//Es5
/*Person = function(name) {
    this.name = name;
};

Person.prototype.myFriends5 = function(friends) {
    var arr = friends.map(function (el) {
        return this.name + ' is friend of ' +el;
    }.bind(this));
    console.log(arr);   
}

friends = ['Mark', 'Miler', 'Andy']
new Person('John').myFriends5(friends);

//Es6
Person.prototype.myFriends6 = function(friends) {
    var arr = friends.map(el => `${this.name} is friend of ${el}`);
    console.log(arr);
}

new Person('Randy').myFriends6(friends);



//Es5
var john = ['John', 32];
//var name = john[0];
//var age = john[1];

//Es6
const [name,age] = ['John', 36];
console.log(name)
console.log(age)

var obj = {
    firstName : 'John',
    lastName : 'Miller'
}

const {firstName, lastName} = obj;
console.log(firstName)
console.log(lastName)

const {firstName : a, lastName : b} = obj;
console.log(a);
console.log(b);

function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65-age];
}

const [age2, retirement] = calcAgeRetirement(1997);
console.log(age2)
console.log(retirement);*/

//Lecture Arrays
/*
const boxes = document.querySelectorAll('.box');
//Es5
boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function (cur) {
    cur.style.backgroundColor = 'blue';
});

boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');

//Another way because its a small method
Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');*/

//Es5
/*
for(var i = 0; i < boxesArr5.length; i++) {
    if(boxesArr5[i].className === 'box blue') {
        continue; //it will just continue as we can see but break completely exits from the loop.
    }
    boxesArr5[i].textContent = 'I am changed to blue';
};*/
/*
for(const cur of boxesArr6) {
    if(cur.className.includes('blue')) {
    //if(cur.className === 'box blue'){
        continue;
    }
    cur.textContent = 'I am changed to blue';
};

//Es5
var ages = [17,15,19,14,35];
var full = ages.map(function (cur) {
    return cur >= 18;
});
console.log(full);

console.log(full.indexOf(true))
console.log(ages[full.indexOf(true)]);

//Es6
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >=18));


var i= 23;

for (i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i); */

//Spread Operator  
//So the new spread operator is a very convenient way to expand elements of an array in places like arguments and function calls. 

//Es5
/*
function addFourAges (a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 22, 25, 32);
console.log(sum1);

ages = [18,22,25,32];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//Es6
const sum3 = addFourAges(...ages);
console.log(sum3);

const JohnFamily = ['John', 'Jane', 'Jine'];
const MarkFamily = ['Miller', 'Mark', 'Marvel'];
const BigFamily = [...JohnFamily, ...MarkFamily];
console.log(BigFamily);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
console.log(boxes);
const full = [h, ...boxes];   //since h1 is not an array so we dont use dots here
Array.from(full).forEach(cur => cur.style.color = 'white');
//full.map(cur => cur.style.color = 'blue');
console.log(typeof(JohnFamily));

//Rest Parameters
/*So, rest parameters allow us to pass an arbitrary number of arguments into a function, and to use these arguments in that function.*/
//Es5
/*
function isFullAge5 () {
    argumentsArr = Array.prototype.slice.call(arguments);
    console.log(argumentsArr);
    argumentsArr.forEach(function(cur) {
        console.log((2020 - cur) >= 18);
    });
}

isFullAge5(1990,2005,1985,1965);

//Es6
function isFullAge6(...years) {
    console.log(years);
    years.forEach(cur => console.log((2020 - cur) >= 18));
}

isFullAge6(1990, 2010, 1985, 2003);

function isFullAge5(limit) {
    argumentsArr = Array.prototype.slice.call(arguments,1);  //so it will store from 1;
    argumentsArr.forEach(function (cur) {
        console.log((2020 - cur) >= limit);
    });
}

//isFullAge5(21, 1990, 2005, 1985, 1965);

//Es6
function isFullAge6(limit,...years) {
    console.log(years);
    years.forEach(cur => console.log((2020 - cur) >= limit));
}

isFullAge6(17,1990, 2010, 1985, 2003);*/

//Default Parameters 
/*
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {

    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'American' : nationality = nationality;
    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
    this.nationality = nationality;
}
*/
//Es6
/*
function SmithPerson (firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {
    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
    this.nationality = nationality;
}

var john = new SmithPerson('John', 1990, "miller", 'indian');
console.log(john);*/

//Maps

const question = new Map();
question.set('question','What is the latest name of the major Javascript version')
question.set(1, 'Es5')
question.set(2, 'Es6')
question.set(3, 'Es7')
question.set('correct', 3)
question.set(true, 'Correct Answer ')
question.set(false, 'Wrong, please try again')
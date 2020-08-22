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

console.log(i);   // result will be 0,1,2,3,4,5 .23 if both let  , if one 23 is let then it will be overwrites and for var it will overwrites.


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
*/
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



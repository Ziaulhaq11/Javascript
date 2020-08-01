
/*var Person = function (name,yearOfBirth,job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    /*this.calcAge = function () {
        console.log(2020 - this.yearOfBirth);*/
    
/*}

Person.prototype.calcAge = function () {
    console.log(2020 - this.yearOfBirth);
}
Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990 , 'teacher');
john.calcAge();
var jane = new Person('Jane', 1980, 'Programmer')
var mike = new Person('Mike', 1985, 'student');
jane.calcAge();
console.log(mike);
console.log(mike.lastName);*/

/*var personproto = {
    calcAge : function() {
        console.log(2020 - this.yearOfBirth);
    }
}

john = Object.create(personproto);
john.name = 'John';
john.yearOfBirth = 1990;
console.log(john)
john.calcAge()*/

var obj1 = {
    name: 'zia',
    age : 35
}

var obj2 = obj1
obj1.age = 30
console.log(obj1.age)
console.log(obj2.age)

var ages = 27;
var obj = {
    name : 'mehbul',
    city : 'San Francisco'
}

function change(a,b) {
    a = 30;
    b.city = 'London'
}

change(ages,obj);
console.log(ages);
console.log(obj.city);

var x = 5;
var y = 10;
z = x + y;
console.log(z);

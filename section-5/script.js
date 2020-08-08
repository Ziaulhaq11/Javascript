
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
/*
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
*/

/*var array = [1995,1990,1998,2000,2012];

function calc(arr, func) {
    arrRes = [];
    for (var i = 0; i < array.length; i++) {
        arrRes.push(func(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2020 - el ;
}

function isFullAge(el) {
    return el >= 18;
}

ages = calc(array, calculateAge);
adult = calc(ages, isFullAge);
console.log(ages);
console.log(adult);
*/

/*function interview(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ' how to design');
        }
        }
    else if (job === 'teacher') {
        return function(name) {
            console.log(name + 'teaches kids');
    }
    }
    else {
        return function(name) {
            console.log(name + ' what do you do')
        }
    }
}


var answer = interview('teacher');
answer('john')
interview('designer') ('Mark');*/

/*
function game() {
    score = Math.random() * 10;
    console.log(score >= 5);
}

game();

(function () {
    score = Math.random() * 10;
    console.log(score >= 5);
}) ();

(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
}) (3);*/

/*ffunction retirment(retirementAge) {
    a = ' years left for retirement'
    return function (yearOfBirth) {
        age = 2020 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

john = retirment(60);
john(1990);

retirment(59) (2000);



function interviewques(job) {

    return function(name) {
        if (job === 'designer') {
            console.log(name + ' how to design');
        }
        else if (job === 'teacher') {
            console.log(name + 'teaches kids');
        }
        else {
            console.log(name + ' what do you do');
        }
}
}

interviewques('teacher') ('john');*/
/*
var john = {
    name : 'John',
    age : 26,
    job : 'teacher',
    presentation : function (style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ' ladies and Gentlemen' + ' I\'m ' + this.name + ' I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old')
        }else if (style === 'friendly') {
            console.log(' Hey what\'s up  I\'m ' + this.name + ' I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old')
        }
    }
}

var emily = {
    name : 'Emily',
    age : 35,
    job : 'teacher'
}


john.presentation('friendly', 'Morning');
john.presentation.call(emily, 'friendly' , 'Evening');
//john.presentation.apply(emily, ['formal', 'Afternoon']);
var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('Morning');*/

/*
var years = [1990,1985,1999,2002,2006];

function arrCalc(arr, fn) {
    var arrRes = [];
    for (i=0; i<arr.length; i++) {
        arrRes.push(fn(arr[i]));  ////Here the function is calling and it takes the argument as arr[i] here as el;
    }
    return arrRes;
}

function calcAge(year) {
    return 2020 - year;
}

function isFullAge(limit, age) {
    return age >=limit;
}

ages = arrCalc(years, calcAge);

var japan = arrCalc(ages, isFullAge.bind(this, 20));  //we are passing 20 as limit since it is first argument.
console.log(ages);
console.log(japan);*/
/*
var Question = function (ques,answers,correctAnswer) {
    this.ques = ques;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}

ques1 = Object.create(Question)
ques1.ques = 'Is Javascript best language in the world';
ques1.answers = {
    0 : 'Yes',
    1 : 'No'
}
ques1.correctAnswer = 0;

ques2 = Object.create(Question)
ques2.ques = 'Is Jane best teacher';
ques2.answers = {
    0: 'Yes',
    1: 'No'
}
ques2.correctAnswer = 0;

ques3 = Object.create(Question)
ques3.ques = 'Who is teacher';
ques3.answers = {
    0: 'John',
    1: 'Mark',
    2: 'Jonas'
}
ques3.correctAnswer = 2;

questions = [ques1, ques2, ques3];

res = Math.floor(Math.random() * 3 );
console.log(res);

console.log(questions[res].ques);
console.log(res);
console.log(questions[res].answers);
console.log(res);
result = prompt('Choose the answer');

if (result == questions[res].correctAnswer) {
    console.log(res);
    console.log(questions[res].correctAnswer);
    console.log('Correct');
}else {
    console.log('Incorrect');
}
 */



(function () {
    var result,score = 0;
    function Questions(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Questions.prototype.displayQuestion = function () {
        console.log(this.question);
        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ' : ' + this.answers[i]);
        }
    }

    Questions.prototype.check = function () {

        if (result == this.correct) {
            score += 1;
            console.log('Correct Answer');
        } else {
            console.log('Incorrect . Try again');
        }
    }

    ques1 = new Questions('Is javascript best language in the world',
        ['Yes', 'No'], 0);
    ques2 = new Questions('Who is your teacher', ['Jonas', 'Mike', 'John'], 0);
    ques3 = new Questions('Is Jonas best teacher', ['No', 'Yes'], 1);
    questions = [ques1, ques2, ques3];

    function nextQuestion() {
        var n = Math.floor(Math.random() * questions.length);
        questions[n].displayQuestion();
        result = prompt('Give the answer');
        if (result !== 'exit') {
            questions[n].check();
            console.log('The current score is : ' + score);
            console.log('---------------------------');
            nextQuestion();
        }else {
        }
    }
    nextQuestion();
}    
) ();





   






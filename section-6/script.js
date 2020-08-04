//Budget Controller
var budgetController = (function () {
    
    var Expense = function (id,description,value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function (id,description,value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allitems : {
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0
        }
    }

    return {
        addItem : function(type, des, val) {
            var newItem, ID;
            
            //  [1 2 3 4 5] , next ID = 6 
            // [1 2 4 6 8], next ID = 9  Because we may deleted some of the middle id's then if we just add the length then the other will be 6.
            // ID = last ID + 1  here 8 is at 4th place then the next 

            //Create new ID 
            if (data.allitems[type].length > 0) {
                ID = data.allitems[type][data.allitems[type].length - 1].id + 1;//exp[1,4,6] => exp[3 -1]=>exp[2]=> 6id => 2 + 1 => 3;
                }else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            }else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //Push it into our data structure
            data.allitems[type].push(newItem);

            //Return the new element
            return newItem;
        },
        testing : function () {
            console.log(data.allitems.inc);
        }
    }

}) ();


//UI controller
var UIController = (function () {
    
    var DOMStrings = {
        inputtype : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBtn: '.add__btn',
        incomeContainer : '.income__list',
        expensesContainer: '.expenses__list'
    }

    return {
        getInput : function () {  //previously it was = but error occurs
            return {
                type : document.querySelector(DOMStrings.inputtype).value,   //here value will be not +- but value which we defined in html
                description : document.querySelector(DOMStrings.inputDescription).value,
                value : document.querySelector(DOMStrings.inputValue).value
            }
        },

        addListItem : function (obj, type) {
            var html,newHtml,element;

            //Create HTMl string with placeholder text
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete">  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id = "expense-%id%" ><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div >'
            }

            //Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            //Insert some Html data into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);  //so beforeend means child of it.

        },

        clearFields : function () {
            var fields;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);   //it returns list not an array so we use a slice operator which copies the array.

            //fields.slice() it will not work
            var fieldsArr = Array.prototype.slice.call(fields);   //remember blind call apply methods. Remember this keyword so we put fields in the this field
            
            
            
        },

        getDomstrings : function () {
            return DOMStrings;
        }

    }
        
}) ();

//Global app Control

var Controller = (function (budgetctrl, Uictrl) {

    eventListeners = function () {
        var DOM = Uictrl.getDomstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlitem);

        addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlitem();
            }
        })
    }

    var ctrlitem = function () {
        var input,newItem;
        //1.Get input data
        input = Uictrl.getInput();
        console.log(input);
        //2.Add the item to budget Controller
        newItem = budgetctrl.addItem(input.type, input.description, input.value);
        console.log(newItem);
        //3.Add the itme to UI
        Uictrl.addListItem(newItem, input.type);
        Uictrl.clearFields();
        //4.Calculate the budget

        //5.Display budget to UI controller

    }

    return {
        init : function() {
            console.log('It has started');
            return eventListeners();
        }
    }

}) (budgetController, UIController);

Controller.init();   //we can call it in the controller module itself but idk why we call here.


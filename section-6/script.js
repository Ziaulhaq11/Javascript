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
        },
        budget : 0,
        percent : 0
    }

    var calcTotal = function(type) {
        var sum = 0;
        data.allitems[type].forEach(function (cur) {
            sum = sum + cur.value;
        });
        data.totals[type] = sum;
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

        deleteItem : function (type,id) {
            var ids, index;
            //id = 6
            //data.allitems[type][id]
            //[1 2 4 6 8]   
            //index = 3

            ids = data.allitems[type].map(function(current) {
                return current.id;
            })

            
            index = ids.indexOf(id);
            return console.log(ids,index);

            if(index !== -1) {
                data.allitems[type].splice()
            }
            

        },

        calculateBudget : function() {
            //Calculate total incomes and expenses
            calcTotal('exp');
            calcTotal('inc');
            //Calculate the budget : income - expense
            data.budget = data.totals.inc - data.totals.exp;
            //Calculate the percentage of income that we spent
            if(data.totals.inc > 0) {
                data.percent = Math.round((data.totals.exp / data.totals.inc) * 100); 
            }else {
                data.percent = -1;
            }
            console.log(data.totals.inc,data.totals.exp,data.percent);

        },
        getBudget : function() {
            return {
                budget : data.budget,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                percent : data.percent
            }
        },
        testing : function () {
            console.log(data);
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
        expensesContainer: '.expenses__list',
        budgetLabel: ".budget__value",
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    }

    return {
        getInput : function () {  //previously it was = but error occurs
            return {
                type : document.querySelector(DOMStrings.inputtype).value,   //here value will be not +- but value which we defined in html
                description : document.querySelector(DOMStrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        addListItem : function (obj, type) {
            var html,newHtml,element;

            //Create HTMl string with placeholder text
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete">  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id = "exp-%id%" ><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div >'
            }

            //Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            //Insert some Html data into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);  //so beforeend means child of it.

        },

        clearFields : function () {
            var fields,fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);   //it returns list not an array so we use a slice operator which copies the array.
            
            //fields.slice() it will not work
            fieldsArr = Array.prototype.slice.call(fields);   //remember blind call apply methods. Remember this keyword so we put fields in the this field
            fieldsArr.forEach(function(current,index,array) {
                current.value = '';   //it will be value for both description and value. And in fieldsArr we just have selectors not the values and here we are passing blank value here.
            });

            fieldsArr[0].focus();
        },

        displayBudget : function(obj) {
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExp;
            if (obj.percent > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percent + '%';    
            }else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
            

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
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

        addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        })
    }

    var updateBudget = function () {
        //1..Calculate the budget
        budgetController.calculateBudget();
        //2.Return the budget
        budget = budgetController.getBudget();
        //3.Display budget to UI controller
        Uictrl.displayBudget(budget);
    }

    var ctrlAddItem = function () {
        var input,newItem;
        //1.Get input data
        input = Uictrl.getInput();
        if(input.description !== '' && !isNaN(input.value) && input.value > 0) {  //isNan returns True if there is no number 

            //2.Add the item to budget Controller
            newItem = budgetctrl.addItem(input.type, input.description, input.value);
            //3.Add the itme to UI
            Uictrl.addListItem(newItem, input.type);
            //4.Clear the fields
            Uictrl.clearFields();
            //5.Calculate and Update the budget
            updateBudget();

        } 
        
    };

    var ctrlDeleteItem = function (event) {
        item = budgetController();
        var itemID;
        /*console.log(event.target);
        itemID2 = event.target.id;
        console.log(itemID2);*/
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        console.log(itemID);

        if(itemID) {
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            id = splitID[1];
        }
    }

    return {
        init : function() {
            Uictrl.displayBudget({
                budget : 0,
                totalInc : 0,
                totalExp : 0,
                percent : -1
            });

            eventListeners();
        },
    }

}) (budgetController, UIController);

Controller.init();   //we can call it in the controller module itself but idk why we call here.
//This function initialises first as we can see so in that we put budget = 0


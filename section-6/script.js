//Budget Controller
var budgetController = (function () {
    
    var Expense = function (id,description,value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        } 
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
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
            var newItem, id;
            
            //  [1 2 3 4 5] , next id = 6 
            // [1 2 4 6 8], next id = 9  Because we may deleted some of the middle id's then if we just add the length then the other will be 6.
            // id = last id + 1  here 8 is at 4th place then the next 

            //Create new id 
            if (data.allitems[type].length > 0) {
                id = data.allitems[type][data.allitems[type].length - 1].id + 1;//exp[1,4,6] => exp[3 -1]=>exp[2]=> 6id => 2 + 1 => 3;
                }else {
                id = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(id, des, val);
            }else if (type === 'inc') {
                newItem = new Income(id, des, val);
            }

            //Push it into our data structure
            data.allitems[type].push(newItem);

            //Return the new element
            return newItem;
        },

        deleteItem : function (type,id) {
            var ids, index;
            //data.allitems[type][id];  We cant use them since the id's will not be in order.
            //id = 6
            //data.allitems[type][id]
            //[1 2 4 6 8]   
            //index = 3
            console.log(type,id);
            ids = data.allitems[type].map(function(current) {  //current represents to the current element
                //the difference b/w map and foreach is map returns a brand new array. Where as we need to declare a variable for Foreach.  
                return current.id;
            });
            /*console.log(ids,id);
            index = ids.indexOf(id); //for ex : The ids variable stores all of ids and when we pass our id it will return the index of our id.
            console.log(index);*/

            //this exist because if item is not there it will return -1
            if(index !== -1) {  
                data.allitems[type].splice(index, 1)  //to remove the element
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

        calculatePercentage : function() {
            /*
            a = 10, b =20 , c= 40
            income = 100
            a=10/100 => 10%, b= 20% ,c= 40%
            */

            data.allitems.exp.forEach(function (cur) {
               cur.calcPercentage(data.totals.inc); 
            });
        },

        getPercentages : function() {
            allPercentages = data.allitems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPercentages;
        } ,
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
        container: '.container',
        itemPercentage: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    var formatNumber = function(num, type) {
        /*
        + or - before number
        two decimal points
        separating with , in thousands
        2354.4567  ->  + 2354.46
        2000  ->  + 2000.00
        */

        num = Math.abs(num);
        num = num.toFixed(2);   //it returns string.

        numSplit = num.split('.')
        int = numSplit[0];

        if (int.length > 3) {
            //int = int.substr(0,1) + ',' + int.substr(1,3);  input : 2546   output : 2,546
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        };
        dec = numSplit[1];

        /*type === 'exp' ? sign = '-' : sign = '+';
        return type + ' ' + int + dec;*/
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;  //both are same
    };

    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };


    //Previously formatNumber is in return. But we moved it above and for using we just use without 'this' keyword.

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
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            //Insert some Html data into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);  //so beforeend means child of it.

        },

        deleteListItem : function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
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
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget,type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc,'inc');
            document.querySelector(DOMStrings.expenseLabel).textContent =formatNumber( obj.totalExp, 'exp');
            if (obj.percent > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percent + '%';    
            }else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
            

        },

        displayPercentages : function(percentages) {
            var fields = document.querySelectorAll(DOMStrings.itemPercentage); //node list not array
            
            nodeListForEach(fields, function (current, index) {  //calling the above function using these parameters. Fields parameter just for looping.
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
                
            })
        },

        displayMonth : function() {
            var now,year,month,months;
            now = new Date();
            //christmas = new Date(2016,11,26); //month is 0 based so 11 is 12
            months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            year = now.getFullYear();
            month = now.getMonth();
            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' '+ year;
        },

        changedType : function () {
            fields = document.querySelectorAll(
                DOMStrings.inputtype + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue
            );

            nodeListForEach(fields, function (cur) {
                cur.classList.toggle('red-focus');
            });

            button = document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
            //button.classList.toggle('red');
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
        document.querySelector(DOM.inputtype).addEventListener('change', Uictrl.changedType);

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

    var updatePercentages = function() {
        //1.Calculate the Percentages
        budgetctrl.calculatePercentage();
        //2.Read the percentages from the budget Controller
        var percentages = budgetctrl.getPercentages();
        //3.Display the new percentages on the UI
        Uictrl.displayPercentages(percentages);

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
            //6.Calculating and Updating the new Percentages
            updatePercentages();

        } 
        
    };

    var ctrlDeleteItem = function (event) {
        var itemID,splitID,type,id;
        /*console.log(event.target);
        itemID2 = event.target.id;
        console.log(itemID2);*/
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        console.log(itemID);

        if(itemID) {
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]);  // its a string
            console.log(type,id);   
        }

        //1.Delete the item from the data structure
        budgetctrl.deleteItem(type,id);

        //2.Delete the item from UI
        Uictrl.deleteListItem(itemID);

        //3. Update and Show the new budget.
        updateBudget(); 

        //4.Calculate and update new Percentages
        updatePercentages();
    }

    return {
        init : function() {
            Uictrl.displayBudget({
                budget : 0,
                totalInc : 0,
                totalExp : 0,
                percent : -1
            });
            Uictrl.displayMonth();
            eventListeners();
        },
    }

}) (budgetController, UIController);

Controller.init();   //we can call it in the controller module itself but idk why we call here.
//This function initialises first as we can see so in that we put budget = 0


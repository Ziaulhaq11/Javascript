/*
const seconds = () => {
        setTimeout(() => {
            console.log('Asynchronous, Hey there');
        }, 2000)
}

    const first = () => {
        console.log('Hey there')
        seconds();   
        console.log('This is the end');  //This will print first then that timeout executes
    }

    first();*/

//Synchronous vs Asynchronous  
/*Line by line --synchronous

function getRecipe() {
    setTimeout(() => {
        recipeID = [54,45,76,87,98];
        console.log(recipeID);

        setTimeout((id) => {
            const recipe = { title: 'Fresh Pizza', publisher: 'Dominos' };
            console.log(`${id} : ${recipe.title} is ready`);

            setTimeout(publisher => {
                const recipe2 = {title : 'Burger', publisher : 'Dominos'};
                console.log(recipe2);
            },1500, recipe.publisher)

        }, 1500, recipeID[2]);


    }, 1500)

}

getRecipe();*/


//Promises : 
/*
const getIds = new Promise((resolve, reject) => {//This is called Executor function. If it successful we call resolve and reject if                                                 promise not.
    setTimeout(() => {  //setTimeout will always successful.
        resolve([54, 45, 76, 87, 98]);
        //reject([54, 45, 76, 87, 98]);
    },1500);
});


const getRecipe = recID => {
    return new Promise((resolve,reject) => {
        setTimeout(ID => {
            const recipe = {title : 'Fresh tomato Pasta', publisher : 'Jonas'};
            resolve(`${ID} : ${recipe.title}`);
        },1500, recID);
    })
}

const getRelated = publisher => {
    return new Promise((resolve,reject) => {
        setTimeout(pub => {
            const recipe2 = { title: 'Burger', publisher: 'Dominos' };
            resolve(`${pub} : ${recipe2.title}`);
        },1500,publisher);
    })
}

getIds.then(IDs => {   
    //Here the argument will be the result of the above getIds Promise.
    console.log(IDs);
    return getRecipe(IDs[2]);
})
.then(recipe => {   //if its resolved
    console.log(recipe);
    return getRelated('Jonas');
})
.then(recipe => {
    console.log(recipe);
});

getIds.catch(error => {  
    //if its rejected
    console.log('Error||');
});*/


// Async/Await :
//are designed to consume Promises to produce we need to use above
/*
const getIds = new Promise((resolve, reject) => {
    setTimeout(() => {  
        resolve([54, 45, 76, 87, 98]);
    }, 1500);
});


const getRecipe = recID => {
    return new Promise((resolve, reject) => {
        setTimeout(ID => {
            const recipe = { title: 'Fresh tomato Pasta', publisher: 'Jonas' };
            resolve(`${ID} : ${recipe.title}`);
        }, 1500, recID);
    })
}

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(pub => {
            const recipe2 = { title: 'Burger', publisher: 'Dominos' };
            resolve(`${pub} : ${recipe2.title}`);
        }, 1500, publisher);
    })
}

async function getRecipesAW() {  //Async function runs in the background. And await will works only in the Async function.
    const IDs = await getIds;
    console.log(IDs);
    const recipe = await getRecipe(IDs[2]);
    console.log(recipe);
    const related = await getRelated('Jonas');
    console.log(related);
    return recipe;
}

// const rec = getRecipesAW();  
// console.log(rec);  This will not work because this will bse in waiting status.  Result will be Pending.
//getRecipesAW(); It gets job done
getRecipesAW().then(result => console.log(`${result} is the best food ever!!`));
//So here async function always return the promises And here we are returning the recipe variable.And as we know 'then' will take result as an argument.*/

// Making AJAX Calls with Fetch and Promises
/*
function getWeather(woeid) {
    fetch(`https://www.metaweather.com/api/location/${woeid}/`)
    .then(result => {
        console.log(result);
        return result.json();
    })
    .then(data => {
        console.log(data)
        const today = data.consolidated_weather[0];
        console.log(`Temperatures in ${data.title} stays between ${today.min_temp} & ${today.max_temp}`);
    })
    .catch(error => console.log('error'));
}

getWeather(44418)
*/
/*
async function getWeatherAW(woeid) {
    try {
        const result = await fetch(`https://www.metaweather.com/api/location/${woeid}/`)
        console.log(result);
        const data = await result.json()
        console.log(data);
        const tomorrow = data.consolidated_weather[2];
        console.log(`Temperatures in ${data.title} stays between ${tomorrow.min_temp} & ${tomorrow.max_temp} degree celsius`);
        return data;
    } catch (error) {
        alert(error);
    }
}

getWeatherAW(44418);
let dataSanFransico;
// getWeatherAW(2487956).then(data => {
//     dataSanFransico = data;
//     console.log(dataSanFransico);
// })*/

async function getData() {
	const res = await fetch('https://api.covid19india.org/data.json')
	console.log(res)
	const data = await res.json();
	console.log(data)
}

getData();

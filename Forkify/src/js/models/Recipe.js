import axios from 'axios';

export default class Recipe {
    constructor (id) {
        this.id = id;
    }

    async getRecipe(){
        try {
            const recipe = await axios(
              `https://forkify-api.herokuapp.com/api/get?rId=${id}`
            );
            console.log(recipe);
        }
        catch (error) {
            console.log(error);
        }
    }
}


import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }
    async getResults() {
    //Axios works in all browsers and it return json. In fetch we need to convert it.
    //const proxy = 'https://cors-anywhere.herokuapp.com/'
    try {
        const res = await axios(
        `https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
        this.result = res.data.recipes;
        this.data =res.data
        console.log(this.data);
    }catch (error) {
        alert(error);
    }
    }
}


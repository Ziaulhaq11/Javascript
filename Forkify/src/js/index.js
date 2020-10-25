import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

/**  Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object 
 * - Likes object
 */

const state = {};

const controlSearch = async () => {
    //1. Get Query from View
    const query = searchView.getInput();
    console.log(query);

    if(query) {
        //2.New search object and add to state
        state.search = new Search(query);

        //3.Prepare UI for results.
        searchView.clearInput();
        searchView.clearSearchList();
        renderLoader(elements.searchRes);

        //4.Search for the recipes
        await state.search.getResults();

        //5.Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
        state.recipe = new Recipe(state.search.result.recipe_id);
        state.recipe.getRecipe();
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.resultPages.addEventListener('click', e => {
    const btn = e.target.closest(".btn-inline");
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearSearchList();
        searchView.renderResults(state.search.result, gotoPage);
        console.log(gotoPage);
    }
});
import * as model from '../js/model';
import resultView from './views/ResultView';
import recipeView from './views/recipeView';
import searchView from './views/SearchView';
import './helper';

// https://forkify-api.herokuapp.com/v2
//https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886

///////////////////////////////////////

const searchHandler = async function () {
	resultView.renderSpinner();
	try {
		await model.fetchSearchResults(searchView.getQuery());
		resultView.renderResults(model.state.search.results);
	} catch (err) {
		resultView.renderError(err.message);
	}
};
const resultHandler = function (ev) {
	model.state.results.clickedResultEl?.classList.remove('preview__link--active');
	model.state.results.clickedResultEl = ev.target.closest('.preview');
	model.state.results.clickedResultEl.classList.add('preview__link--active');
};
const recipeHandler = async function () {
	const id = window.location.hash.slice(1);
	console.log(window.location.hash);

	recipeView.renderSpinner();
	try {
		await model.fetchRecipe(id);
		recipeView.renderRecipe(model.state.recipe);
	} catch (err) {
		recipeView.renderError(err.message);
	}
};

const init = function () {
	recipeView.addRecipeHandler(recipeHandler);
	resultView.addResultHandler(resultHandler);
	searchView.addSearchHandler(searchHandler);
};
init();
// if (module.hot) module.hot.accept();

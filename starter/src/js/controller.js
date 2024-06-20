import * as model from '../js/model';
import resultView from './views/ResultView';
import recipeView from './views/RecipeView';
import searchView from './views/SearchView';
import pageView from './views/PageView';

// https://forkify-api.herokuapp.com/v2
//https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886
//https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e8706

// if (module.hot) module.hot.accept();
///////////////////////////////////////

const resultHandler = function (ev) {
	model.state.page.clickedResultEl?.classList.remove('preview__link--active');
	model.state.page.clickedResultEl = ev.target.closest('.preview');
	model.state.page.clickedResultEl.classList.add('preview__link--active');
};
const recipeHandler = async function () {
	const id = window.location.hash.slice(1);

	if (!id) return recipeView.renderMessage();

	recipeView.renderSpinner();
	try {
		await model.loadRecipe(id);
		recipeView.render(model.state.recipe);
	} catch (err) {
		recipeView.renderError(err.message);
		console.error(err);
	}
};
const searchHandler = async function (query) {
	resultView.renderSpinner();
	try {
		await model.loadSearchResults(query);
		resultView.render(model.getResultsPage(model.state.page.pageNo));
		pageView.render(model.state.page);
	} catch (err) {
		resultView.renderError(err.message);
		console.error(err);
	}
};
const pageHandler = function (goToPage) {
	resultView.render(model.getResultsPage(goToPage));
	pageView.render(model.state.page);
};

const init = function () {
	recipeView.addRecipeHandler(recipeHandler);
	resultView.addResultHandler(resultHandler);
	searchView.addSearchHandler(searchHandler);
	pageView.addPageHandler(pageHandler);
};
init();

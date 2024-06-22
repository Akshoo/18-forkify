import * as model from '../js/model';
import resultView from './views/ResultView';
import recipeView from './views/RecipeView';
import searchView from './views/SearchView';
import pageView from './views/PageView';

// https://forkify-api.herokuapp.com/v2
// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886
// https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e8706

// if (module.hot) module.hot.accept();
///////////////////////////////////////

const servingsHandler = function (serving) {
	model.loadIngredientsPerServe(serving);
	//updating
	recipeView.update();
	// recipeView.renderUpdatedIngredients();
};
const recipeHandler = async function (id) {
	if (!id) return recipeView.renderMessage();

	recipeView.renderSpinner();
	try {
		await model.loadRecipe(id);
		recipeView.render(model.state.recipe);

		resultView.update(model.getResultsPage());
	} catch (err) {
		recipeView.renderError(err.message);
		console.error(err);
	}
};
const searchHandler = async function (query) {
	resultView.renderSpinner();
	try {
		await model.loadSearchResults(query);
		resultView.render(model.getResultsPage());
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
	recipeView.addServingsHandler(servingsHandler);

	searchView.addSearchHandler(searchHandler);
	pageView.addPageHandler(pageHandler);
};
init();

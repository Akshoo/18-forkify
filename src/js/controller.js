import 'core-js';
import 'regenerator-runtime/runtime';

import * as model from '../js/model';
import resultView from './views/ResultView';
import recipeView from './views/RecipeView';
import searchView from './views/SearchView';
import pageView from './views/PageView';
import bookmarksView from './views/BookmarksView';

import userRecipeView from './views/UserRecipeView';
import { LOAD_BOOKMARKS_MSG } from './config';


// https://forkify-api.herokuapp.com/v2
// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886
// https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e8706

// if (module.hot) module.hot.accept();

//////////////////////////////////////////////////////////////

const servingsHandler = function (serving) {
	model.loadIngredientsPerServe(serving);
	recipeView.update(model.state.recipe);
};
const bookmarksHandler = function () {
	if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
	else model.deleteBookmark(model.state.recipe.id);

	recipeView.update();
	if (model.state.bookmarks.length == 0) bookmarksView.renderMessage(LOAD_BOOKMARKS_MSG);
	else bookmarksView.render(model.state.bookmarks);
};
const recipeHandler = async function (id) {
	model.loadSavedBookmarks();
	if (model.state.bookmarks.length == 0) bookmarksView.renderMessage(LOAD_BOOKMARKS_MSG);
	else bookmarksView.render(model.state.bookmarks);

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

const userRecipeViewHandler = async function (data) {
	try {
		userRecipeView.renderSpinner();
		await model.uploadUserRecipe(data);
		bookmarksView.render(model.state.bookmarks);
		userRecipeView.renderMessage('Recipe uploaded successfully!');
		setTimeout(() => {
			userRecipeView.toggleModal();

			// recipeView.render(model.state.recipe);// <- does not updates the hash in the page
			// window.location.hash = model.state.recipe.id;
			window.history.pushState(null, '', model.state.recipe.id);

			userRecipeView.render();
		}, 2000);
	} catch (err) {
		userRecipeView.renderError(err.message);
	}
};

////////////////////////////////////////////////////////////

const init = function () {
	recipeView.addRecipeHandler(recipeHandler);
	recipeView.addServingsHandler(servingsHandler);
	recipeView.addBookmarksHandler(bookmarksHandler);

	searchView.addSearchHandler(searchHandler);
	pageView.addPageHandler(pageHandler);
	userRecipeView.addUserRecipeViewHandler(userRecipeViewHandler);
};
init();
// localStorage.clear();

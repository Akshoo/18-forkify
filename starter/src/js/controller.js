import * as model from '../js/model';
import resultView from './views/ResultView';
import recipeView from './views/RecipeView';
import searchView from './views/SearchView';
import pageView from './views/PageView';

import { fetchJson } from './helper';

// https://forkify-api.herokuapp.com/v2
//https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886
//https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e8706

// if (module.hot) module.hot.accept();
///////////////////////////////////////

const searchHandler = async function () {
	resultView.renderSpinner();
	try {
		await model.loadSearchResults(searchView.getQuery());
		pageView.renderPageBtns(model.state.page.maxPageNo);
		resultView.render(model.getResultsPage(model.state.page.pageNo));
	} catch (err) {
		resultView.renderError(err.message);
		console.error(err);
	}
};
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
const pageHandler = function (ev) {
	clickedBtn = ev.target.closest('.btn--inline');
	if (!clickedBtn) return;

	model.state.page.pageNo += pageView.clicked(clickedBtn);
	resultView.render(model.getResultsPage());

	console.log(pageView);
};

const init = function () {
	recipeView.addRecipeHandler(recipeHandler);
	resultView.addResultHandler(resultHandler);
	searchView.addSearchHandler(searchHandler);
	pageView.addPageHandler(pageHandler);
};
init();

// (async function () {
// 	console.log(
// 		await fetchJson(
// 			'https://forkify-api.herokuapp.com/ap/v2/recipes/5ed6604591c37cdc054bc886'
// 		)
// 	);
// })();
// setTimeout(async function () {
// 	console.log(
// 		await fetchJson('https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e8706')
// 	);
// }, 5000);

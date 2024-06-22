import { API_URL, FETCH_RECIPE_ERR, FETCH_SEARCH_RES_ERR, PAGE_SLOTS } from './config';
import { fetchJson } from './helper';

export const state = {
	recipe: {},
	search: {
		query: '',
		results: [],
	},
	page: {
		clickedResultEl: null,
		pageNo: 1,
		maxPageNo: 0,
	},
};

export const loadSearchResults = async function (query) {
	try {
		if (!query) return;

		const data = await fetchJson(`${API_URL}?search=${query}`);

		if (data.data.recipes.length === 0) throw Error(`${FETCH_SEARCH_RES_ERR}`);

		//update state
		state.search.query = query;
		state.search.results = data.data.recipes;
		state.page.maxPageNo = Math.ceil(data.data.recipes.length / PAGE_SLOTS);
	} catch (err) {
		console.error(err, '💥💥');
		throw err;
	}
};
export const loadRecipe = async function (id) {
	try {
		const data = await fetchJson(`${API_URL}/${id}`);

		if (data.status == 'fail') throw Error(data.message);

		//update state
		state.recipe = data.data.recipe;
	} catch (err) {
		console.error(err.message, '💥💥');
		throw Error(`${FETCH_RECIPE_ERR}`);
	}
};

export const getResultsPage = function (pageNo) {
	state.page.pageNo = pageNo;
	const n = PAGE_SLOTS;
	return state.search.results.slice((pageNo - 1) * n, pageNo * n);
};

export const loadIngredientsPerServe = function (serve) {
	if (serve <= 0) return;
	const currentServe = state.recipe.servings;

	//update state
	state.recipe.ingredients.forEach(ing => {
		if (ing.quantity == null) return;
		ing.quantity = (ing.quantity / currentServe) * serve;
	});
	state.recipe.servings = serve;
};

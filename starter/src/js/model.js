import { API_URL, FETCH_RECIPE_ERR, FETCH_SEARCH_RES_ERR } from './config';
import { fetchJson } from './helper';

export const state = {
	recipe: {},
	search: {
		query: '',
		results: [],
	},
	results: {
		clickedResultEl: null,
	},
};

export const fetchSearchResults = async function (query) {
	try {
		if (!query) return;

		const data = await fetchJson(`${API_URL}?search=${query}`);

		if (data.data.recipes.length == 0) throw Error(`${FETCH_SEARCH_RES_ERR}`);

		state.search.query = query;
		state.search.results = data.data.recipes;
	} catch (err) {
		console.error(err, '💥💥');
		throw err;
	}
};
export const fetchRecipe = async function (id) {
	try {
		if (!id) return;
		const data = await fetchJson(`${API_URL}/${id}`);

		if (data.status == 'fail') throw Error(data.message);

		state.recipe = data.data.recipe;
	} catch (err) {
		console.error(err.message, '💥💥');
		throw Error(`${FETCH_RECIPE_ERR}`);
	}
};

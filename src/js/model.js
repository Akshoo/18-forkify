import {
	API_KEY,
	API_URL,
	FETCH_RECIPE_ERR,
	FETCH_SEARCH_RES_ERR,
	FORMAT_ERR,
	PAGE_SLOTS,
} from './config';
import { fetchJson, sendJson } from './helper';

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
	bookmarks: [],
};
const createrecipeobject = function (data) {
	const { recipe } = data.data;
	return {
		id: recipe.id,
		cookingTime: +recipe.cooking_time,
		image: recipe.image_url,
		ingredients: recipe.ingredients,
		publisher: recipe.publisher,
		servings: +recipe.servings,
		sourceUrl: recipe.source_url,
		title: recipe.title,
		...(recipe.key ? { key: recipe.key } : {}),
	};
};
const createResultsArray = function (data) {
	const { recipes: results } = data.data;
	return results.map(res => {
		return {
			title: res.title,
			id: res.id,
			publisher: res.publisher,
			image: res.image_url,
			...(res.key ? { key: res.key } : {}),
		};
	});
};
export const loadSearchResults = async function (query) {
	try {
		if (!query) return;

		const data = await fetchJson(`${API_URL}?search=${query}&key=${API_KEY}`);

		if (data.data.recipes.length === 0) throw Error(`${FETCH_SEARCH_RES_ERR}`);

		const results = createResultsArray(data);
		//update state
		state.search.query = query;
		state.search.results = results;
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

		const recipe = createrecipeobject(data);
		//update state
		state.recipe = recipe;
		if (state.bookmarks.some(bmark => bmark.id == id)) state.recipe.bookmarked = true;
		else state.recipe.bookmarked = false;
	} catch (err) {
		console.error(err.message, '💥💥');
		throw Error(`${FETCH_RECIPE_ERR}`);
	}
};

export const getResultsPage = function (pageNo = 1) {
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
const _saveBookmarks = function () {
	const bookmarksString = JSON.stringify(state.bookmarks);
	localStorage.setItem('bookmarks', bookmarksString);
};
export const addBookmark = function (recipe) {
	recipe.bookmarked = true;
	state.bookmarks.push(recipe);
	_saveBookmarks();
};
export const deleteBookmark = function (id) {
	const delIndex = state.bookmarks.findIndex(bmark => bmark.id == id);

	if (state.recipe.id == state.bookmarks[delIndex].id) state.recipe.bookmarked = false;

	state.bookmarks.splice(delIndex, 1);
	_saveBookmarks();
};
export const loadSavedBookmarks = function () {
	const bookmarksString = localStorage.getItem('bookmarks');
	if (!bookmarksString) return;
	state.bookmarks = JSON.parse(bookmarksString);
};
const createUploadRecipe = function (data) {
	try {
		let ingredients = Object.entries(data)
			.filter(ent => ent[0].startsWith('ingredient') && ent[1] != '')
			.map(ent => {
				const treatedValues = ent[1].replaceAll(' ', '').split(',');

				if (treatedValues.length !== 3 || treatedValues.every(val => val == ''))
					throw Error(FORMAT_ERR);

				const [quantity, unit, description] = ent[1].replaceAll(' ', '').split(',');
				return {
					quantity: quantity ? +quantity : null,
					unit: unit,
					description: description,
				};
			});
		return {
			cooking_time: +data.cookingTime,
			image_url: data.image,
			ingredients: ingredients,
			publisher: data.publisher,
			servings: +data.servings,
			source_url: data.sourceUrl,
			title: data.title,
		};
	} catch (err) {
		throw err;
	}
};
export const uploadUserRecipe = async function (updata) {
	try {
		const upRecipe = createUploadRecipe(updata);

		const data = await sendJson(`${API_URL}?key=${API_KEY}`, upRecipe);
		console.log(data);
		state.recipe = createrecipeobject(data);
		addBookmark(state.recipe);
	} catch (err) {
		console.log(err);
		console.error('💥', err.message);
		throw err;
	}

	// return recipe;
};
// loadSavedBookmarks();
// error handling trycatch createrecipeobject sendJson

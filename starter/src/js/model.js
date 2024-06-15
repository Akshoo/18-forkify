export const state = {
	searchResults: {},
};

export const fetchSearchResults = async function (search) {
	try {
		const resp = await fetch(
			`https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`
		);
		const data = await resp.json();
		state.searchResults = data.data.recipes;
		console.log(state);
		// return data;
	} catch (err) {
		console.log(err);
	}
};
// _fetchSearchResults('pizza');

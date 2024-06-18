class SearchView {
	_searchField = document.querySelector('.search__field');
	_searchButton = document.querySelector('.search__btn');

	getQuery() {
		return this._searchField.value;
	}
	addSearchHandler(handler) {
		this._searchButton.addEventListener('click', ev => {
			ev.preventDefault();
			handler();
			this._searchField.value = '';
			this._searchField.blur();
		});
	}
}

export default new SearchView();

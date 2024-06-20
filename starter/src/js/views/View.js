import icons from '../../img/icons.svg';
export default class View {
	_data;
	_parentEl;

	constructor(el) {
		this._parentEl = el;
	}
	render(data) {
		this._clear();
		this._data = data;
		const markup = this._generateMarkup();
		this._parentEl.insertAdjacentHTML('beforeend', markup);
	}

	renderSpinner() {
		this._clear();
		const html = `<div class="spinner">
		<svg>
            <use href="${icons}#icon-loader"></use>
			</svg>
			</div>`;

		this._parentEl.insertAdjacentHTML('afterbegin', html);
	}
	renderError(message) {
		this._clear();

		const html = `
		<div class="error">
		<div>
		<svg>
		<use href="${icons}#icon-alert-triangle"></use>
		</svg>
			</div>
			<p>${message}!</p>
			</div>`;

		this._parentEl.insertAdjacentHTML('afterbegin', html);
	}
	renderMessage(message = `Start by searching for a recipe or an ingredient. Have fun!`) {
		this._clear();
		const html = `
		<div class="message">
		<div>
		<svg>
		<use href="${icons}#icon-smile"></use>
		</svg>
		</div>
			<p>${message}</p>
		</div>`;
		this._parentEl.insertAdjacentHTML('afterbegin', html);
	}
	_clear() {
		this._parentEl.innerHTML = '';
	}
}

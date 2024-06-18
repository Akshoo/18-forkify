import icons from '../../img/icons.svg';
export default class View {
	_parentEl;
	constructor(el) {
		this._parentEl = el;
	}
	_clear() {
		this._parentEl.innerHTML = '';
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

		const html = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}!</p>
      </div>`;

		this._parentEl.insertAdjacentHTML('afterbegin', html);
	}
}

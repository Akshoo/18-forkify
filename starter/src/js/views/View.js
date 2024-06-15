import icons from '../../img/icons.svg';
export default class View {
	_parentEl;
	constructor(el) {
		this._parentEl = el;
	}
	renderSpinner() {
		const html = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;

		this._parentEl.insertAdjacentHTML('afterbegin', html);
	}
	endSpinner(patentEl) {
		patentEl.querySelector('.spinner')?.remove();
	}
}

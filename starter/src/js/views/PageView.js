import icons from '../../img/icons.svg';
import View from './View';

class PageView extends View {
	_nextBtn;
	_prevBtn;

	constructor() {
		super(document.querySelector('.pagination'));
	}
	clicked(btn) {
		this._prevBtn = this._parentEl.querySelector('.pagination__btn--prev');
		this._nextBtn = this._parentEl.querySelector('.pagination__btn--next');
		if (btn == this._nextBtn) {
			this._data.pageNo++;
		}
		if (btn == this._prevBtn) {
			this._data.pageNo--;
		}
		this.render(this._data);
	}
	addPageHandler(handler) {
		this._parentEl.addEventListener('click', function (ev) {
			const clickedBtn = ev.target.closest('.btn--inline');
			if (!clickedBtn) return;

			handler(+clickedBtn.dataset.goto);
		});
	}

	_generateMarkup() {
		return `${this._generatePrev()} ${this._generateNext()}`;
	}
	_generatePrev() {
		if (this._data.pageNo <= 1) return ``;

		return `<button data-goto="${
			this._data.pageNo - 1
		}" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
              </svg>
            <span>Page ${this._data.pageNo - 1}</span>
          </button>`;
	}
	_generateNext() {
		if (this._data.pageNo >= this._data.maxPageNo) return ``;

		return `<button data-goto="${
			this._data.pageNo + 1
		}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.pageNo + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            
          </button>`;
	}
}
export default new PageView();

import icons from '../../img/icons.svg';
class PageView {
	_parentEl = document.querySelector('.pagination');
	_nextBtn;
	_prevBtn;
	_maxPno = 0;
	_prevPno = 0;
	_nextPno = 2;

	renderPageBtns(maxPno = this._maxPno) {
		this._maxPno = maxPno;
		this._clear();
		const markup = this._generateMarkup();
		this._parentEl.insertAdjacentHTML('afterbegin', markup);
		this._nextBtn = this._parentEl.querySelector('.pagination__btn--next');
		this._prevBtn = this._parentEl.querySelector('.pagination__btn--prev');
	}
	clicked(btn) {
		if (btn == this._nextBtn) {
			this.clickedNext();
			return 1;
		}
		if (btn == this._prevBtn) {
			this.clickedPrev();
			return -1;
		}
	}
	addPageHandler(handler) {
		this._parentEl.addEventListener('click', handler);
	}
	clickedNext() {
		this._nextPno++;
		this._prevPno++;
		this.renderPageBtns();
	}
	clickedPrev() {
		this._nextPno--;
		this._prevPno--;
		this.renderPageBtns();
	}
	_generateMarkup() {
		return `${this._generatePrev()}${this._generateNext()}`;
	}
	_generatePrev() {
		if (this._prevPno <= 0) return ``;

		return `<button class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
              </svg>
            <span>Page ${this._prevPno}</span>
          </button>`;
	}
	_generateNext() {
		if (this._nextPno > this._maxPno) return ``;

		return `<button class="btn--inline pagination__btn--next">
            <span>Page ${this._nextPno}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            
          </button>`;
	}
	_clear() {
		this._parentEl.innerHTML = '';
	}
}
export default new PageView();

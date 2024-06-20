import View from './View';

class ResultView extends View {
	constructor() {
		super(document.querySelector('.results'));
	}

	addResultHandler(handler) {
		this._parentEl.addEventListener('click', handler);
	}

	_generateMarkup() {
		let markup = '';
		this._data.forEach(res => {
			markup += `<li class="preview">
            <a class="preview__link " href="#${res.id}">
              <figure class="preview__fig">
                <img src="${res.image_url}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${res.title}</h4>
                <p class="preview__publisher">${res.publisher}</p>
              </div>
            </a>
          </li>`;
		});
		return markup;
	}
}
export default new ResultView();

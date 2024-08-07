import View from './View';
import icons from '../../img/icons.svg';


class BookmarksView extends View {
	constructor() {
		super(document.querySelector('.bookmarks__list'));
	}
	_generateMarkup() {
		const curId = window.location.hash.slice(1);
		let markup = '';
		this._data.forEach(res => {
			markup += `<li class="preview">
            <a class="preview__link ${res.id == curId ? 'preview__link--active' : ''} " href="#${
				res.id
			}">
              <figure class="preview__fig">
                <img src="${res.image}" alt="Test" />

              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${res.title}</h4>
                <p class="preview__publisher">${res.publisher}</p>
				<div class="preview__user-generated ${!res.key ? 'hidden' : ''}">
				  <svg>
					  <use href="${icons}#icon-user"></use>
				  </svg>
				</div>

              </div>
            </a>
          </li>`;
		});
		return markup;
	}
}
export default new BookmarksView();

import View from './View';
import icons from '../../img/icons.svg';
import 'fractional';

class RecipeView extends View {
	// // this._data is{
	// 	id: ,
	// 	cookingTime: ,
	// 	image: ,
	// 	ingredients: ,
	// 	publisher: ,
	// 	servings: ,
	// 	sourceUrl: ,
	// 	title: ,
	// 	key?

	// }
	constructor() {
		super(document.querySelector('.recipe'));
	}

	addRecipeHandler(handler) {
		['hashchange', 'load'].forEach(onE => {
			window.addEventListener(onE, () => {
				handler(window.location.hash.slice(1));
			});
		});
	}
	addServingsHandler(handler) {
		this._parentEl.addEventListener('click', ev => {
			const clicked = ev.target.closest('.btn-update-servings');
			if (!clicked) return;

			handler(+clicked.dataset.gotoserve);
		});
	}
	addBookmarksHandler(handler) {
		this._parentEl.addEventListener('click', ev => {
			const clicked = ev.target.closest('.btn--bookmark');
			if (!clicked) return;
			handler();
		});
	}

	_generateMarkup() {
		const data = this._data;
		return `
    <figure class="recipe__fig">
        <img src="${data.image}" alt="${data.title}" class="recipe__img" />

        <h1 class="recipe__title">
          <span>${data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info ">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${data.cookingTime}</span>

          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info recipe__info-servings">
          ${this._generateServingsMarkup(data.servings)}
        </div>
        <div class="recipe__user-generated ${!data.key ? 'hidden' : ''}">

          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${data.bookmarked ? '-fill' : ''}"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._generateIngredientMarkup(data.ingredients)}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${data.sourceUrl}"

          target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
	}
	_generateServingsMarkup() {
		const servings = this._data.servings;
		return `
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button data-gotoserve="${
				servings - 1
			}" class="btn--tiny btn-update-servings btn--decrease-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button data-gotoserve="${
				servings + 1
			}" class="btn--tiny btn-update-servings btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
    `;
	}
	_generateIngredientMarkup() {
		const ingredients = this._data.ingredients;
		return ingredients
			.map(
				ing => `
    <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
				ing.quantity == null ? '' : new Fraction(ing.quantity).toString()
			}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
      </li>`
			)
			.join('');
	}
}
export default new RecipeView();

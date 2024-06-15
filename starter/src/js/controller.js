import icons from '../img/icons.svg';
import * as model from '../js/model';
// console.log(icons);

const recipeContainer = document.querySelector('.recipe');
const resultsList = document.querySelector('.results');
const searchBtn = document.querySelector('.search__btn');
const searchField = document.querySelector('.search__field');

let selectedResult;

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

// https://forkify-api.herokuapp.com/v2
//https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886

///////////////////////////////////////
// #rendering recipes

const renderSpinner = function (parentEl) {
	const html = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;

	parentEl.insertAdjacentHTML('afterbegin', html);
};
const endSpinner = function (patentEl) {
	patentEl.querySelector('.spinner')?.remove();
};

const renderError = function () {
	recipeContainer.innerHTML = '';

	const html = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>No recipes found for your query. Please try again!</p>
      </div>`;

	recipeContainer.insertAdjacentHTML('afterbegin', html);
};

const renderRecipe = function (data) {
	const html = `<figure class="recipe__fig">
        <img src="${data.image_url}" alt="${data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${data.cooking_time}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${data.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${data.ingredients
			.map(
				ing => `<li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity == null ? '' : ing.quantity}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>`
			)
			.join(' ')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${data.source_url}"
          target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;

	recipeContainer.insertAdjacentHTML('beforeend', html);
};

const showRecipe = async function (id) {
	try {
		if (id == '') return;
		recipeContainer.innerHTML = '';
		renderSpinner(recipeContainer);

		const resp = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
		const data = await resp.json();

		if (!resp.ok) throw Error(data.message);
		renderRecipe(data.data.recipe);

		endSpinner(recipeContainer);
	} catch (err) {
		console.error(err.message);
		renderError();
	}
};
// showRecipe('5ed6604591c37cdc054bc886');

////////////////////////////////////////
// #rendering search results

const fetchSearchResults = async function (search) {
	try {
		const resp = await fetch(
			`https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`
		);
		const data = await resp.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

const showResults = async function (search) {
	renderSpinner(resultsList);
	const {
		data: { recipes: results },
	} = await fetchSearchResults(search);

	resultsList.innerHTML = '';
	results.forEach(res => {
		const html = `<li class="preview">
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
		resultsList.insertAdjacentHTML('beforeend', html);
	});
	endSpinner(resultsList);
};

///////////////////////////////////////////
// #event handlers

searchBtn.addEventListener('click', ev => {
	ev.preventDefault();
	if (searchField.value == '') return;

	showResults(searchField.value);
	searchField.blur();
});

resultsList.addEventListener('click', ev => {
	selectedResult?.classList.remove('preview__link--active');
	selectedResult = ev.target.closest('.preview');
	selectedResult.classList.add('preview__link--active');
});

['hashchange', 'load'].forEach(e => {
	window.addEventListener(e, ev => {
		const id = window.location.hash.slice(1);
		showRecipe(id);
	});
});

import View from './View';
import icons from '../../img/icons.svg';

class UserRecipeView extends View {
	_overlay;
	_closeBtn;
	_openBtn;
	_formEl;
	_submitRecipeBtn;
	constructor() {
		super(document.querySelector('.add-recipe-window'));
		this._openBtn = document.querySelector('.nav__btn--add-recipe');
		this._overlay = document.querySelector('.overlay');
		this._closeBtn = this._parentEl.querySelector('.btn--close-modal');
		this._submitRecipeBtn = this._parentEl.querySelector('.upload__btn');
		this._formEl = this._parentEl.querySelector('.upload');
		this._addModalHandler();
	}
	toggleModal(ev) {
		console.log('toggled');
		// console.log(ev);
		// console.log(this._overlay.classList, this._parentEl.classList);
		this._overlay.classList.toggle('hidden');
		this._parentEl.classList.toggle('hidden');
	}
	toggleForm() {}
	render() {
		this._clear();
		const markup = this._generateMarkup();
		this._parentEl.insertAdjacentHTML('afterbegin', markup);
		// this._addModalHandler();

		this._closeBtn = this._parentEl.querySelector('.btn--close-modal');
		this._submitRecipeBtn = this._parentEl.querySelector('.upload__btn');
		this._formEl = this._parentEl.querySelector('.upload');

		this._closeBtn.addEventListener('click', this.toggleModal.bind(this));
		this._submitRecipeBtn.addEventListener('click', ev => {
			ev.preventDefault();
			const dataAr = [...new FormData(this._formEl)];
			const data = Object.fromEntries(new FormData(this._formEl).entries());
			this._handler(data);
			// console.log();
		});
	}
	_generateMarkup() {
		return `<button class="btn--close-modal">&times;</button>
    <form class="upload">
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input value="" required name="title" type="text" />
        <label>URL</label>
        <input value="" required name="sourceUrl" type="text" />
        <label>Image URL</label>
        <input value="" required name="image" type="text" />
        <label>Publisher</label>
        <input value="" required name="publisher" type="text" />
        <label>Prep time</label>
        <input value="" required name="cookingTime" type="number" />
        <label>Servings</label>
        <input value="" required name="servings" type="number" />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label>Ingredient 1</label>
        <input value="" type="text" required name="ingredient-1"
          placeholder="Format: 'Quantity,Unit,Description'" />
        <label>Ingredient 2</label>
        <input value="" type="text" name="ingredient-2" placeholder="Format: 'Quantity,Unit,Description'" />
        <label>Ingredient 3</label>
        <input value="" type="text" name="ingredient-3" placeholder="Format: 'Quantity,Unit,Description'" />
        <label>Ingredient 4</label>
        <input type="text" name="ingredient-4" placeholder="Format: 'Quantity,Unit,Description'" />
        <label>Ingredient 5</label>
        <input type="text" name="ingredient-5" placeholder="Format: 'Quantity,Unit,Description'" />
        <label>Ingredient 6</label>
        <input type="text" name="ingredient-6" placeholder="Format: 'Quantity,Unit,Description'" />
      </div>

      <button class="btn upload__btn">
        <svg>
          <use href="${icons}#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>
    </form>`;
	}
	_addModalHandler() {
		// this._openBtn.addEventListener('click', this.toggleModal.bind(this));

		[this._overlay, this._closeBtn, this._openBtn].forEach(_ =>
			_.addEventListener('click', this.toggleModal.bind(this))
		);
	}
	addUserRecipeViewHandler(handler) {
		this._handler = handler;
		this._submitRecipeBtn.addEventListener('click', ev => {
			ev.preventDefault();
			const dataAr = [...new FormData(this._formEl)];
			const data = Object.fromEntries(new FormData(this._formEl).entries());
			console.log();
			handler(data);
			// console.log();
		});
	}
}
export default new UserRecipeView();

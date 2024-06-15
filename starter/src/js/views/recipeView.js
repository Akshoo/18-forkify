import View from './View';

class RecipeView extends View {
	constructor() {
		super(document.querySelector('.recipe'));
	}
}
export default new RecipeView();

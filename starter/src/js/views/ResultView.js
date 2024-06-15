import View from './View';

class ResultView extends View {
	constructor() {
		super(document.querySelector('.results'));
	}
}
export default new ResultView();

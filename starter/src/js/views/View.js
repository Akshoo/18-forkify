import icons from '../../img/icons.svg';
export default class View {
	_data;
	_parentEl;

	constructor(el) {
		this._parentEl = el;
	}
	render(data) {
		if (!data) return;
		this._clear();
		this._data = data;
		const markup = this._generateMarkup();
		this._parentEl.insertAdjacentHTML('beforeend', markup);
	}
	update(data = this._data) {
		if (!data) return;
		this._data = data;
		// createing a vrtual dom
		// then finding out what elements changed
		// (different in virDom(with updated data) than actual dom(with unupdated data))
		// then only updating those chaneged elements in actual dom

		const markup = this._generateMarkup();
		// const newDom = document.createElement('div');
		// newDom.insertAdjacentHTML('afterbegin', markup);

		const newDom2 = document.createRange().createContextualFragment(markup);
		//👆
		//the inner contents of dom2 are similar to dom in such a way that
		//if result dom2 is wrapped in a div, it will be same as dom1

		const curElems = this._parentEl.querySelectorAll('*');
		// const newElems = newDom.querySelectorAll('*');
		const newElems = newDom2.querySelectorAll('*');

		newElems.forEach((newEl, i) => {
			const curEl = curElems.item(i);
			//updating inner contents of dom elements
			if (
				!newEl.isEqualNode(curEl) &&
				newEl.firstChild?.nodeValue.trim() !== null &&
				newEl.firstChild?.nodeValue.trim() !== ''
			) {
				console.log(newEl.firstChild?.nodeValue);
				// curEl.firstChild.nodeValue = newEl.firstChild?.nodeValue;
				curEl.textContent = newEl.textContent;
			}

			if (!newEl.isEqualNode(curEl))
				Array.from(newEl.attributes).forEach(attr =>
					curEl.setAttribute(attr.name, attr.value)
				);
		});
	}
	renderSpinner() {
		this._clear();
		const html = `<div class="spinner">
		<svg>
            <use href="${icons}#icon-loader"></use>
			</svg>
			</div>`;

		this._parentEl.insertAdjacentHTML('afterbegin', html);
	}
	renderError(message) {
		this._clear();

		const html = `
		<div class="error">
		<div>
		<svg>
		<use href="${icons}#icon-alert-triangle"></use>
		</svg>
			</div>
			<p>${message}!</p>
			</div>`;

		this._parentEl.insertAdjacentHTML('afterbegin', html);
	}
	renderMessage(message = `Start by searching for a recipe or an ingredient. Have fun!`) {
		this._clear();
		const html = `
		<div class="message">
		<div>
		<svg>
		<use href="${icons}#icon-smile"></use>
		</svg>
		</div>
			<p>${message}</p>
		</div>`;
		this._parentEl.insertAdjacentHTML('afterbegin', html);
	}
	_clear() {
		this._parentEl.innerHTML = '';
	}
}

export function formRating(panel) {
	// Rating
	const ratings = panel.querySelectorAll('[data-rating]');
	if (ratings.length) {
		// Loop through each rating element
		ratings.forEach(rating => {
			// Parse rating value and size from dataset attributes
			const ratingValue = +rating.dataset.ratingValue;
			const ratingSize = +rating.dataset.ratingSize ? +rating.dataset.ratingSize : 5;
			// Initialize the rating
			formRatingInit(rating, ratingSize);
			// Set the initial rating value, if provided
			ratingValue ? formRatingSet(rating, ratingValue) : null;
			// Add click event listener to handle rating actions
			document.addEventListener('click', formRatingAction);
		});
	}

	// Handle rating actions
	function formRatingAction(e) {
		const targetElement = e.target;
		// Check if the clicked element is a rating input
		if (targetElement.closest('.rating__input')) {
			const currentElement = targetElement.closest('.rating__input');
			const ratingValue = +currentElement.value;
			const rating = currentElement.closest('.rating');
			const ratingSet = rating.dataset.rating === 'set';
			ratingSet ? formRatingGet(rating, ratingValue) : null;
		}
	}

	// Initialize the rating element
	function formRatingInit(rating, ratingSize) {
		let ratingItems = ``;
		// Generate rating items markup
		for (let index = 0; index < ratingSize; index++) {
			index === 0 ? ratingItems += `<div class="rating__items">` : null;
			ratingItems += `
				<label class="rating__item">
					<input class="rating__input" type="radio" name="rating" value="${index + 1}">
				</label>`;
			index === ratingSize ? ratingItems += `</div">` : null;
		}
		// Insert rating items markup into the rating element
		rating.insertAdjacentHTML("beforeend", ratingItems);
	}

	// Handle rating retrieval from backend
	function formRatingGet(rating, ratingValue) {
		// Send ratingValue to the backend...
		// Receive new session rating from formRatingSend() or display the user's input
		const resultRating = ratingValue;
		formRatingSet(rating, resultRating);
	}

	// Set the rating value visually
	function formRatingSet(rating, value) {
		const ratingItems = rating.querySelectorAll('.rating__item');
		const resultFullItems = parseInt(value);
		const resultPartItem = value - resultFullItems;

		// Set rating title attribute if provided
		rating.hasAttribute('data-rating-title') ? rating.title = value : null;

		// Iterate through each rating item and update its appearance
		ratingItems.forEach((ratingItem, index) => {
			ratingItem.classList.remove('rating__item--active');
			ratingItem.querySelector('span') ? ratingItems[index].querySelector('span').remove() : null;

			if (index <= (resultFullItems - 1)) {
				ratingItem.classList.add('rating__item--active');
			}
			if (index === resultFullItems && resultPartItem) {
				ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${resultPartItem * 100}%"></span>`);
			}
		});
	}

	// Placeholder function for sending rating to backend (not implemented)
	function formRatingSend() {
		console.log('Placeholder function for sending rating to backend');
	}
}

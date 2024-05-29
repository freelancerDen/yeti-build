/**
 * The function `handleRemoveImageClick` removes the closest parent element with the class
 * 'galleryItem' when a click event is triggered.
 * @param event - The `event` parameter in the `handleRemoveImageClick` function represents the event
 * that occurred, such as a click event on a button. It contains information about the event, such as
 * the target element that triggered the event.
 */
function handleRemoveImageClick(event) {
  const { currentTarget } = event;
  const item = currentTarget.closest('.galleryItem');

  item.remove();
}

/**
 * The function `setEventListeners` adds click event listeners to all elements with the class
 * `removeGalleryItem`.
 */
function setEventListeners() {
  const removeButtons = document.querySelectorAll('.removeGalleryItem');

  removeButtons.forEach((btn) => {
    btn.addEventListener('click', handleRemoveImageClick);
  });
}

/**
 * The function `removeEventListeners` removes event listeners from all elements with the class
 * `removeGalleryItem`.
 */
function removeEventListeners() {
  const removeButtons = document.querySelectorAll('.removeGalleryItem');

  removeButtons.forEach((btn) => {
    btn.removeEventListener('click', handleRemoveImageClick);
  });
}

/**
 * The `init` function initializes the code by setting event listeners.
 */
function init() {
  setEventListeners();
}

/**
 * The function `updateInit` removes existing event listeners and sets new event listeners.
 */
function updateInit() {
  removeEventListeners();
  setEventListeners();
}

init();

export default { updateInit };

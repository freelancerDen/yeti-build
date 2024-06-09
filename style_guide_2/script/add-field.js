import customInput from './input.js';
import { handleButtonModeClick, handleButtonListClick } from './buttons.js';

/**
 * The function `handleRemoveButtonClick` removes the closest `.fieldWrapper` element when a button is
 * clicked.
 * @param event - The `event` parameter is an object that contains information about the event that
 * occurred, such as the type of event, the target element that triggered the event, and any additional
 * data related to the event. In this case, the `handleRemoveButtonClick` function is likely a click
 * event handler for a
 */
function handleRemoveButtonClick(event) {
  const { currentTarget } = event;

  const currentField = currentTarget.closest('.fieldWrapper');
  currentField.remove();
}

/**
 * The function `handleAddButtonClick` clones a template, adds event listeners to inputs and buttons
 * within the clone, and appends the clone to a container.
 * @param event - The `event` parameter in the `handleAddButtonClick` function represents the event
 * that occurred, such as a button click. It contains information about the event, like the target
 * element that triggered the event. In this function, we are using the event to handle the addition of
 * new fields by cloning a
 */
function handleAddButtonClick(event) {
  const { currentTarget } = event;

  const instance = currentTarget.closest('.addFieldsInstance');
  const template = instance.querySelector('.fieldTemplate');
  const clone = template.content.cloneNode(true);

  const inputs = clone.querySelectorAll('input');
  if (inputs.length > 0) {
    inputs.forEach((input) => {
      customInput.setEventListeners(input);
    });
  }

  const modeButtons = clone.querySelectorAll('[data-type="time"]');
  if (modeButtons.length > 0) {
    modeButtons.forEach((btn) => {
      btn.addEventListener('click', handleButtonModeClick);
    });
  }

  const buttons = clone.querySelectorAll('[data-type="btn"]');
  if (buttons.length > 0) {
    buttons.forEach((btn) => {
      btn.addEventListener('click', handleButtonListClick);
    });
  }

  const removeButton = clone.querySelector('.removeFieldButton');
  removeButton.addEventListener('click', handleRemoveButtonClick);

  const container = instance.querySelector('.fieldContainer');
  container.appendChild(clone);
}

/**
 * Initializes the add fields functionality.
 * It attaches event listeners to the add and remove buttons within each instance of the add fields.
 */
function init() {
  // Select all instances of the add fields
  const allInstances = document.querySelectorAll('.addFieldsInstance');

  // Loop through each instance
  allInstances.forEach((instance) => {
    // Get the add button within the instance
    const addButton = instance.querySelector('.addFieldButton');

    // Get all remove buttons within the instance
    const removeButtons = instance.querySelectorAll('.removeFieldButton');

    // Attach the handleAddButtonClick function as a click event listener to the add button
    addButton.removeEventListener('click', handleAddButtonClick);

    // Attach the handleRemoveButtonClick function as a click event listener to each remove button
    removeButtons.forEach((btn) => {
      btn.removeEventListener('click', handleRemoveButtonClick);
    });

    // Attach the handleAddButtonClick function as a click event listener to the add button
    addButton.addEventListener('click', handleAddButtonClick);

    // Attach the handleRemoveButtonClick function as a click event listener to each remove button
    removeButtons.forEach((btn) => {
      btn.addEventListener('click', handleRemoveButtonClick);
    });
  });
}

init();

export default { init };

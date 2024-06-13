import customInput from './input.js';

const editSettingsButton = document.querySelector('.editSettingsButton');
const resetSettingsButton = document.querySelector('.resetSettingsButton');
const inputs = document.querySelectorAll('.resetSettingsInput');

/**
 * The function `handleEditSettingsClick` adds a class to hide the current target element, removes a
 * class to show another button, and enables custom inputs.
 * @param event - The `event` parameter in the `handleEditSettingsClick` function is an event object
 * that contains information about the event that triggered the function, such as a click event on a
 * button or element. It can be used to access properties like the target element that triggered the
 * event, event type, and
 */
function handleEditSettingsClick(event) {
  const { currentTarget } = event;

  currentTarget.classList.add('d-none');
  resetSettingsButton.classList.remove('d-none');
  inputs.forEach((el) => {
    customInput.enable(el);
  });
}

function setEventListeners() {
  editSettingsButton.addEventListener('click', handleEditSettingsClick);
}

function init() {
  setEventListeners();
}

init();

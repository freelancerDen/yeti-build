import initSwitcher from './switcher.js';
import stretchPanel from './initScriptsForStretchPanel.js';
import selector from './selector.js';
import { handleButtonModeClick, handleButtonListClick } from './buttons.js';
import customInput from './input.js';
import { handleClickModalButton } from './modals.js';
import profitRange from './profitRange.js';
import { hideMonetaryValue } from './hide-monetary-value.js';
import gallery from './gallery.js';
import addField from './add-field.js';

const button = document.querySelector('.addInstance');

/**
 * The function `handleButtonClick` handles button click events by cloning a template, adding event
 * listeners to various elements within the clone, updating HTML content, and appending the clone to a
 * container.
 * @param event - The `event` parameter in the `handleButtonClick` function represents the event that
 * occurred, such as a button click. It contains information about the event, like the target element
 * that triggered the event. In this function, we are using it to access the current target element
 * that was clicked to perform further
 */
function handleButtonClick(event) {
  const { currentTarget } = event;

  const panelName = currentTarget.dataset.panelName;

  const template = document.querySelector(`#${panelName}`);
  const container = document.querySelector('#panelContainer');

  const clone = template.content.cloneNode(true);

  const inputs = clone.querySelectorAll('input[type="text"]');
  const modeButtons = clone.querySelectorAll('[data-type="time"]');
  const buttons = clone.querySelectorAll('[data-type="btn"]');
  const buttonsModal = clone.querySelectorAll('[data-modal-name]');
  const profitRangeContainer = clone.querySelector('.profit-range');

  if (inputs.length > 0) {
    inputs.forEach((input) => {
      customInput.setEventListeners(input);
    });
  }

  if (modeButtons.length > 0) {
    modeButtons.forEach((btn) => {
      btn.addEventListener('click', handleButtonModeClick);
    });
  }

  if (buttons.length > 0) {
    buttons.forEach((btn) => {
      btn.addEventListener('click', handleButtonListClick);
    });
  }

  if (buttonsModal.length > 0) {
    buttonsModal.forEach((btn) => {
      btn.addEventListener('click', handleClickModalButton);
    });
  }

  profitRange.updateHTML(profitRangeContainer);
  stretchPanel.runScripts(clone);

  container.appendChild(clone);

  initSwitcher.initRegSwitcherHandler();
  selector.init();
  hideMonetaryValue();
  gallery.updateInit();
  addField.init();
}

/**
 * The function `setEventListeners` adds a click event listener to a button element that calls the
 * `handleButtonClick` function when clicked.
 */
function setEventListeners() {
  button.addEventListener('click', handleButtonClick);
}

function checkPageName() {
  const body = document.querySelector('body');

  const { pageName } = body.dataset;

  const addPanelButton = document.querySelector('.addPanelButton');

  switch (pageName) {
    case 'limitter':
      addPanelButton.textContent = 'Add Limmiter';
      addPanelButton.dataset.panelName = 'limitter-panel';
      break;

    case 'runner':
      addPanelButton.textContent = 'Add Runner';
      addPanelButton.dataset.panelName = 'runner-panel';
      break;

    default:
      addPanelButton.textContent = 'Add';
      addPanelButton.dataset.panelName = 'default';
      break;
  }
}

setEventListeners();
checkPageName();

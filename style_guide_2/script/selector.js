// Importing setAnimation from rolltext.js
import setAnimation from './rolltext.js';
import customInput from './input.js';
import { handleButtonModeClick, handleButtonListClick } from './buttons.js';
import initSwitcher from './switcher.js';
import { hideMonetaryValue } from './hide-monetary-value.js';
import addLineField from './add-line-field.js';

/**
 * The function `renderFieldsTemplate` clones a template based on a specified selector value and
 * appends it to a container, while also attaching event listeners to inputs, buttons, and mode buttons
 * within the template.
 * @param element - The `element` parameter in the `renderFieldsTemplate` function represents the HTML
 * element that triggered the rendering of the fields template. It is used to determine the template to
 * render based on its `dataset.selectorValue` attribute.
 * @param containerSelector - The `containerSelector` parameter in the `renderFieldsTemplate` function
 * is used to specify a selector for the container where the template should be rendered. If a
 * `containerSelector` is provided, the template will be appended to the element matching that selector
 * within the panel element. If no `containerSelector
 * @returns The function `renderFieldsTemplate` returns nothing (undefined).
 */
function renderFieldsTemplate(element, containerSelector) {
  const selectorWrap = element.closest('.selectorWrap');
  const templateName = element.dataset.selectorValue;
  let inputContainer;

  if (containerSelector) {
    const panel = element.closest('[data-panel-id]');
    inputContainer = panel.querySelector(containerSelector);
  } else {
    inputContainer = selectorWrap.querySelector('.selectorInputContainer');
  }

  const template = selectorWrap.querySelector(
    `[data-template-name="${templateName}"]`,
  );

  if (!template) {
    console.warn(`No such template with data-template-name="${templateName}"`);
    return;
  }

  const clone = template.content.cloneNode(true);
  const inputs = clone.querySelectorAll('input[type="text"]');
  const modeButtons = clone.querySelectorAll('[data-type="time"]');
  const buttons = clone.querySelectorAll('[data-type="btn"]');

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
    buttons.forEach((el) => {
      el.addEventListener('click', handleButtonListClick);
    });
  }

  inputContainer.innerHTML = '';
  addLineField.setEventListeners(clone);
  inputContainer.appendChild(clone);

  hideMonetaryValue();
  initSwitcher.initRegSwitcherHandler();
}

// Function to swap inner text of two elements
const swapInnerText = (newElement, oldElement) => {
  // Check if either element is invalid
  if (!newElement || !oldElement) {
    console.error('One or both elements are invalid.');
    return;
  }

  // Swap inner text of the elements
  const tempText = newElement.innerText;

  newElement.innerText = oldElement.innerText;
  oldElement.innerText = tempText;

  /* This block of code is swapping the `dataset.selectorValue` attribute values between `newElement`
  and `oldElement`. It first checks if both `newElement` and `oldElement` have
  `dataset.selectorValue` values. If they do, it swaps these values between the two elements. */
  if (newElement.dataset.selectorValue && oldElement.dataset.selectorValue) {
    const tempValue = newElement.dataset.selectorValue;

    newElement.dataset.selectorValue = oldElement.dataset.selectorValue;
    oldElement.dataset.selectorValue = tempValue;

    if (oldElement.dataset.containerId) {
      renderFieldsTemplate(oldElement, `#${oldElement.dataset.containerId}`);
    } else {
      renderFieldsTemplate(oldElement);
    }
  }
};

// Function to set the inner text of one element to another
const setSelectorData = (newElement, oldElement) => {
  swapInnerText(newElement, oldElement);

  const wrap = oldElement.closest('.selectorWrap');

  if (!wrap) return;

  const inputs = wrap.querySelectorAll('.selectorDisableTarget');

  if (inputs.length === 0) return;

  if (oldElement.innerText === 'Disable') {
    inputs.forEach((el) => {
      customInput.disable(el);
    });
  } else {
    inputs.forEach((el) => {
      customInput.enable(el);
    });
  }
};

// Function to close all dropdowns
const closeAllDropdowns = () => {
  // Remove 'show' class from all dropdowns and remove event handlers
  document.querySelectorAll('.selector__dropdown').forEach((dropdown) => {
    dropdown.classList.remove('show');
    setAnimation.removeEventHandler(
      dropdown.querySelectorAll('ul > li > .selector__dropdown-text'),
    );
  });
};

// Event handler for click events
const handleClick = (e) => {
  // Function to get the selector head text when clicking outside a dropdown
  const clickOutOfDW = () => {
    try {
      return e.target
        .closest('.selector')
        .querySelector('.selector__inner-text');
    } catch (error) {
      return null;
    }
  };

  // Check if the clicked element is a dropdown text
  const dropdownText = e.target.classList.contains('selector__dropdown-text');
  const selectorDWText = e.target;
  const selectorHeadText = clickOutOfDW();

  // Swap inner text if a dropdown text is clicked
  if (dropdownText) {
    setSelectorData(selectorDWText, selectorHeadText);
  }

  // Check if the clicked element is a selector inner text or header
  const compose =
    e.target.classList.contains('selector__inner-text') ||
    e.target.classList.contains('selector__header');

  // Check if the dropdown is inactive
  const inactive = () => {
    try {
      const check = e.target.closest('.selector').querySelector('.inactive');
      return check === null ? true : false;
    } catch (error) {
      return false;
    }
  };

  // Open or close dropdowns based on click location and activity
  if (compose && inactive()) {
    const closestDW = e.target
      .closest('.selector')
      .querySelector('.selector__dropdown');
    const dropDownList = closestDW.querySelectorAll(
      'ul > li > .selector__dropdown-text',
    );
    closeAllDropdowns();
    closestDW.classList.add('show');
    setAnimation.setEventHandler(dropDownList);
  } else {
    closeAllDropdowns();
  }
};

// Function to initialize event listeners when the DOM content is loaded
const init = () => {
  const selectorText = document.querySelectorAll('.selector__inner-text');
  // Set event handlers for all page elements
  setAnimation.setEventHandler(selectorText);
  // Add click event listener to the body
  document.body.addEventListener('click', handleClick);
};

// Add event listener to initialize when the DOM content is loaded
document.addEventListener('DOMContentLoaded', init);

export default { init };

const hideValueButtons = document.querySelectorAll('.hideValueButton');

function getCurrentState() {
  return document
    .querySelector('body')
    .classList.contains('hide-monetary-value');
}

function changeButtonState(button) {
  const currentState = getCurrentState();

  button.dataset.hideState = currentState;

  if (currentState) {
    button.classList.remove('btn-active');
  } else {
    button.classList.add('btn-active');
  }
}

export function hideMonetaryValue() {
  const currentState = getCurrentState();
  const allInputs = document.querySelectorAll('input[data-unit="$"]');
  const allDataFields = document.querySelectorAll('[data-value="data-field"]');

  allInputs.forEach((input) => {
    const wrapper = input.closest('[data-input="input-field"]');

    if (currentState) {
      wrapper.classList.add('hide-value');
    } else {
      wrapper.classList.remove('hide-value');
    }
  });

  allDataFields.forEach((field) => {
    if (field.dataset.unit === '$') {
      if (currentState) {
        field.classList.add('hide-value');
      } else {
        field.classList.remove('hide-value');
      }
    }
  });
}

function toggleBodyClass() {
  const currentState = getCurrentState();
  const body = document.querySelector('body');

  if (currentState) {
    body.classList.remove('hide-monetary-value');
  } else {
    body.classList.add('hide-monetary-value');
  }
}

function handleHideValueButtonClick(event) {
  const { currentTarget } = event;

  toggleBodyClass();
  changeButtonState(currentTarget);
  hideMonetaryValue(currentTarget);
}

function init() {
  if (!hideValueButtons.length === 0) return;

  hideValueButtons.forEach((button) => {
    button.addEventListener('click', handleHideValueButtonClick);
  });
}

init();

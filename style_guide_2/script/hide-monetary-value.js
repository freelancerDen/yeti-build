const hideValueButton = document.querySelector('.hideValueButton');

function changeState(button) {
  const hideState = button.dataset.hideState;

  if (hideState === 'true') {
    button.dataset.hideState = 'false';
    button.classList.remove('btn-active');
  } else {
    button.dataset.hideState = 'true';
    button.classList.add('btn-active');
  }
}

export function hideMonetaryValue() {
  const hideState = hideValueButton.dataset.hideState;
  const allInputs = document.querySelectorAll('input[data-unit="$"]');
  const allDataFields = document.querySelectorAll('[data-value="data-field"]');

  allInputs.forEach((input) => {
    const wrapper = input.closest('[data-input="input-field"]');

    if (hideState === 'true') {
      wrapper.classList.remove('hide-value');
    } else {
      wrapper.classList.add('hide-value');
    }
  });

  allDataFields.forEach((field) => {
    if (field.dataset.unit === '$') {
      if (hideState === 'true') {
        field.classList.remove('hide-value');
      } else {
        field.classList.add('hide-value');
      }
    }
  });
}

function handleHideValueButtonClick(event) {
  const { currentTarget } = event;

  changeState(currentTarget);
  hideMonetaryValue();
}

function init() {
  if (!hideValueButton) return;

  hideValueButton.addEventListener('click', handleHideValueButtonClick);
}

init();

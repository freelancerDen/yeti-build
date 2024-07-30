const hideValueButtons = document.querySelectorAll(
  '.hidePredictionValueButton',
);

function getCurrentState() {
  return document
    .querySelector('body')
    .classList.contains('hide-prediction-value');
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

function toggleBodyClass() {
  const currentState = getCurrentState();
  const body = document.querySelector('body');

  console.log(currentState);

  if (currentState) {
    body.classList.remove('hide-prediction-value');
  } else {
    body.classList.add('hide-prediction-value');
  }
}

function handleHideValueButtonClick(event) {
  const { currentTarget } = event;

  toggleBodyClass();
  changeButtonState(currentTarget);
}

function init() {
  if (!hideValueButtons.length === 0) return;

  hideValueButtons.forEach((button) => {
    button.addEventListener('click', handleHideValueButtonClick);
  });
}

init();

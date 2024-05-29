//function for TurnOn button
const button = document.querySelector('.turnOnButton');
const turnOnTrigger = document.querySelector('.turnOnTrigger');

/**
 * The function `handleTurnOnButtonClick` toggles the state of a button between on and off, updating
 * its text content and styling accordingly.
 */
function handleTurnOnButtonClick() {
  const indicator = button.querySelector('.indicator');
  const buttonTextElement = button.querySelector('p');

  if (button.dataset.turnState === 'on') {
    button.dataset.turnState = 'off';
    buttonTextElement.textContent = 'Turn On';
    button.classList.remove('btn-active');
    indicator.classList.remove('green');
    indicator.classList.add('grey');
  } else {
    button.dataset.turnState = 'on';
    buttonTextElement.textContent = 'Turn Off';
    button.classList.add('btn-active');
    indicator.classList.remove('grey');
    indicator.classList.add('green');
  }
}

function init() {
  turnOnTrigger.addEventListener('click', handleTurnOnButtonClick);
}

init();

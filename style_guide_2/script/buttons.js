import btnTimeMode from './btn-time-mode.js';

const button = {
  btn: '[data-type="btn"]',
  className: 'button-new',
  classNameGroup: 'button-new-wrap',
  classNameBtnInGroup: 'button-group',
};

const buttonMode = document.querySelectorAll('[data-type="time"]');
const buttonList = document.querySelectorAll('[data-type="btn"]');
const navIndicatorBtn = document.querySelectorAll('.navbar-indicator-btn');

// listener for all single buttons for change active class style

// function change active classes
const activeBtn = (button) => {
  button.classList.toggle('btn-active');

  const stateText = button.dataset.stateText;
  if (stateText) {
    const newStateText = button.dataset.stateText;
    const buttontext = button.textContent;

    button.textContent = newStateText;
    button.dataset.stateText = buttontext;
  }
};

/**
 * The function `switchActiveButtonInGroup` toggles the active state of buttons within a group by
 * adding or removing a specific class.
 * @param button - The `button` parameter in the `switchActiveButtonInGroup` function represents the
 * button element that you want to set as active within its button group.
 */
const switchActiveButtonInGroup = (button) => {
  const buttonGroup = button.closest('.button-new-wrap');

  if (buttonGroup) {
    const buttonsInGroup = buttonGroup.querySelectorAll('.button-group');

    buttonsInGroup.forEach((btn) => {
      btn.classList.remove('btn-active');
    });

    button.classList.add('btn-active');
  }
};

//function for TurnOn button
const buttonTurnOn = (button) => {
  const indicator = button.querySelector('.indicator');
  const buttonTextElement = button.querySelector('p');

  if (!indicator) return;

  // Toggle the indicator color from green to grey
  indicator.classList.toggle('green');
  indicator.classList.toggle('grey');

  // Toggle the button text from "Turn On" to "Turn Off" and vice versa
  if (buttonTextElement.textContent === 'Turn On') {
    buttonTextElement.textContent = 'Turn Off';
  } else {
    buttonTextElement.textContent = 'Turn On';
  }
};

/**
 * The function `handleNavIndicatorBtnClick` toggles the class `active-indicator` on the clicked
 * element based on its dataset name.
 * @param event - The `event` parameter in the `handleNavIndicatorBtnClick` function is an event object
 * that represents the event being handled, such as a click event on a navigation indicator button. It
 * contains information about the event, like the target element that triggered the event, the type of
 * event, and methods
 */
function handleNavIndicatorBtnClick(event) {
  event.stopPropagation();

  const { currentTarget } = event;

  const dataName = event.target.closest('.navbar-indicator-btn').dataset.name;

  console.log('nav btns', dataName);
  if (
    dataName === 'notstarted' ||
    dataName === 'activated' ||
    dataName === 'working' ||
    dataName === 'paused' ||
    dataName === 'negativepnl'
  ) {
    currentTarget.classList.toggle('active-indicator');
  }
}

/**
 * The above functions handle button clicks by either activating a single button or switching the
 * active button within a group of buttons.
 * @param event - The `event` parameter in the functions `handleButtonModeClick` and
 * `handleButtonListClick` represents the event that occurred, such as a button click or key press. It
 * contains information about the event, such as the target element that triggered the event and any
 * additional data related to the event
 */
export function handleButtonModeClick(event) {
  btnTimeMode.btnHandler(event);
}

export function handleButtonListClick(event) {
  const { currentTarget } = event;

  if (currentTarget) {
    // For all buttons
    if (currentTarget.classList.contains(button.className)) {
      activeBtn(currentTarget);
      buttonTurnOn(currentTarget);
    }
    // For group of buttons
    if (currentTarget.classList.contains('button-group')) {
      switchActiveButtonInGroup(currentTarget);
    }
  }
}

/**
 * The function sets event listeners for navigation indicator buttons, mode buttons, and list buttons.
 */
function setEventListeners() {
  navIndicatorBtn.forEach((item) => {
    item.addEventListener('click', handleNavIndicatorBtnClick);
  });

  buttonMode.forEach((btn) => {
    btn.addEventListener('click', handleButtonModeClick);
  });

  buttonList.forEach((el) => {
    el.addEventListener('click', handleButtonListClick);
  });
}

setEventListeners();

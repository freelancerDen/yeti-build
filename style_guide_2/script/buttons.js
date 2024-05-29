import btnTimeMode from './btn-time-mode.js';
import customInput from './input.js';

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

/**
 * The function `changeActiveButtonInGroup` changes the active button within a group of buttons based
 * on the button that was pressed.
 * @param pressedButton - The `pressedButton` parameter is the button element that was clicked or
 * activated by the user.
 */
function changeActiveButtonInGroup(pressedButton) {
  const groupName = pressedButton.dataset.buttonGroupName;

  const container = pressedButton.closest(`[data-button-group="${groupName}"]`);

  if (container) {
    const buttons = container.querySelectorAll(
      `[data-button-group-name="${groupName}"]`,
    );

    buttons.forEach((btn) => {
      btn.classList.remove('btn-active');
      btn.dataset.state = 'false';
      disableFieldsOnChangeState(btn);
    });

    pressedButton.classList.add('btn-active');
    pressedButton.dataset.state = 'true';
  }
}

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

/**
 * The function `disableFieldsOnChangeState` disables or enables input fields and buttons based on the
 * state of a target element.
 * @param target - The `target` parameter in the `disableFieldsOnChangeState` function is the element
 * that triggered the change event. This function is designed to disable or enable input fields and
 * buttons based on the state of the target element.
 * @returns If the `target` element has a `data-disableFields` attribute, the function will return
 * early if it is not present. Otherwise, the function will disable or enable input fields and buttons
 * based on the value of the `data-state` attribute of the `target` element.
 */
function disableFieldsOnChangeState(target) {
  const fieldNameToDisable = target.dataset.disableFields;

  if (!fieldNameToDisable) return;

  const container = target.closest(
    `[data-disable-fields-container="${fieldNameToDisable}"]`,
  );

  const inputFields = container.querySelectorAll(
    `input[data-disabled-by="${fieldNameToDisable}"]`,
  );

  if (inputFields.length > 0) {
    inputFields.forEach((input) => {
      if (target.dataset.state === 'true') {
        customInput.enable(input);
      } else {
        customInput.disable(input);
      }
    });
  }

  const buttons = container.querySelectorAll(
    `button[data-disabled-by="${fieldNameToDisable}"]`,
  );

  if (buttons.length > 0) {
    buttons.forEach((btn) => {
      if (target.dataset.state === 'true') {
        btn.removeAttribute('disabled');
      } else {
        btn.setAttribute('disabled', 'true');
      }
    });
  }
}

export function handleButtonListClick(event) {
  const { currentTarget } = event;

  if (currentTarget) {
    // For all buttons
    if (currentTarget.classList.contains(button.className)) {
      activeBtn(currentTarget);
    }

    if (currentTarget.classList.contains('toggle')) {
      currentTarget.classList.toggle('toggle-active');
      if (currentTarget.dataset.state === 'true') {
        currentTarget.dataset.state = 'false';
      } else {
        currentTarget.dataset.state = 'true';
      }
    }

    // For group of buttons
    if (currentTarget.classList.contains('button-group')) {
      switchActiveButtonInGroup(currentTarget);
    }

    // New logic for button
    if (currentTarget.dataset.buttonGroupName) {
      changeActiveButtonInGroup(currentTarget);
    }

    // Disable fields on change state
    if (currentTarget.dataset.disableFields) {
      disableFieldsOnChangeState(currentTarget);
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

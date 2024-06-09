const numberPattern = /^(\d+(\.\d{0,6})?|\.\d{1,2})$/;
const dynamicNumberPattern = /(^[+-](\d+(\.\d{0,6})?))$/;
const timePattern = /(^(\d{1,2}\:\d{1,2}))$/;
const datePattern = /(^(\d{1,2}\.\d{1,2}\.\d{2,4}))$/;
const ipPattern = /(^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))$/;

/**
 * The `disableInput` function disables an input field by updating its state and styling its related
 * elements.
 * @param input - The `input` parameter in the `disableInput` function is a reference to the input
 * element that you want to disable. The function finds the container element that wraps the input,
 * then finds the element with the class `data-wrap` inside that container. It sets the `data-state`
 * attribute of
 */
const disableInput = (input) => {
  const container = input.closest('[data-input="input-field"]');
  const dataWrap = container.querySelector('.data-wrap');

  dataWrap.setAttribute('data-state', 'false');

  const elements = dataWrap.querySelectorAll('p');
  elements.forEach((el) => {
    el.classList.add('text__color_ligth-grey');
  });

  input.classList.add('hidden');
};

/**
 * The `enableInput` function finds the input field container, sets its data state to true, removes a
 * specific class from paragraph elements within the container, and removes the hidden class from the
 * input field.
 * @param input - The `input` parameter in the `enableInput` function is a reference to an HTML input
 * element that you want to enable for user interaction.
 */
const enableInput = (input) => {
  const container = input.closest('[data-input="input-field"]');
  const dataWrap = container.querySelector('.data-wrap');

  dataWrap.setAttribute('data-state', 'true');

  const elements = dataWrap.querySelectorAll('p');
  elements.forEach((el) => {
    el.classList.remove('text__color_ligth-grey');
  });

  input.classList.remove('hidden');
};

/**
 * The `formatCompactNumber` function formats a large number into a compact format with suffixes like
 * 'k', 'm', 'b', or 't' based on the magnitude of the number.
 * @param num - The `num` parameter is the number that you want to format in a compact way. This
 * function will convert large numbers into a more readable format by adding a suffix such as 'k' for
 * thousands, 'm' for millions, 'b' for billions, or 't' for trillions
 * @param [precision=1] - The `precision` parameter in the `formatCompactNumber` function determines
 * the number of decimal places to include in the formatted compact number. By default, the precision
 * is set to 1 if not specified when calling the function. You can adjust the precision value to
 * control the level of decimal accuracy in the
 * @returns The function `formatCompactNumber` takes a number `num` and an optional precision value as
 * input. It formats the number in a compact format with suffixes like 't' for trillion, 'b' for
 * billion, 'm' for million, and 'k' for thousand based on the magnitude of the number. If the number
 * is greater than or equal to 1 trillion, it returns
 */
function formatCompactNumber(num, precision = 1) {
  const integerNum = Math.floor(Number(num));

  const map = [
    { suffix: 't', threshold: 1e12 },
    { suffix: 'b', threshold: 1e9 },
    { suffix: 'm', threshold: 1e6 },
    { suffix: 'k', threshold: 1e3 },
  ];
  const found = map.find((x) => Math.abs(integerNum) >= x.threshold);

  if (found) {
    const rounded = integerNum / found.threshold;
    const formatted = Number.isInteger(rounded)
      ? rounded.toFixed()
      : rounded.toFixed(precision);

    return formatted + found.suffix;
  }

  return integerNum.toFixed();
}

/**
 * The function `roundUpNumber` takes a number and a unit as input, then formats and logs the number
 * based on the specified unit.
 * @param num - The `num` parameter represents the number that you want to format or round up. It could
 * be a floating-point number or an integer.
 * @param unit - The `unit` parameter in the `roundUpNumber` function is used to determine how the
 * `num` parameter should be formatted or rounded. The function contains different cases based on the
 * `unit` value to handle different formatting or rounding requirements.
 * @returns The function `roundUpNumber` returns different representations of the input number based on
 * the specified unit. It can return the number formatted as a compact number, a fixed number with one
 * decimal place, a fixed number without decimal places, or the original number itself if it is an
 * integer or a floating-point number with 6 decimal places.
 */
function roundUpNumber(num, unit) {
  switch (unit) {
    case '$':
      console.log(`Number in ${unit}:`, formatCompactNumber(num));

      return formatCompactNumber(num).toString();

    case '%':
    case 'R':
      console.log(`Number in ${unit}:`, num.toFixed(1));

      return num.toFixed(1);

    case 'date':
    case 'ticks':
    case 'times':
    case 'X':
    case 'int':
      console.log(`Number in ${unit}:`, num.toFixed());

      return num.toFixed();

    default:
      if (Number.isInteger(num)) {
        console.log('Integer number:', num);

        return num;
      } else {
        console.log('Floating-point number:', num.toFixed(6));

        return num.toFixed(6);
      }
  }
}

/**
 * The function `setErrorStyle` sets the background color of an element based on whether it is valid or
 * not.
 * @param element - The `element` parameter in the `setErrorStyle` function is a reference to the HTML
 * element (e.g., input field, div, etc.) to which you want to apply the styling changes based on the
 * `isValid` parameter.
 * @param isValid - The `isValid` parameter is a boolean value that indicates whether the element is
 * valid or not. If `isValid` is `true`, it means the element is valid, and if it is `false`, it means
 * the element is not valid.
 */
function setErrorStyle(element, isValid) {
  if (isValid) {
    element.style.background = '';
  } else {
    element.style.background = '#ff000033';
  }
}

/**
 * The function `checkValidation` validates different types of input values based on specified patterns
 * and ranges.
 * @param input - The `input` parameter in the `checkValidation` function represents an HTML input
 * element. The function is designed to validate the value of this input based on the specified data
 * type and any additional constraints like minimum and maximum values. The function uses different
 * regular expressions to validate different types of input values such as
 * @returns The function `checkValidation` returns a boolean value indicating whether the input value
 * passed validation based on the specified type (number, dynamic-number, time, date, ip) and any
 * additional constraints such as minimum and maximum values.
 */
function checkValidation(input) {
  const value = input.value.trim();
  const type = input.dataset.type;
  let isValid = true;
  const min = input.dataset.min;
  const max = input.dataset.max;

  switch (type) {
    case 'number':
      isValid = numberPattern.test(value);

      if (min && Number(value) < Number(min)) {
        isValid = false;
      }

      if (max && Number(value) > Number(max)) {
        isValid = false;
      }

      break;

    case 'dynamic-number':
      isValid = dynamicNumberPattern.test(value);

      break;

    case 'time':
      isValid = timePattern.test(value);

      break;

    case 'date':
      isValid = datePattern.test(value);

      break;

    case 'ip':
      isValid = ipPattern.test(value);

      break;

    default:
      break;
  }

  setErrorStyle(input, isValid);

  return isValid;
}

/**
 * The function `setValue` processes input values and displays them in a specific format within an
 * input container.
 * @param input - The `input` parameter in the `setValue` function represents the input element that
 * triggered the function. This input element is used to retrieve the value entered by the user and
 * update the corresponding text field based on the specified type and unit. The function also performs
 * validation checks on the input before processing it.
 * @returns The `setValue` function returns nothing (`undefined`) if the input does not pass the
 * validation check. If the input passes the validation check, the function updates the text content of
 * the corresponding `p` element within the input container based on the type of input data provided.
 * After updating the text content, the function clears the input value.
 */
function setValue(input) {
  if (!checkValidation(input)) {
    input.style.background = '';
    input.value = '';

    return;
  }

  const value = input.value.trim();

  const inputContainer = input.closest('.input-container-wrap');

  if (!inputContainer) return;

  const textField = inputContainer.querySelector('p');

  if (!textField) return;

  const type = input.dataset.type;
  const unit = input.dataset.unit;

  switch (type) {
    case 'number':
      textField.innerText = roundUpNumber(Number(value), unit);

      break;
    case 'dynamic-number':
      const operator = value.slice(0, 1);
      const num = Number(value.slice(1));

      textField.innerText = operator + roundUpNumber(num, unit);

      break;

    default:
      textField.innerText = value;
  }

  input.value = '';
}

/**
 * The `handleChangeInput` function in JavaScript handles input change events by checking validation on
 * the input element.
 * @param event - The `event` parameter is an object that contains information about the event that
 * occurred, such as the type of event, the target element that triggered the event, and any additional
 * data related to the event. In this case, the `handleChangeInput` function is likely being called in
 * response to an input
 */
function handleChangeInput(event) {
  const { currentTarget: input } = event;

  checkValidation(input);
}

/**
 * The function `handleFocusInput` adds a class of 'show' to the closest parent element with the class
 * 'input-wrap' when an input element gains focus.
 * @param event - The `event` parameter is an object that contains information about the event that
 * occurred, such as the type of event, the target element that triggered the event, and any additional
 * data related to the event. In this case, the `handleFocusInput` function is likely intended to
 * handle focus events on
 * @returns If the `inputWrap` variable is not found (i.e., if `input.closest('.input-wrapp')` returns
 * `null`), then `undefined` will be returned.
 */
function handleFocusInput(event) {
  const { currentTarget: input } = event;

  const inputWrap = input.closest('.input-wrapp');

  if (!inputWrap) return;

  inputWrap.classList.add('show');
}

/**
 * The function `handleFocusOutInput` removes the 'show' class from the closest parent element with the
 * class 'input-wrap' and sets the value of the input element.
 * @param event - The `event` parameter is an object that contains information about the event that
 * occurred, such as the type of event, the target element that triggered the event, and any additional
 * data related to the event. In this case, the event is likely a focus out event on an input element.
 * @returns If the `inputWrap` variable is not found (i.e., if `input.closest('.input-wrapp')` returns
 * `null`), then `undefined` will be returned.
 */
function handleFocusOutInput(event) {
  const { currentTarget: input } = event;

  const inputWrap = input.closest('.input-wrapp');

  if (!inputWrap) return;

  inputWrap.classList.remove('show');

  setValue(input);
}

/**
 * The function `handleMouseoverInput` adjusts the position of a text element within a container based
 * on their widths during a mouseover event.
 * @param event - The `event` parameter is an object that contains information about the event that
 * occurred, such as the type of event, the target element that triggered the event, and any additional
 * data related to the event. In this case, the `handleMouseoverInput` function is likely intended to
 * handle a mouse
 */
function handleMouseoverInput(event) {
  const { currentTarget: input } = event;

  const container = input.closest('[data-input="input-field"]');

  if (!container) return;

  const text = container.querySelector('.data-wrap');

  if (text.offsetWidth > container.offsetWidth) {
    text.style.transition = `transform ${text.offsetWidth / 60}s ease-in-out`;
    text.style.transform = `translateX(calc(-100% + ${
      container.offsetWidth / 2
    }px))`;
  }
}

/**
 * The function `handleMouseleaveInput` adjusts the position of text within a container based on their
 * widths when the mouse leaves an input element.
 * @param event - The `event` parameter is an object that contains information about the event that
 * occurred, such as the type of event (e.g., mouseleave), the target element that triggered the event
 * (e.g., the input field), and other event-related data. In this case, the function `handleMouse
 */
function handleMouseleaveInput(event) {
  const { currentTarget: input } = event;

  const container = input.closest('[data-input="input-field"]');
  const text = container.querySelector('.data-wrap');

  if (text.offsetWidth > container.offsetWidth) {
    text.style.transform = `translateX(0px)`;
  }
}

/**
 * The `setEventListeners` function adds event listeners for focus, blur, input, mouseover, and
 * mouseleave to the specified input element.
 * @param input - The `input` parameter in the `setEventListeners` function represents an HTML input
 * element to which event listeners will be added.
 */
function setEventListeners(input) {
  input.addEventListener('focus', handleFocusInput);
  input.addEventListener('blur', handleFocusOutInput);
  input.addEventListener('input', handleChangeInput);
  input.addEventListener('mouseover', handleMouseoverInput);
  input.addEventListener('mouseleave', handleMouseleaveInput);
}

/**
 * The `initInputs` function selects all text input elements on the page and sets event listeners for
 * each of them.
 */
const init = () => {
  const inputs = document.querySelectorAll(`input[type="text"]`);

  inputs.forEach((input) => {
    setEventListeners(input);
  });
};

export default {
  setEventListeners,
  init,
  disable: disableInput,
  enable: enableInput,
};

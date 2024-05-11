import { enableInput, disableInput } from './input.js';

//switcher type variables

const tableBtn = document.querySelectorAll('.table-switch > button');
const inputInactive = 'text__color_ligth-grey';
const selectorInactive = 'inactive';

//disable input in switcher box
const inputDisabled = (item) => {
  let inputEl = item
    .closest('.switcher-wrap')
    .querySelectorAll("[data-input='input-field'] > div > input");
  inputEl.forEach((i) => i.classList.toggle('hidden'));
};

//change input style
const field = (...data) => {
  const [item, state] = data;
  let elements = item.querySelectorAll('p');
  elements.forEach((child) => child.classList.toggle(inputInactive, !state));
};

//change selector style
const selector = (...data) => {
  const [item, state] = data;
  item.classList.toggle(selectorInactive, !state);
};

//parse and change nested states in hanlder-box
const changeNestedState = (array, state) => {
  array.forEach((item) => {
    if (item.dataset.type === 'dynamic') {
      item.setAttribute('data-state', state);
      if (item.classList.contains('selector')) {
        let el = item.querySelector('.selector__header');
        selector(el, state);
      }
      if (item.classList.contains('data-wrap')) {
        field(item, state);
      }
    }
  });
};

//regural switcher
const checkSwitcherState = (item) => {
  let handlerElements = item
    .closest('.switcher-wrap')
    .querySelectorAll('.handler-box input'); // atention to this var
  // let inputEl = item.closest(".switcher-wrap").querySelectorAll("[data-input='input-field'] > div > input"); // atention to this var
  const buttons = item
    .closest('.switcher-wrap')
    .querySelectorAll('.handler-box button');

  if (item.checked) {
    handlerElements.forEach((el) => {
      enableInput(el);
    });
    buttons.forEach((btn) => btn.removeAttribute('disabled'));
  } else {
    handlerElements.forEach((el) => {
      disableInput(el);
    });
    buttons.forEach((btn) => btn.setAttribute('disabled', 'true'));
  }
};

//table switcher
const checkTableBtnState = (item) => {
  let inputState = item.closest('.table-switch').querySelector('input');
  let handlerEl = item
    .closest('.switcher-wrap')
    .querySelectorAll('.handler-box [data-type]'); // atention to this var
  let btnDataState = item;
  let active = 'btn-active';
  let shadow = 'btn-shadow';
  //handled checkbox
  if (inputState.checked) {
    inputState.checked = false; // Set checked state to false
    btnDataState.setAttribute('data-state', false); // Update data-state attribute
    changeNestedState(handlerEl, false);
    inputDisabled(item);
    item.classList.remove(shadow);
    item.classList.add(active);
  } else {
    inputState.checked = true; // Set checked state to true
    btnDataState.setAttribute('data-state', true); // Update data-state attribute
    changeNestedState(handlerEl, true);
    inputDisabled(item);
    item.classList.remove(active);
    item.classList.add(shadow);
  }
};

const initRegSwitcherHandler = () => {
  const regularSwitcher = document.querySelectorAll('.form-switch > input');

  regularSwitcher.forEach((item) => {
    item.addEventListener('click', (e) => checkSwitcherState(e.target));
  });
};

const initTableSwitcherHandler = () => {
  tableBtn.forEach((item) => {
    item.addEventListener('click', (e) => checkTableBtnState(e.target));
  });
};

export default { initRegSwitcherHandler, initTableSwitcherHandler };

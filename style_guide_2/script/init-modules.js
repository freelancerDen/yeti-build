import initSwitcher from './switcher.js';
import customInput from './input.js';
import lineField from './add-line-field.js';

const run = () => {
  initSwitcher.initRegSwitcherHandler();
  initSwitcher.initTableSwitcherHandler();
  customInput.init();
  lineField.init();
};

window.addEventListener('load', run);

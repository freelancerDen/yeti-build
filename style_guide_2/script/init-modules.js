import initSwitcher from './switcher.js';
import customInput from './input.js';

const run = () => {
  initSwitcher.initRegSwitcherHandler();
  initSwitcher.initTableSwitcherHandler();
  customInput.init();
};

window.addEventListener('load', run);

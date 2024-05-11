import initSwitcher from './switcher.js';
import { initInputs } from './input.js';

const run = () => {
  initSwitcher.initRegSwitcherHandler();
  initSwitcher.initTableSwitcherHandler();
  initInputs();
};

window.addEventListener('load', run);

// Importing slideUp, slideDown, and slideToggle functions from animations.js module
import { slideUp, slideDown, slideToggle } from './animations.js';

// Function to handle actions on stretch panels
export const stretchPanelActions = (panel) => {
  // Finding hide button and wrapper elements within the panel
  const hideButton = panel.querySelector('.button-hide');
  const closeButtons = panel.querySelectorAll('.closeLimitPanel');
  const wrapper = panel.querySelector('.stretch-panel__wrapper');

  // Checking if hideButton and wrapper exist before adding event listener
  if (hideButton && wrapper) {
    hideButton.addEventListener('click', () => {
      // Toggling visibility of wrapper element with slideToggle animation over 300 milliseconds
      slideToggle(wrapper, 300);
    });
  }

  // Checking if closeButton exists before adding event listener
  if (closeButtons.length > 0) {
    closeButtons.forEach((el) => {
      el.addEventListener('click', () => {
        const panel = el.closest('.stretch-panel');
        // Removing the panel from the DOM when closeButton is clicked
        if (panel) {
          panel.remove();
        }
      });
    });
  }

  // add active class for start/stop buttons
  const activeStateTrigger = panel.querySelectorAll(
    '[data-active-control-trigger]',
  );
  const allActiveStateTargets = panel.querySelectorAll('[data-active-control]');

  if (activeStateTrigger.length > 0) {
    activeStateTrigger.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetName = btn.dataset.activeControlTrigger;

        if (allActiveStateTargets.length > 0) {
          allActiveStateTargets.forEach((btn) => {
            if (btn.dataset.activeControl === targetName) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
        }
      });
    });
  }
};

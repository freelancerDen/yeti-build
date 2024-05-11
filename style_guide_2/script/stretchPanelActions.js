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
};

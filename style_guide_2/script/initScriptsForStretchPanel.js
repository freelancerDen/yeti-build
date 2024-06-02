import { initInfoLine } from './infoLineModule.js';
import {
  displayStatusIndicator,
  NotStarted,
  Working,
  Activated,
  Paused,
  NegativePnl,
} from './statusIndicator.js';
import { stretchPanelActions } from './stretchPanelActions.js';
import { displayStatus, Success, Warning, Disabled, Error } from './status.js';
import { improveInputFiles } from './browseFiles.js';
import { formRating } from './formRating.js';

const runScripts = (panel) => {
  initInfoLine(panel, 1000, -10, 100);
  displayStatusIndicator(panel, Activated); // Example displayStatusIndicator(panel, Activated);
  stretchPanelActions(panel);
  displayStatus(panel, Success, 'Gooooood!');
  improveInputFiles(panel);
  formRating(panel);
};

function init() {
  const panels = document.querySelectorAll('[data-panel-id]');

  panels.forEach((panel) => {
    runScripts(panel);
  });
}

export default { runScripts };

init();

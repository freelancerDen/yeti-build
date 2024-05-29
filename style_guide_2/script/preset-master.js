import customInput from './input.js';

const rowTemplate = document.querySelector('#presetMasterRowTemplate');
const container = document.querySelector('.presetMasterContainer');

/**
 * The function fetchData asynchronously fetches data from a JSON file and handles any errors that may
 * occur during the process.
 * @returns The `fetchData` function is returning a Promise that resolves to the JSON data fetched from
 * the './style_guide_2/script/preset-master.json' file. If the data is fetched successfully, the
 * function will return the parsed JSON data. If there is an error during the fetching process, the
 * function will log an error message to the console and the Promise will be rejected.
 */
async function fetchData() {
  try {
    const response = await fetch('./style_guide_2/script/preset-master.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error during fetching data:', error);
  }
}

/**
 * The function `generateUID` generates a unique identifier by combining the current timestamp and a
 * random number.
 * @returns The `generateUID` function returns a unique identifier (UID) that is a combination of the
 * current timestamp in base 36 and a random number in base 36.
 */
function generateUID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * The function `handleRemovePresetClick` removes the row element containing the clicked element from
 * the DOM.
 * @param event - The `event` parameter in the `handleRemovePresetClick` function represents the event
 * that occurred, such as a click event on a button. It contains information about the event, such as
 * the target element that triggered the event.
 */
function handleRemovePresetClick(event) {
  const { currentTarget } = event;

  const rowElement = currentTarget.closest('.presetMasterRow');

  rowElement.remove();
}

/**
 * The `renderField` function clones a template, populates it with data, and adds event listeners
 * before appending it to a container.
 */
function renderField({ id, name }) {
  const clone = rowTemplate.content.cloneNode(true);

  const rowElement = clone.querySelector('.presetMasterRow');
  const input = clone.querySelector('input');
  const nameField = clone.querySelector('.presetMasterName');
  const removeButton = clone.querySelector('.removePresetButton');

  rowElement.setAttribute('id', id);
  nameField.textContent = name;

  removeButton.addEventListener('click', handleRemovePresetClick);
  customInput.setEventListeners(input);

  container.appendChild(clone);
}

/**
 * The function `handleCreatePresetClick` creates a new preset field with a unique ID and name based on
 * user input.
 */
function handleCreatePresetClick() {
  const createNewInput = document.querySelector('.createNewPresetInput');
  const name = createNewInput.textContent.trim();
  const id = generateUID();

  if (name !== '') {
    renderField({ id, name });
    createNewInput.textContent = '';
  }
}

/**
 * The function sets an event listener on a button with the class 'createNewPresetButton' to handle a
 * click event.
 */
function setEventListeners() {
  const createNewButton = document.querySelector('.createNewPresetButton');

  createNewButton.addEventListener('click', handleCreatePresetClick);
}

/**
 * The `init` function asynchronously fetches data, renders each field, and sets event listeners.
 * @returns If the `data` variable is either falsy or not an object, the function will return early and
 * not execute the rest of the code inside the `init` function.
 */
async function init() {
  const data = await fetchData();

  if (!data || typeof data !== 'object') return;

  data.fields.forEach((item) => {
    renderField(item);
  });

  setEventListeners();
}

init();

import customInput from './input.js';

function generateUID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function renderField({ id, name, instance }) {
  const rowTemplate = instance.querySelector('#lineFieldTemplate');
  const container = instance.querySelector('.lineFieldContainer');
  const clone = rowTemplate.content.cloneNode(true);

  const rowElement = clone.querySelector('.lineFieldRow');
  const input = clone.querySelector('input');
  const valueField = clone.querySelector('.lineFieldValue');
  const removeButton = clone.querySelector('.removeLineFieldButton');

  rowElement.setAttribute('id', id);
  valueField.textContent = name;

  removeButton.addEventListener('click', handleRemoveFieldClick);
  customInput.setEventListeners(input);

  container.appendChild(clone);
}

function handleRemoveFieldClick(event) {
  const { currentTarget } = event;

  const rowElement = currentTarget.closest('.lineFieldRow');

  rowElement.remove();
}

function handleCreateFieldClick(event) {
  const { currentTarget } = event;
  const instance = currentTarget.closest('.lineFieldInstance');
  const createNewInput = instance.querySelector('.createNewLineFieldInput');
  const name = createNewInput.textContent.trim();
  const id = generateUID();

  if (name !== '') {
    renderField({ id, name, instance });
    createNewInput.textContent = '';
  }
}

function setEventListeners(panel) {
  let instances;

  if (panel) {
    instances = panel.querySelectorAll('.lineFieldInstance');
  } else {
    instances = document.querySelectorAll('.lineFieldInstance');
  }

  if (instances.length === 0) return;

  instances.forEach((instance) => {
    const createNewButton = instance.querySelector('.createNewLineFieldButton');
    const removeButtons = instance.querySelectorAll('.removeLineFieldButton');
    console.log(createNewButton);

    createNewButton.addEventListener('click', handleCreateFieldClick);
    removeButtons.forEach((btn) => {
      btn.addEventListener('click', handleRemoveFieldClick);
    });
  });
}

function init() {
  setEventListeners();
}

export default { init, setEventListeners };

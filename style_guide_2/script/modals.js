//function for event listener in schedule
function btnSchedule(modal) {
  modal.removeEventListener('click', handleSheduleBtns);
  modal.addEventListener('click', handleSheduleBtns);
}

// function change active class for schedule buttons
function handleSheduleBtns(event) {
  let target = event.target;
  if (target.classList.contains('btn-schedule')) {
    target.classList.toggle('btn-schedule-active');
  }
}

// function for event listener in tag & preset master modals
function addRemoveLines() {
  const modalsTagPreset = document.querySelectorAll(
    '.modal-tag-master, .modal-preset-master',
  );
  modalsTagPreset.forEach((modal) => {
    modal.removeEventListener('click', handleTagPreset);
    modal.addEventListener('click', handleTagPreset);
  });
}

//function for add & delete lines in preset
function handleTagPreset(element) {
  let target = element.target;

  // check was click on element and delete line
  if (target.classList.contains('button-new-small')) {
    const item = target.closest('.preset-line');
    const line = target.closest('.tag-line');

    if (item) {
      // delete preset element
      item.parentNode.removeChild(item);
    } else if (line) {
      // delete tag element
      line.parentNode.removeChild(line);
    }
  }

  // Create a new line on button click
  if (target.classList.contains('button-new-plus')) {
    const newLine = document.createElement('div');
    newLine.classList.add('tag-line');

    // Set inner HTML of the new line
    newLine.innerHTML = `
          <div class="data-info-container data-info-container_large-2">
              <div class="input-container-wrap input-container-wrap_large-2" data-input="input-field">
                  <div class="input-wrapp">
                      <input class="input-field text_large text__color_dark-grey" type="text">
                  </div>
                  <div class="input-text-center">
                      <div class="data-wrap" data-type="dynamic" data-state="true">
                          <p class="text_large text__color_dark-grey"></p>
                          <p class="text_large text__color_dark-grey">Tag new</p>
                      </div>
                  </div>
              </div>
          </div>
          <button class="button-new button-new-small text_large btn-shadow">
              X
          </button>
      `;

    // Insert new line above the target line
    const targetLine = target.closest('.tag-line');
    targetLine.parentNode.insertBefore(newLine, targetLine);
  }
}

// New logic for modals

/**
 * The function closeModal hides a modal by adding the 'd-none' class to it.
 * @param modal - The `modal` parameter in the `closeModal` function is a reference to the modal
 * element that you want to close.
 * @returns If the `modal` parameter is not provided or is falsy, the function will return early and
 * not execute the rest of the code.
 */
function closeModal(modal) {
  if (!modal) return;

  modal.classList.add('d-none');
}

/**
 * The function setModalPosition sets the top and left position of a modal element using the specified
 * x and y coordinates.
 * @param modal - The `modal` parameter is a reference to the modal element in the HTML document that
 * you want to set the position for.
 * @param [x=0] - The `x` parameter in the `setModalPosition` function represents the horizontal
 * position of the modal element on the screen. By default, if no value is provided for `x`, it will be
 * set to `0`, which means the modal will be positioned at the leftmost edge of the screen
 * @param [y=0] - The `y` parameter in the `setModalPosition` function represents the vertical position
 * of the modal element on the screen. By setting `y` to a specific value in pixels, you can control
 * how far down from the top of the screen the modal will be displayed.
 */
function setModalPosition(modal, x = 0, y = 0) {
  modal.style.top = `${y}px`;
  modal.style.left = `${x}px`;
}

/**
 * The function `setStartPosition` calculates the center position for a modal element based on the
 * window dimensions and sets its position accordingly.
 * @param modal - The `modal` parameter in the `setStartPosition` function is a reference to the modal
 * element for which you want to set the initial position on the screen.
 */
function setStartPosition(modal) {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const rect = modal.getBoundingClientRect();

  const x = window.scrollX + windowWidth / 2 - rect.width / 2;
  const y = window.scrollY + windowHeight / 2 - rect.height / 2;
  setModalPosition(modal, x, y);
}

/**
 * The `focusModal` function sets the z-index of a modal element to 1000 and adds a 'focused' class
 * while adjusting the z-index of other visible modals accordingly.
 * @param modal - The `modal` parameter in the `focusModal` function represents the modal element that
 * you want to bring into focus. The function ensures that the specified modal is brought to the front
 * by adjusting its z-index and adding a 'focused' class to it while removing the 'focused' class from
 * other visible
 * @returns If the modal element already has the 'focused' class, the function will return early
 * without making any changes.
 */
function focusModal(modal) {
  if (modal.classList.contains('focused')) return;

  const allModals = document.querySelectorAll('[data-modal]');

  allModals.forEach((el) => {
    if (!el.classList.contains('d-none')) {
      const currentZIndex = parseInt(getComputedStyle(el).zIndex);

      if (currentZIndex > 1000 - allModals.length) {
        el.style.zIndex = currentZIndex - 1;
      }

      el.classList.remove('focused');
    }
  });

  modal.style.zIndex = 1000;
  modal.classList.add('focused');
}

/**
 * The function `handleDragModal` allows for dragging a modal element by updating its position based on
 * mouse movement.
 * @param e - The parameter `e` in the `handleDragModal` function is typically an event object
 * representing a mouse event, such as a `mousedown` event. It contains information about the event,
 * like the coordinates of the mouse pointer when the event occurred.
 * @param modal - The `modal` parameter in the `handleDragModal` function is a reference to the modal
 * element that you want to make draggable.
 */
function handleMouseDown(e, modal) {
  e.preventDefault();
  e.stopPropagation();

  const rect = modal.getBoundingClientRect();
  let coords = [e.clientX, e.clientY];

  focusModal(modal);

  window.addEventListener('mousemove', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (coords !== null) {
      const [movedX, movedY] = [e.clientX - coords[0], e.clientY - coords[1]];
      const x = movedX + rect.x + window.scrollX;
      const y = movedY + rect.y + window.scrollY;

      setModalPosition(modal, x, y);
    }
  });

  window.addEventListener('mouseup', () => (coords = null));
}

/**
 * The function `openModal` is used to display a modal by removing the 'd-none' class and adding event
 * listeners for dragging and closing the modal.
 * @param name - The `name` parameter in the `openModal` function is used to specify the name of the
 * modal that you want to open. This function first checks if a valid `name` is provided, then selects
 * the modal element with the corresponding `data-modal` attribute value. If the modal exists,
 * @returns If the `name` parameter is falsy or if a modal element with the specified `name` attribute
 * cannot be found, the function will return early and not execute the rest of the code block.
 */
function openModal(name, panel) {
  if (!name) return;

  let modal;

  if (panel) {
    modal = panel.querySelector(`[data-modal='${name}']`);
  } else {
    modal = document.querySelector(`[data-modal='${name}']`);
  }

  if (!modal) return;

  modal.classList.remove('d-none');

  if (modal.classList.contains('modal-draggable')) {
    setStartPosition(modal);
    focusModal(modal);

    const header = modal.querySelector('.modal-drag-drop');

    header.addEventListener('mousedown', (event) =>
      handleMouseDown(event, modal),
    );
  }

  const closeTriggers = modal.querySelectorAll('.closeModalTrigger');

  closeTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      closeModal(modal);
    });
  });
}

/**
 * The function `handleClickModalButton` opens a modal based on the `modalName` obtained from the
 * clicked button's dataset.
 * @param event - The `event` parameter in the `handleClickModalButton` function is an object that
 * represents the event that occurred, such as a click event on a button. It contains information about
 * the event, including the target element that triggered the event (`currentTarget`). In this case, we
 * are accessing the
 */
export function handleClickModalButton(event) {
  const { currentTarget } = event;
  const modalName = currentTarget.dataset.modalName;
  const panel = currentTarget.closest('[data-panel-id]');

  openModal(modalName, panel);
}

/**
 * The function `setEventListeners` adds event listeners to buttons in a modal using the
 * `handleClickModalButton` function.
 */
function setEventListeners() {
  const buttonsModal = document.querySelectorAll('[data-modal-name]');

  if (buttonsModal.length === 0) return;

  buttonsModal.forEach((element) => {
    element.addEventListener('click', handleClickModalButton);
  });
}

/**
 * The `init` function checks if there are any buttons in a modal and sets event listeners if there
 * are.
 */
function init() {
  setEventListeners();
}

init();

export default { init };

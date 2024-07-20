class dualRangeSlider {
  constructor(rangeElement) {
    this.rangeElement = rangeElement;
    this.min = Number(rangeElement.dataset.min);
    this.max = Number(rangeElement.dataset.max);
    this.current = rangeElement.dataset.current.split(',');
    this.handles = this.rangeElement.querySelectorAll('[data-type="handle"]');

    this.setInitialValues();
    this.startPos = 0;
    this.activeHandle;
  }

  /**
   * The `setInitialValues` function calculates and sets initial values for a range slider based on the
   * current values and range limits.
   */
  setInitialValues() {
    const [start, end] = this.current;

    const startPercent = (Math.abs(start) / (this.max - this.min)).toFixed(2);
    const endPercent = (Math.abs(end) / (this.max - this.min)).toFixed(2);

    const coords = this.current
      .map((item) => {
        return (Math.abs(item) / (this.max - this.min)).toFixed(2);
      })
      .sort();

    const rangeRect = this.rangeElement.getBoundingClientRect();

    coords.forEach((item, index) => {
      this.rangeElement.style.setProperty(
        `--x-${index + 1}`,
        `${item * rangeRect.width}px`,
      );
    });

    this.handles[0].dataset.value = this.current[0];
    this.handles[1].dataset.value = this.current[1];
  }

  /**
   * The `startMoveTouch` function sets up a touch event listener to track the movement of a touch on a
   * specific element.
   * @param e - The parameter `e` in the `startMoveTouch` function is an event object that contains
   * information about the event that triggered the function. In this case, it is likely a touch event
   * object since the function is intended to handle touch events.
   */
  startMoveTouch(e) {
    const handleRect = e.target.getBoundingClientRect();
    this.startPos = e.touches[0].clientX - handleRect.x;
    this.activeHandle = e.target;
    this.moveTouchListener = this.handleMoveTouch.bind(this);
    window.addEventListener('touchmove', this.moveTouchListener);
  }

  /**
   * The function `handleStartMove` sets the starting position and active handle for a mouse move event
   * listener.
   * @param e - The parameter `e` typically represents an event object, which contains information
   * about the event that occurred, such as mouse clicks, key presses, or other interactions. In this
   * context, it seems to be related to a mouse event, as it includes properties like `offsetX` and
   * `target`.
   */
  handleStartMove(e) {
    this.startPos = e.offsetX;
    this.activeHandle = e.target;
    this.moveListener = this.move.bind(this);
    window.addEventListener('mousemove', this.moveListener);
  }

  /**
   * The `handleMoveTouch` function in JavaScript handles touch events by extracting the clientX
   * coordinate from the first touch in the event object and passing it to the `move` function.
   * @param e - The parameter `e` in the `handleMoveTouch` function is an event object that contains
   * information about the touch event that occurred. It likely includes details such as the type of
   * event, target element, and any additional data related to the touch event.
   */
  handleMoveTouch(e) {
    this.move({
      clientX: e.touches[0].clientX,
    });
  }

  /**
   * The `move` function in JavaScript is used to handle the movement of a handle element within a
   * range element based on user input.
   * @param e - The `e` parameter in the `move` function is typically an event object representing a
   * mouse event, such as a `mousemove` event. It contains information about the event, such as the
   * coordinates of the mouse pointer when the event occurred. This information is used in the function
   * to calculate the new
   */
  move(e) {
    const isLeft = this.activeHandle.classList.contains('left');
    const property = isLeft ? '--x-1' : '--x-2';
    const parentRect = this.rangeElement.getBoundingClientRect();
    const handleRect = this.activeHandle.getBoundingClientRect();
    let newX = e.clientX - parentRect.x - this.startPos;
    if (isLeft) {
      const otherX = parseInt(
        this.rangeElement.style.getPropertyValue('--x-2'),
      );
      newX = Math.min(newX, otherX - handleRect.width);
      newX = Math.max(newX, 0 - handleRect.width / 2);
    } else {
      const otherX = parseInt(
        this.rangeElement.style.getPropertyValue('--x-1'),
      );
      newX = Math.max(newX, otherX + handleRect.width);
      newX = Math.min(newX, parentRect.width - handleRect.width / 2);
    }
    this.activeHandle.dataset.value = this.calcHandleValue(
      (newX + handleRect.width / 2) / parentRect.width,
    );
    this.rangeElement.style.setProperty(property, newX + 'px');
  }

  /**
   * The `calcHandleValue` function calculates a value based on a percentage input within a specified
   * range and returns the result rounded to one decimal place.
   * @param percentage - The `percentage` parameter in the `calcHandleValue` function represents the
   * percentage value that you want to convert to a value within a specified range.
   * @returns The `calcHandleValue` function is returning a calculated value based on the percentage
   * provided as an argument. The formula used is `(percentage * (this.max - this.min) + this.min)`,
   * and the result is being returned with one decimal point using the `toFixed(1)` method.
   */
  calcHandleValue(percentage) {
    return (percentage * (this.max - this.min) + this.min).toFixed(1);
  }

  /**
   * The `handleStopMove` function removes event listeners for mouse and touch move actions.
   */
  handleStopMove() {
    window.removeEventListener('mousemove', this.moveListener);
    window.removeEventListener('touchmove', this.moveTouchListener);
  }

  /**
   * The `setEventListeners` function adds event listeners for mouse and touch events to handle moving
   * elements.
   */
  setEventListeners() {
    this.handles.forEach((el) => {
      el.addEventListener('mousedown', this.handleStartMove.bind(this));
      el.addEventListener('touchstart', this.startMoveTouch.bind(this));
    });

    window.addEventListener('mouseup', this.handleStopMove.bind(this));
    window.addEventListener('touchend', this.handleStopMove.bind(this));
    window.addEventListener('touchcancel', this.handleStopMove.bind(this));
    window.addEventListener('touchleave', this.handleStopMove.bind(this));
  }

  init() {
    this.setEventListeners();
  }
}

/**
 * The function `handleSwitchDualRange` toggles the visibility of range elements based on the state of
 * a checkbox within a dual range input component.
 * @param id - The `id` parameter is a string representing the id attribute of an HTML element.
 * @param checkbox - The `checkbox` parameter is a reference to the checkbox element that is being used
 * to toggle the visibility of the dual range input elements.
 */
function handleSwitchDualRange(id, checkbox) {
  const switchDualRange = document.querySelectorAll('.switchDualRange');

  switchDualRange.forEach((item) => {
    const input = item.querySelector('[type="checkbox"]');
    const rangeElements = item.querySelectorAll(`.dualRange span`);

    input.addEventListener('change', (event) => {
      const { currentTarget } = event;

      if (currentTarget.checked) {
        rangeElements.forEach((el) => {
          el.style.display = 'block';
        });
      } else {
        rangeElements.forEach((el) => {
          el.style.display = 'none';
        });
      }
    });
  });

  const inputRange = document.querySelectorAll(`#${id} .dual-range span`);
  if (!checkbox.checked) {
    inputRange.forEach((item) => {
      item.style.display = 'none';
    });
  } else {
    inputRange.forEach((item) => {
      item.style.display = 'block';
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const ranges = document.querySelectorAll('.dual-range');

  ranges.forEach((rangeEl) => {
    const range = new dualRangeSlider(rangeEl);
    range.init();
  });

  handleSwitchDualRange();
});

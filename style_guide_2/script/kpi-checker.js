const kpiField = document.querySelectorAll('[data-kpi-value]');

/**
 * The `init` function iterates over elements with a `kpiField` class, extracts a numerical value from
 * each element's `data-kpiValue` attribute, applies CSS classes based on the value, and updates the
 * element's text content to display the value followed by a percentage sign.
 */
function init() {
  kpiField.forEach((el) => {
    const value = Number(el.dataset.kpiValue);

    if (value > 100) {
      el.classList.add('positive');
    }

    if (value < 0) {
      el.classList.add('negative');
    }

    el.textContent = `${value}%`;
  });
}

init();

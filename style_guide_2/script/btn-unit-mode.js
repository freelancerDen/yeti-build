const timeParams = {
  percent: { dataName: 'percent', clientText: '%' },
  ticks: { dataName: 'ticks', clientText: 't' },
  monetary: { dataName: 'monetary', clientText: '$' },
  r: { dataName: 'r', clientText: 'R' },
};

const changeMode = (el, field, attr, text) => {
  el.setAttribute('data-mode', attr);
  el.innerText = text;
  field.setAttribute('data-mode', attr);
  field.innerText = text;
};

const checkMode = (el) => {
  const mode = el.dataset.mode;
  const field = el.closest('.data-info-container').querySelector('[data-mode]');
  const valuesArray = el.dataset.unitValues?.split(',');

  if (valuesArray?.length > 0) {
    const indexOf = valuesArray.indexOf(mode);

    const nextMode =
      indexOf + 1 === valuesArray.length
        ? valuesArray[0]
        : valuesArray[indexOf + 1];

    changeMode(
      el,
      field,
      timeParams[nextMode].dataName,
      timeParams[nextMode].clientText,
    );
  } else {
    switch (mode) {
      case 'percent':
        changeMode(
          el,
          field,
          timeParams.ticks.dataName,
          timeParams.ticks.clientText,
        );
        break;
      case 'ticks':
        changeMode(
          el,
          field,
          timeParams.percent.dataName,
          timeParams.percent.clientText,
        );
        break;

      default:
        console.log('Unknown mode.');
    }
  }
};

const btnHandler = (event) => {
  const { currentTarget } = event;

  checkMode(currentTarget);
};

export default { btnHandler };

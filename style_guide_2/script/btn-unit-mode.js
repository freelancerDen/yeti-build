const timeParams = {
  percent: { dataName: 'percent', clientText: '%' },
  ticks: { dataName: 'ticks', clientText: 't' },
};

const changeMode = (el, field, attr, text) => {
  el.setAttribute('data-mode', attr);
  el.innerText = text;
  field.setAttribute('data-mode', attr);
  field.innerText = text;
};

const checkMode = (el) => {
  let mode = el.dataset.mode;
  let field = el.closest('.data-info-container').querySelector('[data-mode]');
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
};

const btnHandler = (event) => {
  const { currentTarget } = event;

  checkMode(currentTarget);
};

export default { btnHandler };

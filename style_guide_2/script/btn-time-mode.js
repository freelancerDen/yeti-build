const timeParams = {
    day: { dataName: 'day', clientText: 'd' },
    hour: { dataName: 'hour', clientText: 'h' },
    minute: { dataName: 'minute', clientText: 'm' },
    second: { dataName: 'second', clientText: 's' }
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
          case "day":
              changeMode(el, field, timeParams.hour.dataName, timeParams.hour.clientText);
              break;
          case "hour":
              changeMode(el, field, timeParams.minute.dataName, timeParams.minute.clientText);
              break;
          case "minute":
              changeMode(el, field, timeParams.second.dataName, timeParams.second.clientText);
              break;
          case "second":
              changeMode(el, field, timeParams.day.dataName, timeParams.day.clientText);
              break;
          default:
              console.log("Unknown mode.");
      }
  };
  
  const btnHandler = (event) => {
      let btn = event.target;
      checkMode(btn);
  };
  
  export default {btnHandler};
  
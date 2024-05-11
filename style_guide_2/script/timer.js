const timers = document.querySelectorAll('.timer');

function updateTimer() {
  const now = new Date();

  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hour = now.getHours();
  timers.forEach((timer) => {
    timer.innerText = `${hour}:${min}:${sec}`;
  });
}

function init() {
  updateTimer();
  setInterval(updateTimer, 1000);
}

init();

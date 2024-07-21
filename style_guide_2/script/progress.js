function handleSwitchProgress(id, checkbox) {
  const switchDualRange = document.querySelectorAll('.switchProgress');

  switchDualRange.forEach((item) => {
    const input = item.querySelector('[type="checkbox"]');
    const progressElement = item.querySelector('.progressBar');

    input.addEventListener('change', (event) => {
      const { currentTarget } = event;

      if (currentTarget.checked) {
        item.classList.remove('hide-value');
        progressElement.style.opacity = '1';
      } else {
        item.classList.add('hide-value');
        progressElement.style.opacity = '0';
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  handleSwitchProgress();
});

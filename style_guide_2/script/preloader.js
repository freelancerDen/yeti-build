// Змінна для відстеження стану прелоадера
let isLoading = false;

function togglePreloader(show) {
  const preloader = document.getElementById("preloader");
  if (show) {
    preloader.classList.remove("preloader-hidden");
  } else {
    preloader.classList.add("preloader-hidden");
  }
}

/**
 * Функція для імітації запиту до бекенду.
 * Показує прелоадер, робить паузу на 3 секунди і приховує прелоадер.
 */
function fakeBackendRequest() {
  if (isLoading) {
    // Якщо прелоадер вже активний, вимкнути його
    isLoading = false;
    togglePreloader(false);
  } else {
    // Якщо прелоадер неактивний, увімкнути його
    isLoading = true;
    togglePreloader(true);

    // Імітація затримки відповіді бекенду
    setTimeout(() => {
      isLoading = false;
      togglePreloader(false);
    }, 3000); // 3 секунди
  }
}

/**
 * Додає обробник події до кнопки після завантаження DOM.
 * При натисканні на кнопку викликається функція fakeBackendRequest.
 */
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("testPreloaderBtn")
    .addEventListener("click", fakeBackendRequest);
});

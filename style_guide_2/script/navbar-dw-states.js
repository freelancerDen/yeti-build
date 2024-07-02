/*This script sets up the content of a navigation bar (navbarDW) by checking the document's title. Depending on whether the title is "Limitter" or something else, it populates the navigation bar with a corresponding set of menu items. This is useful for dynamically changing the navigation options based on the context or view of the application.*/
const navbarDW = document.querySelector("#ulDw");
const title = document.querySelector("title");
const limiter = `<li class="text_regular">Last 5 runners</li>
              <li class="text_regular">Last 1 day</li>
              <li class="text_regular">Last 2 days</li>
              <li class="text_regular">Last 3 days</li>
              <li class="text_regular">Last 1 week</li>
              <li class="text_regular">Last 5 limmiters</li>
              <li class="text_regular">Last 10 limmiters</li>
              <li class="text_regular">Last 25 limmiters</li>
              <li class="text_regular">Last 50 limmiters</li>
              <li class="text_regular">Last 100 limmiters</li>`;
const runner = `<li class="text_regular">Last 5 runners</li>
              <li class="text_regular">Last 1 day</li>
              <li class="text_regular">Last 2 days</li>
              <li class="text_regular">Last 3 days</li>
              <li class="text_regular">Last 1 week</li>
              <li class="text_regular">Last 5 runners</li>
              <li class="text_regular">Last 10 runners</li>
              <li class="text_regular">Last 25 runners</li>
              <li class="text_regular">Last 50 runners</li>
              <li class="text_regular">Last 100 runners</li>`;

const initDW = () => {
  title.innerText === "Limitter"
    ? (navbarDW.innerHTML = limiter)
    : (navbarDW.innerHTML = runner);
};


export default initDW();
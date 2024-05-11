//fiel variables
const def = 0,
  maxWidth = 96,
  maxLongWidth = 240;

// parse all nested texts
function setEventHandler(element) {
  element.forEach((item) => {
    checkWidth(item);
    item.addEventListener("mouseover", (e) => move(e));
    item.addEventListener("mouseleave", (e) => reset(e));
  });
}
//remove
function removeEventHandler(element) {
  element.forEach((item) => {
    item.removeEventListener("mouseover", move, false);
    item.removeEventListener("mouseleave", reset, false);
  });
}
// this function check all texts wich nested in dropdown menus & add boolean data-attribute
function checkWidth(el) {
  let elWidth = el.offsetWidth;
  let bigSize = el.closest(".selector_big");
  let regSize = el.closest(".selector_regular");
  if (elWidth > maxWidth && elWidth < maxLongWidth && regSize) {
    el.setAttribute("data-move", true);
    el.style.transition = `transform ${elWidth / 60}s ease-in-out`;
  } else if (elWidth > maxLongWidth && bigSize) {
    el.setAttribute("data-move", true);
    el.style.transition = `transform ${elWidth / 60}s ease-in-out`;
  } else {
    el.setAttribute("data-move", false);
  }

  return elWidth;
}

// move text in wrapper
function move(event) {
  let el = event.target;
  let state = event.target.dataset.move;
  let step = checkWidth(el) - maxWidth;

  if (state === "true") {
    el.style.transform = `translateX(-${step}px)`;
  }
}

// reset wrapper position to default params
function reset(event) {
  let el = event.target;
  el.style.transform = `translateX(${def}px)`;
}

//export function
export default { checkWidth, move, setEventHandler, reset, removeEventHandler };
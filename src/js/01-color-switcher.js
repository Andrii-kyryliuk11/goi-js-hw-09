const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.buttonStart.addEventListener('click', onStart);
refs.buttonStop.addEventListener('click', onStop);


refs.buttonStop.disabled = true;

let intervalOfChangingColors = null;

function onStart() {
  refs.buttonStop.disabled = false;
  refs.buttonStart.disabled = true;
  intervalOfChangingColors = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop() {
  refs.buttonStart.disabled = false;
  refs.buttonStop.disabled = true;

  clearInterval(intervalOfChangingColors);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
 
  onClose(selectedDates) {
   
    selectedDate = selectedDates[0];
      if (selectedDate <= Date.now()) {
          Notiflix.Notify.failure('Please choose a date in the future');
    return
}
    refs.button.disabled = false;
  },
};
flatpickr('#datetime-picker', options);

let selectedDate = null;
let timeRemaining = null;
let intervalId = null;
let timeComponents = null;

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.button.addEventListener('click', calculateRemainingTime);

refs.button.disabled = true;

function calculateRemainingTime() {
  
  Notiflix.Notify.success('Timer started')
  const choosenDate = selectedDate.getTime();
  refs.button.disabled = true;
  refs.input.disabled = true;
  intervalId = setInterval(() => {
    const dateOnNow = Date.now();

    timeRemaining = choosenDate - dateOnNow;

    timeComponents = convertMs(timeRemaining);

   
    updateInterface(timeComponents);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateInterface({ days, hours, minutes, seconds }) {
  if (timeComponents === null) {
    return;
  }
  if (Math.floor(timeRemaining) < 1000) {
      clearInterval(intervalId);
      Notiflix.Notify.info('It’s time!')
  }
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

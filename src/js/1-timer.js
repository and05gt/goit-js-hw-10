import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const flatpickrInput = document.querySelector('#datetime-picker');

startBtn.disabled = true;
startBtn.addEventListener('click', onStartTimer);

let intervalId = 0;
let userSelectedDate = null;
let currentDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        theme: 'dark',
      });
    } else {
      userSelectedDate = selectedDates[0].getTime();
      startBtn.disabled = false;
    }
  },
};

flatpickr(flatpickrInput, options);

function onStartTimer() {
  timer.start();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

const timer = {
  start() {
    intervalId = setInterval(() => {
      currentDate = Date.now();
      const diff = userSelectedDate - currentDate;
      updateTimerface(convertMs(diff));
      startBtn.disabled = true;
      flatpickrInput.disabled = true;

      if (diff <= 1000) {
        this.stop();
      }
    });
  },

  stop() {
    startBtn.disabled = true;
    flatpickrInput.disabled = false;
    clearInterval(intervalId);
    return;
  },
};

function updateTimerface({ days, hours, minutes, seconds }) {
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

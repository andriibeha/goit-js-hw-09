import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    dataPickerBtn: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

const DATA_DELAY = 1000;
let dateDiference = null;
let timerId = null;

refs.startBtn.disabled = true;

//Опції для бібліотеки flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        let dateNow = new Date;
        
        dateDiference = selectedDates[0] - dateNow;
    
        if (selectedDates[0] < dateNow) {
            refs.startBtn.disabled = true;

            Notify.failure("Please choose a date in the future");
        }
        else { 
            refs.startBtn.disabled = false;

            Notify.success("Great! Now click on Start button.");
        };
  },
};

//Створення flatpickr
flatpickr(refs.dataPickerBtn, options);

refs.startBtn.addEventListener('click', timeLeft)


//Відлік часу до кінця таймеру 
function timeLeft() { 
    timerId = setInterval(() => {
        let dateDiferenceInMs = convertMs(dateDiference);

        dateTimerTextContent(dateDiferenceInMs);

        dateDiference = dateDiference - 1000;
        
        if (dateDiference <= 0) { 
            clearInterval(timerId);
            
            refs.seconds.textContent = '00';
        };
        
    }, DATA_DELAY);
};

//Відображення часу до кінця таймера на сторінці 
function dateTimerTextContent({seconds, minutes, hours, days}) {
    refs.seconds.textContent = pad(seconds) ;
    refs.minutes.textContent = pad(minutes);
    refs.hours.textContent = pad(hours);
    refs.days.textContent = pad(days);
};

//Результат => число 1 буде записане як 01, 12 буде записане як 12 
function pad(value) {
    return String(value).padStart(2, '0');
};

//Перетворення мілісекунд(ms) в дні години хвилини секунди
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};



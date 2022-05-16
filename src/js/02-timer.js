import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const DATA_DELAY = 1000;

const refs = {
    dataPickerBtn: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

let dateDiference = null;
let timerId = null;
refs.startBtn.disabled = true;

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
            window.alert("Please choose a date in the future");
        } else { 
            refs.startBtn.disabled = false;
        };
  },
};

flatpickr(refs.dataPickerBtn, options);


refs.startBtn.addEventListener('click', timeLeft)

function timeLeft() { 
    timerId = setInterval(() => {
        let dateDiferenceInMs = convertMs(dateDiference);

        dateTimerContent(dateDiferenceInMs);

        dateDiference = dateDiference - DATA_DELAY;
        
        if (dateDiference < 1005) { 
            clearInterval(timerId);
            
            refs.seconds.textContent = '00';
        };

    }, DATA_DELAY);

};


function dateTimerContent({seconds, minutes, hours, days}) {
    refs.seconds.textContent = pad(seconds) ;
    refs.minutes.textContent = pad(minutes);
    refs.hours.textContent = pad(hours);
    refs.days.textContent = pad(days);
};

function pad(value) {
    return String(value).padStart(2, '0');
};

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

/* console.log(convertMs(2000));  */


const DELAY_TIME = 1000;

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    sotpBtn: document.querySelector('button[data-stop]'),
};

let intervalTimeId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.sotpBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() { 
    document.body.style.backgroundColor = getRandomHexColor();

    refs.startBtn.disabled = true;

    refs.sotpBtn.disabled = false;

    intervalTimeId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, DELAY_TIME);
};

function onStopBtnClick() { 
    clearInterval(intervalTimeId);

    refs.startBtn.disabled = false;

    refs.sotpBtn.disabled = true;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};



// input values
let inputDay = document.getElementById('dayValue'),
    inputHour = document.getElementById('hourValue'),
    inputMinute = document.getElementById('minuteValue'),
    inputSecond = document.getElementById('secondValue'),
    //timer html
    timerContainer = document.getElementById('board'),
    dayHtml = document.getElementById('dayCount'),
    hourHtml = document.getElementById('hourCount'),
    minuteHtml = document.getElementById('minuteCount'),
    secondHtml = document.getElementById('secondCount'),
    controls = document.getElementById('controls'),
    msgAlert = document.getElementById('timeMsg'),
    // units of time
    days,
    hours,
    minutes,
    seconds,
    btnStart = document.getElementById('begin'),
    modal = document.getElementById('modal'),
    active = false,
    clock = undefined;



let countDownApp = {

    startCount: function () {
        modal.style.display = "none";
        this.timer();
    },

    htmlUpdater: function () {
        if (days > 9) {
            dayHtml.innerText = `${days}:`
        } else {
            dayHtml.innerText = `0${days}:`
        };

        if (hours > 9) {
            hourHtml.innerText = `${hours}:`
        } else {
            hourHtml.innerText = `0${hours}:`
        };

        if (minutes > 9) {
            minuteHtml.innerText = `${minutes}:`
        } else {
            minuteHtml.innerText = `0${minutes}:`
        };

        if (seconds > 9) {
            secondHtml.innerText = `${seconds}`
        } else {
            secondHtml.innerText = `0${seconds}`
        }

    },

    count: function () {
        clock = setTimeout(this.timer, 1000);
        active = true;
    },

    timer: function () {
        countDownApp.htmlUpdater();
        countDownApp.count()
        if (seconds === 0) {
            if (minutes > 0) {
                minutes--;
                seconds = 60;
            } else if (minutes === 0) {
                if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 60;
                } else if (hours === 0) {
                    if (days > 0) {
                        days--;
                        hours = 24;
                        hours--;
                        minutes = 59;
                        seconds = 60;
                    } else {
                        inputSecond.value = 0;
                        inputMinute.value = 0;
                        inputHour.value = 0;
                        inputDay.value = 0;
                        modal.style.display = "flex";
                        msgAlert.innerText = "TIMES UP";
                        clearInterval(clock);
                    }
                }
            }

        }
        seconds--;


    },

    checkValues: function () {
        // make sure one of the values is greater than zero
        if (inputDay.value === "" || inputHour.value === "" || inputMinute.value === "" || inputSecond.value === "") {
            msgAlert.innerText = "Fields can not be empty or have letters in them";
        } else if (inputDay.value >= 1 || inputHour.value >= 1 || inputMinute.value >= 1 || inputSecond.value >= 1) {
            // make sure none of the other numbers are less than zero
            if (inputDay.value < 0 || inputHour.value < 0 || inputMinute.value < 0 || inputSecond.value < 0) {
                inputSecond.value = 0;
                inputMinute.value = 0;
                inputHour.value = 0;
                inputDay.value = 0;
                msgAlert.innerText = "NUMBERS CAN NOT BE LESS THAN ZERO";
            } else if (inputDay.value > 99999 || inputHour.value > 99999 || inputMinute.value > 99999 || inputSecond.value > 99999) {
                    msgAlert.innerText = "Values can not be greater than 99999";
            } else {
                days = inputDay.valueAsNumber;
                hours = inputHour.valueAsNumber;
                minutes = inputMinute.valueAsNumber;
                seconds = inputSecond.valueAsNumber;
                timerContainer.style.display = "flex";
                controls.style.display = "block";
                this.startCount();
            }
        } else {
            inputSecond.value = 0;
            inputMinute.value = 0;
            inputHour.value = 0;
            inputDay.value = 0;
            msgAlert.innerText = "Please enter a proper value";
        };
    },

    pauseCount: function () {
        let pauseBtn = document.getElementById('pauseBtn');
        let resumeBtn = document.getElementById('resumeBtn');
        pauseBtn.addEventListener('click',
            function (e) {
                e.preventDefault();
                clearInterval(clock);
                active = false;
                resumeBtn.style.display = "inline";
                pauseBtn.style.display = "none";
            }

        )
    },

    resumeCount: function () {
        let pauseBtn = document.getElementById('pauseBtn');
        let resumeBtn = document.getElementById('resumeBtn');
        resumeBtn.addEventListener('click',
            function (e) {
                e.preventDefault();
                if (active === false) {
                    countDownApp.count();
                    active = true;
                }
                resumeBtn.style.display = "none";
                pauseBtn.style.display = "inline";
            }

        )
    },

    resetCount: function () {
        let resetBtn = document.getElementById('resetBtn');
        resetBtn.addEventListener('click',
            function (e) {
                e.preventDefault();
                clearInterval(clock);
                inputSecond.value = 0;
                inputMinute.value = 0;
                inputHour.value = 0;
                inputDay.value = 0;
                dayHtml.innerText = "00:"
                hourHtml.innerText = "00:"
                minuteHtml.innerText = "00:"
                secondHtml.innerText = "00"
                timerContainer.style.display = "none";
                controls.style.display = "none";
                modal.style.display = "flex";
                resumeBtn.style.display = "none";
                pauseBtn.style.display = "inline";

            }

        )
    },


    init: function () {
        inputSecond.value = 0;
        inputMinute.value = 0;
        inputHour.value = 0;
        inputDay.value = 0;

        btnStart.addEventListener('click',
            function (e) {
                e.preventDefault();
                countDownApp.checkValues();
                countDownApp.pauseCount();
                countDownApp.resetCount();
                countDownApp.resumeCount();
            }

        )
    },


}


//console.log(countDownApp.dayCount.innerText);

countDownApp.init();
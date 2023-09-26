let countdownInterval;
const timerDisplay = document.getElementById('timer');
const notificationSound = document.getElementById('notificationSound');

function startTimer() {
    const totalSeconds = getTotalSeconds();
    if (!totalSeconds) return;

    clearInterval(countdownInterval);
    setTimeLeft(totalSeconds);
}

function getTotalSeconds() {
    const hours = parseInt(document.getElementById('hourInput').value) || 0;
    const minutes = parseInt(document.getElementById('minuteInput').value) || 0;
    const seconds = parseInt(document.getElementById('secondInput').value) || 0;

    return hours * 3600 + minutes * 60 + seconds;
}

function setTimeLeft(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;

    updateTimerDisplay(seconds);

    countdownInterval = setInterval(() => {
        const secondsLeft = Math.max(Math.round((then - Date.now()) / 1000), 0);
        updateTimerDisplay(secondsLeft);

        if (secondsLeft === 0) {
            completeNotification();
            clearInterval(countdownInterval);
        }
    }, 1000);
}


function updateTimerDisplay(seconds) {
    const hour = Math.floor(seconds / 3600);
    seconds %= 3600;
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const formattedTime = `${hour}:${min<10?'0':''}${min}:${sec<10?'0':''}${sec}`;
    timerDisplay.textContent = formattedTime;
    document.title = formattedTime;
}

function stop() {
    clearInterval(countdownInterval);
}

function resetTimer() {
    clearInterval(countdownInterval);
    document.title = "Timer App";
    timerDisplay.textContent = "00:00:00";
}

function completeNotification() {
    if (!notificationSound.paused) {
        notificationSound.pause();
    }
    notificationSound.currentTime = 0;
    notificationSound.loop = true;
    notificationSound.play();
    notificationSound.style.display = 'block';
}

function dismiss() {
    clearInterval(countdownInterval);
    notificationSound.pause();
    notificationSound.currentTime = 0;
    notificationSound.style.display = 'none';
    resetTimer();
}
let countdownInterval;
const timerDisplay = document.getElementById('timer');
const notificationSound = document.getElementById('notificationSound');
let pauseResumeText = document.getElementById('pauseResume');
let isPaused = false;
let remainingTime = 0;

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
    let then = now + seconds * 1000;

    updateTimerDisplay(seconds);

    countdownInterval = setInterval(() => {
        if (!isPaused) {
            const secondsLeft = Math.max(Math.round((then - Date.now()) / 1000), 0);
            updateTimerDisplay(secondsLeft);

            if (secondsLeft === 0) {
                completeNotification();
                clearInterval(countdownInterval);
            }
        } else {
            then += 1000;
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

function pauseResume() {
    isPaused = !isPaused;
    if (isPaused) {
        pauseResumeText.textContent = 'Resume';
    } else {
        pauseResumeText.textContent = 'Pause';
    }
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
}

function dismiss() {
    clearInterval(countdownInterval);
    notificationSound.pause();
    notificationSound.currentTime = 0;
    resetTimer();
}
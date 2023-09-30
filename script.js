let timeBox = document.querySelector("#time-left");
let timerId = 1;

// to create timer up div with yellow background
function newTimeUp(beforeElement) {
    let timeUpElement = document.createElement('div');
    timeUpElement.className = 'time-up';
    timeUpElement.innerHTML = `
    <div class="blank"></div>
    <p>Timer Is Up !</p>
    <button class="stop-btn" onclick="deleteTimeUp(this)">Stop</button>
    `;
    timeBox.insertBefore(timeUpElement, beforeElement);
}

// to delete the yellow-backgroud timer div upon clicking delete/stop
function deleteTimeUp(target) {
    target.parentNode.remove();
    let noTimer = document.querySelector('.no-timers');
    // let timeLeft = document.getElementById("time-left")
    if(timeBox.children.length == 0) {
        noTimer.classList.remove('d-none');
    }
}

document.querySelector('.set-btn').addEventListener('click', (event) => {
    let hr = Number(document.getElementById('set-hour').innerText);
    let min = Number(document.getElementById('set-minute').innerText);
    let sec = Number(document.getElementById('set-second').innerText);

    let totalTime = hr*3600 + min*60 + sec;
    createTimerBox(totalTime);

    document.getElementById('set-hour').innerText = '00';
    document.getElementById('set-minute').innerText = '00';
    document.getElementById('set-second').innerText = '00';
})

// to create a new timer div upon clicking set button
function createTimerBox(totalTime) {
    let hr = Math.floor(totalTime/3600);
    let min = Math.floor(totalTime%3600/60);
    let sec = Math.floor(totalTime%3600%60);

    // console.log(hr<10 ? '0'+hr:hr, min, sec);
    let newTimer = document.createElement('div');
    newTimer.classList.add("main-timer");
    newTimer.id = (timerId++) + '';
    newTimer.innerHTML = `
    <p class="set-time">Time Left : </p>
    <div class="set-time">
    <div class="time">
        <div class="hour">${hr<10 ? '0'+hr: hr}</div>
        <div class="colon">:</div>
        <div class="minute">${min<10 ? '0'+min: min}</div>
        <div class="colon">:</div>
        <div class="second">${sec<10 ? '0'+sec: sec}</div>
    </div>  
    </div>
    <button class="delete-btn set-btn" onclick="deleteTimeUp(this)">Delete</button>
    `;
    timeBox.append(newTimer);
    let noTimer = document.querySelector('.no-timers');
    if(getComputedStyle(noTimer).display != 'none') {
        noTimer.classList.add('d-none');
    }

    startTimer(totalTime, newTimer);
}

// to start timer of the newly created div from set button
function startTimer(totalTime, newTimer) {
    let hour = newTimer.querySelector('.hour');
    let minute = newTimer.querySelector('.minute');
    let second = newTimer.querySelector('.second');

    let intervalId = setInterval(() => {
        // if we delete/stop the timer, it has to stop
        if(document.getElementById(newTimer.id) == null) {
            clearInterval(intervalId);
            return;
        }
        // when timer time is 00 : 00 : 00 means timer is ended, then audio will play
        if(totalTime == 0) {
            try {
                let audio = new Audio('timer_sound.mp3');
                audio.play();
                newTimeUp(newTimer);
                newTimer.remove();
            } catch (err) {}
            clearInterval(intervalId);
        }
        // console.log(hour.innerText, minute.innerText, second.innerText);
        totalTime--;

        let h = Math.floor(totalTime/3600);
        let m = Math.floor(totalTime%3600/60);
        let s = Math.floor(totalTime%3600%60); 

        hour.innerText = h<10 ? '0'+h:h;
        minute.innerText = m<10 ? '0'+m:m;
        second.innerText = s<10 ? '0'+s:s;

    }, 1000);
}

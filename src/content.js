let data = {}

chrome.storage.sync.get("watch-time", function(items){
    if (items["watch-time"]) data = items['watch-time']
});

class BaseTimer {
    constructor(hours = 0, mins = 0, secs = 0) {
        this.hours = hours
        this.mins = mins
        this.secs = secs
    }

    getTimestring = () => `${this.hours}h ${this.mins}m ${this.secs}s`

    addSecond = () => {
        this.secs++
        if (this.secs === 60) {
            this.addMinute()
            this.secs = 0
        }
    }

    addMinute = () => {
        this.mins++
        if (this.mins === 60) {
            this.addHour()
            this.mins = 0
        }
    }

    addHour = () => this.hours++

    setTime = (hours = 0, mins = 0, secs = 0) => {
        this.hours = hours
        this.mins = mins
        this.seconds = secs
    }

    getSeconds = () => this.secs

    getMinutes = () => this.mins

    getHours = () => this.hours
}

const regExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/+/gm
let url;

switch (regExp.test(window.location.href)) {
    case true:
        url = 'youtube'
        break;
    default:
        url = 'netflix'
        break;
}

let timer = data[url] || new BaseTimer()
let seconds = 0

function cb() {
    seconds++
    if (seconds === 60) {
        timer.addMinute()
        data[url] = timer
        chrome.storage.sync.set({ "watch-time": data });
        seconds = 0
    }
}

let interval = setInterval(cb, 1000)
if (document.hidden) clearInterval(interval)
document.addEventListener('visibilitychange', function(){
    if (document.hidden) clearInterval(interval)
    else {
        interval = setInterval(cb, 1000)
    }
})
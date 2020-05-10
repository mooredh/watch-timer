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

let data = {}
let date = new Date().toDateString()

data[date] = {}

let timer = new BaseTimer()

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

let seconds = 0

function cb() {
    seconds++
    if (seconds === 60) {
        timer.addMinute()
        data[date][url] = timer
        chrome.storage.sync.set({ "watch-time": data });
        seconds = 0
    }
}

chrome.storage.sync.get("watch-time", function(items){
    if (items["watch-time"]) {
        data = items['watch-time']
        if (data[date] === undefined) {
            data[date] = {}
        }

        if (data[date][url]) {
            const { hours, mins } = data[date][url]
            timer = new BaseTimer(hours, mins)
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
});
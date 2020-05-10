class BaseTimer {
    constructor(name = '', hours = 0, mins = 0, secs = 0) {
        this.hours = hours
        this.mins = mins
        this.secs = secs
        this.name = name
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
        if (mins === 60) {
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

const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
let timer;

switch (window.location.href.match(regExp)) {
    case true:
        timer = new BaseTimer('youtube')
        break;
    default:
        timer = new BaseTimer('netflix')
        break;
}

setInterval(function() {
    timer.addSecond()

    console.log(timer.getTimestring());
}, 1000)


window.onload = function() {
    let data = {}
    chrome.storage.sync.get("watch-time", function(items){
        let date = new Date().toDateString()
        data = items['watch-time']
        if (data) {
            if (data[date]) {
                if (data[date].youtube) {
                    document.getElementById('youtube-timer').innerHTML = `${data[date].youtube.hours}h ${data[date].youtube.mins}m`
                }
                if (data[date].netflix) {
                    document.getElementById('netflix-timer').innerHTML = `${data[date].netflix.hours}h ${data[date].netflix.mins}m`
                }
            }
        }
    });
    let active = 'today'

    document.querySelectorAll('.tab-items div').forEach(function(div) {
        div.addEventListener('click', function() {
            document.querySelectorAll('.tab-items div').forEach(function(elem) {
                elem.classList.remove('active')
            })
            div.classList.add('active')
            active = div.innerHTML.toLowerCase()
            let day;
            if (active === 'this week') {
                let youtube = { hours: 0, mins: 0 }
                let netflix = { hours: 0, mins: 0 }
                let tmp = new Date()

                for (let i = 0; i < 7; i++) {
                    day = new Date(tmp.setDate(tmp.getDate() - i)).toDateString()

                    if (data[day]) {
                        if (data[day].youtube) {
                            youtube.hours += data[day].youtube.hours
                            youtube.mins += data[day].youtube.mins
                        }
                        if (data[day].netflix) {
                            netflix.hours += data[day].netflix.hours
                            netflix.mins += data[day].netflix.mins
                        }
                    }
                    if (day.substring(0, 3) === 'Sun') break;
                };

                youtube.hours += Math.floor(youtube.mins / 60)
                youtube.mins = youtube.mins % 60
                netflix.hours += Math.floor(netflix.mins / 60)
                netflix.mins = netflix.mins % 60
                document.getElementById('youtube-timer').innerHTML = `${youtube.hours}h ${youtube.mins}m`
                document.getElementById('netflix-timer').innerHTML = `${netflix.hours}h ${netflix.mins}m`
            } else {
                day = new Date().toDateString()
                if (data[day]) {
                    if (data[day].youtube) {
                        document.getElementById('youtube-timer').innerHTML = `${data[day].youtube.hours}h ${data[day].youtube.mins}m`
                    } else {
                        document.getElementById('youtube-timer').innerHTML = '0h 0m'
                    }
                    if (data[day].netflix) {
                        document.getElementById('netflix-timer').innerHTML = `${data[day].netflix.hours}h ${data[day].netflix.mins}m`
                    } else {
                        document.getElementById('netflix-timer').innerHTML = '0h 0m'
                    }
                } else {
                    document.getElementById('youtube-timer').innerHTML = '0h 0m'
                    document.getElementById('netflix-timer').innerHTML = '0h 0m'
                }
            }
        })
    })
}
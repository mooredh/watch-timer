$(function() {
    let data = {}
    chrome.storage.sync.get("watch-time", function(items){
        let date = new Date().toDateString()
        data = items['watch-time']
        if (data) {
            if (data[date]) {
                if (data[date].youtube) {
                    $('#youtube-timer').text(`${data[date].youtube.hours}h ${data[date].youtube.mins}m`)
                }
                if (data[date].netflix) {
                    $('#netflix-timer').text(`${data[date].netflix.hours}h ${data[date].netflix.mins}m`)
                }
            }
        }
    });
    let active = 'today'

    $('.tab-items div').click(function() {
        $('.tab-items div').removeClass('active')
        $(this).addClass('active');
        active = $(this).text().toLowerCase()
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
            $('#youtube-timer').text(`${youtube.hours}h ${youtube.mins}m`)
            $('#netflix-timer').text(`${netflix.hours}h ${netflix.mins}m`)
        } else {
            day = new Date().toDateString()
            if (data[day]) {
                if (data[day].youtube) {
                    $('#youtube-timer').text(`${data[day].youtube.hours}h ${data[day].youtube.mins}m`)
                } else {
                    $('#youtube-timer').text('0h 0m')
                }
                if (data[day].netflix) {
                    $('#netflix-timer').text(`${data[day].netflix.hours}h ${data[day].netflix.mins}m`)
                } else {
                    $('#netflix-timer').text('0h 0m')
                }
            } else {
                $('#netflix-timer').text('0h 0m')
                $('#youtube-timer').text('0h 0m')
            }
        }
    })
})
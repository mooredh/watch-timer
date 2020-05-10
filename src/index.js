$(function() {
    let data = {}
    chrome.storage.sync.get("watch-time", function(items){
        data = items['watch-time']
        if (data.youtube) {
            $('#youtube-timer').text(`${data.youtube.hours}h ${data.youtube.mins}m`)
        }
        if (data.netflix) {
            $('#netflix-timer').text(`${data.netflix.hours}h ${data.netflix.mins}m`)
        }
    });
    let active = 'today'

    $('.tab-items div').click(function() {
        $('.tab-items div').removeClass('active')
        $(this).addClass('active');
        active = $(this).text().toLowerCase()
    })
})
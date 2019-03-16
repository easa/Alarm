var isRunning = false;
$(document).ready(function() {
    // check the timer
    // check the buttons
    // check the data base
    //window.namespace.business.clock('.bu-clock');
    $('#cornometer').on('click', function() {
        if (isRunning) return void(1);
        isRunning = true;

        var timer = new window.namespace.timer();
        var dis = this;

        function updateCornometer() {
            setTimeout(() => {
                dis.innerText = timer.toString(timer.pastTime());
                updateCornometer()
            }, 100);
        }
        updateCornometer();
    })


});
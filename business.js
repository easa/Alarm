
(function () {
    window.bu = new program()
    function program() {
        this.alert = function () { }
        this.storage = function () {
            if (typeof (Storage) !== "undefined") {
                // Code for localStorage/sessionStorage.
            } else {
                console.log('Sorry! No Web Storage support..')
            }
        }
        this.clock = function () {
            var elem = $(arguments[0]);
            if (elem.lenght < 1) return
            function startTime() {
                var today = new Date();
                var h = today.getHours();
                var m = today.getMinutes();
                var s = today.getSeconds();
                m = checkTime(m);
                s = checkTime(s);
                elem.html(h + ":" + m + ":" + s);
                var t = setTimeout(startTime, 500);
            }
            function checkTime(i) {
                if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
                return i;
            }
            startTime()
        }
        this.start = function () {

        }
    }
    $(document).ready(function () {
        // check the timer
        // check the buttons
        // check the data base
        bu.clock('.bu-clock')
    })
})();
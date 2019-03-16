(function() {
    // it is the namespace of business layer 
    // to keep things separated!
    if (!window.namespace)
        window.namespace = {};
    window.namespace.business = new program();

    function program() {
        this.run = function() {
            return {
                state: true,
                model: new timer()
            };
        };
    }

    function timer(startTime) {
        var v = startTime || 0, // v should be consistant
            t = v,
            initiateTime = Date.now();

        function pastTime() {
            return t = Date.now() - initiateTime, t;
        };
        this.toString = function() {
            return separateTime.join().toString();
        };
        this.toModel = function(time) {
            return separateTime(time);
        }
        this.value = function() {
            pastTime();
            return t + v;
        };
        this.initTime = function() {
            return initiateTime;
        }
    }
    window.namespace.testTimer = timer;

    function separateTime(time) {
        //var date = new Date();
        //var t = date.setTime(time);
        var minutes = 1000 * 60;
        var hours = minutes * 60;
        var days = hours * 24;

        var model = [{
                value: "",
                name: 'miliseconds',
                nickName: 'ms',
                calc: 1,
                calc2: 1000
            },
            {
                value: "",
                name: 'seconds',
                nickName: 's',
                calc: 1000,
                calc2: 60
            },
            {
                value: "",
                name: 'minutes',
                nickName: 'm',
                calc: 1000 * 60,
                calc2: 60
            },
            {
                value: "",
                name: 'hours',
                nickName: 'h',
                calc: minutes * 60,
                calc2: 60
            }
            // {
            //     value: "",
            //     name: 'days',
            //     nickName: 'd',
            //     calc: hours * 24,
            //     calc2: 60
            // },
            // {
            //     value: "",
            //     name: 'weeks',
            //     nickName: 'w',
            //     calc: days * 7,
            //     calc2: 60
            // },
            // {
            //     value: "",
            //     name: 'months',
            //     nickName: 'm',
            //     calc: days * 30,
            //     calc2: 60
            // },
            // {
            //     value: "",
            //     name: 'years',
            //     nickName: 'y',
            //     calc: days * 365,
            //     calc2: 60
            // },
        ];

        var result = {};

        // making results
        model.forEach((element) => {
            element.value = Math.floor(time / element.calc);
            result[element.nickName] = element.value % element.calc2;
        });

        // t: model.find((element) => {
        //     return element.name == 'miliseconds' ? element : 0;
        // }).value,
        return result;
    }
})();
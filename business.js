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
            //t = v,
            initiateTime = Date.now();

        this.pastTime = function(newTime) {
            var r = newTime || Date.now() - initiateTime;
            return r;
        };
        this.toString = function(time, options) {
            var result = options ? options.format || 'mm:ss' : 'mm:ss:ms',
                model = separateTime(time, options = {
                    doFormat: true
                });
            result.split(':').forEach((item) => {
                if (!model[item]) throw 'bad format'; //, use hh(hours), mm(minutes), ss(seconds), ms(milisecond) for equivalet in two digit format';
                result = result.replace(item, model[item]);
            });
            return result;
        }
        this.toModel = function(time) {
            return separateTime(time);
        }

        this.initTime = function() {
            return initiateTime;
        }
    }
    // mock of timer
    window.namespace.testTimer = timer;
    window.namespace.timer = timer;
    // convert the date-time integer to an object like {hh,mm,ss,ms}
    function separateTime(time, options) {
        if (!time) throw 'time should be passed as a parameter';
        var shouldFormat = false;
        if (options && options.doFormat)
            shouldFormat = true;
        //var date = new Date();
        //var t = date.setTime(time);
        var minutes = 1000 * 60,
            hours = minutes * 60,
            days = hours * 24;

        // the time model to show to user
        var model = [{
                value: 0,
                name: 'miliseconds',
                nickName: shouldFormat ? 'ms' : 'ms',
                calc: 1,
                highValue: 1000
            },
            {
                value: 0,
                name: 'seconds',
                nickName: shouldFormat ? 'ss' : 's',
                calc: 1000,
                highValue: 60
            },
            {
                value: 0,
                name: 'minutes',
                nickName: shouldFormat ? 'mm' : 'm',
                calc: minutes,
                highValue: 60
            },
            {
                value: 0,
                name: 'hours',
                nickName: shouldFormat ? 'hh' : 'h',
                calc: hours,
                highValue: 60
            }
            // {
            //     value: 0,
            //     name: 'days',
            //     nickName: shouldFormat ? 'dd':'d',
            //     calc: hours * 24,
            //     highValue: 60
            // },
            // {
            //     value: 0,
            //     name: 'weeks',
            //     nickName: shouldFormat ? 'ww':'w',
            //     calc: days * 7,
            //     highValue: 60
            // },
            // {
            //     value: 0,
            //     name: 'months',
            //     nickName: shouldFormat ? 'mn':'m',
            //     calc: days * 30,
            //     highValue: 60
            // },
            // {
            //     value: 0,
            //     name: 'years',
            //     nickName: shouldFormat ? 'yy':'y',
            //     calc: days * 365,
            //     highValue: 60
            // },
        ];

        var result = {};

        // making results
        model.forEach((element) => {
            element.value = Math.floor(time / element.calc);
            // chekc if format needed
            if (shouldFormat)
                result[element.nickName] = (function(el) {
                    var r = n = (el.value % el.highValue);
                    for (var i = 1; 10 ** i < el.highValue && el.value <= el.highValue; i++)
                        r = '0' + r;
                    return r;
                })(element);
            else
                result[element.nickName] = element.value % element.highValue;
        });

        // t: model.find((element) => {
        //     return element.name == 'miliseconds' ? element : 0;
        // }).value,
        return result;
    }
})();
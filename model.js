! function() {
    namespace.model = new program();

    function program() {
        this.items = {}

    }

    var item = function(_name, _class, _s, _e) {
        this.name = _name || null
        this.class = _class || null
        this.start = _s || Date.now
        this.end = _e || Date.now
    }
    var classroom = function(_name, _teacher, _s, _e) {
        this.name = _name || null
        this.teacher = _teacher || null
        this.start = _s || Date.now
        this.end = _e || Date.now
    }
    var person = function(_name, _tel, _note) {
        this.name = _name || null
        this.tel = _tel || null
        this.note = _note || null
    }
    var timeModels = [{
            value: "",
            name: 'miliseconds',
            nickName: shouldFormat ? 'ms' : 'ms',
            calc: 1,
            highValue: 1000
        },
        {
            value: "",
            name: 'seconds',
            nickName: shouldFormat ? 'ss' : 's',
            calc: 1000,
            highValue: 60
        },
        {
            value: "",
            name: 'minutes',
            nickName: shouldFormat ? 'mm' : 'm',
            calc: minutes,
            highValue: 60
        },
        {
            value: "",
            name: 'hours',
            nickName: shouldFormat ? 'hh' : 'h',
            calc: hours,
            highValue: 60
        }
        // {
        //     value: "",
        //     name: 'days',
        //     nickName: shouldFormat ? 'dd':'d',
        //     calc: hours * 24,
        //     highValue: 60
        // },
        // {
        //     value: "",
        //     name: 'weeks',
        //     nickName: shouldFormat ? 'ww':'w',
        //     calc: days * 7,
        //     highValue: 60
        // },
        // {
        //     value: "",
        //     name: 'months',
        //     nickName: shouldFormat ? 'mn':'m',
        //     calc: days * 30,
        //     highValue: 60
        // },
        // {
        //     value: "",
        //     name: 'years',
        //     nickName: shouldFormat ? 'yy':'y',
        //     calc: days * 365,
        //     highValue: 60
        // },
    ];
}();
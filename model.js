(function() {
  var unknown = "unknown";
  if (!window.namespace) window.namespace = {};
  namespace.model = program;
  var listOfClasses = {
    item: itmeModel,
    classroom: classroomModel,
    person: personModel,
    study: studyModel,
    time: timeModel
  };
  var list = ["item", "classroom", "person", "study", "time"],
    items = [];

  function program(options) {
    if (!options) options = {items: list};
    items = options.items || list;
    this.toString = function() {
      return items.join(", ");
    };
    for (var i of items) this[i] = listOfClasses[i];
    return this;
  }

  function itmeModel(_name, _class, _s, _e) {
    this.name = _name || null;
    this.class = _class || null;
    this.start = _s || Date.now;
    this.end = _e || Date.now;
  }
  function classroomModel(_name, _teacher, _s, _e) {
    this.name = _name || null;
    this.teacher = _teacher || null;
    this.start = _s || Date.now;
    this.end = _e || Date.now;
  }
  function personModel(_name, _tel, _note) {
    this.name = _name || null;
    this.tel = _tel || null;
    this.note = _note || null;
  }
  var objectItem = function(value, validateFunction) {
    this.value = value || unknown;
    this.isValid = function() {
      return typeof validateFunction == "function" ? validateFunction(this.value) : undefined;
    };
    return this;
  };
  function studyModel(_name, _relatedClass, _startedAt, _stopedAt) {
    var thisStudy = this,
      each = function(callback) {
        if (typeof callback != "function") return void 1;
        for (let i in thisStudy) {
          if (thisStudy.hasOwnProperty(i) && (typeof thisStudy[i] == "string" || typeof thisStudy[i] == "number")) callback(thisStudy[i]);
          else if (thisStudy[i].value) callback(thisStudy[i].value);
        }
      },
      getDurationTime = function(begin, end) {
        var b = new Date(begin),
          e = new Date(end);
        return e - b;
      };
    var opt = arguments[0];
    if (typeof opt == "object") {
      opt.duration = getDurationTime(opt.begin, opt.end);
      opt.begin = new Date(opt.begin);
      this.name = new objectItem(opt.name, v => {
        /^.*{6,24}$/g.test(v);
      });
      this.class = new objectItem(opt.class, v => {
        return typeof v == "object";
      });
      this.startedAt = new objectItem(new time(opt.begin).toString());
      this.stopedAt = new objectItem(new time(opt.end).toString());
      this.duration = new objectItem(new time(opt.duration).toString());
    } else {
      this.name = _name || unknown;
      this.class = _relatedClass || unknown;
      this.startedAt = _startedAt || unknown;
      this.stopedAt = _stopedAt || unknown;
      this.duration = arguments[4];
    }

    this.toTableRow = function() {
      let tr = document.createElement("tr");
      each(function(item) {
        let td = document.createElement("td");
        td.innerText = item;
        tr.appendChild(td);
      });
      return tr;
    };
    this.toJson = function() {
      var getTheObjectValue = function(v) {
        return typeof v == "object" ? v.value : v;
      };
      return {
        name: getTheObjectValue(this.name),
        class: getTheObjectValue(this.class),
        startedAt: getTheObjectValue(this.startedAt),
        stopedAt: getTheObjectValue(this.stopedAt),
        duration: getTheObjectValue(this.duration)
      };
    };
    return this;
  }
  function timeModel(shouldFormat) {
    if (!shouldFormat) shouldFormat = false;
    var minutes = 1000 * 60,
      hours = minutes * 60,
      days = hours * 24;
    return [
      {
        value: 0,
        name: "miliseconds",
        nickName: shouldFormat ? "ms" : "ms",
        calc: 1,
        highValue: 1000,
        format: "000",
        numberFormat: 3
      },
      {
        value: 0,
        name: "seconds",
        nickName: shouldFormat ? "ss" : "s",
        calc: 1000,
        highValue: 60,
        format: "00",
        numberFormat: 2
      },
      {
        value: 0,
        name: "minutes",
        nickName: shouldFormat ? "mm" : "m",
        calc: minutes,
        highValue: 60,
        format: "00",
        numberFormat: 2
      },
      {
        value: 0,
        name: "hours",
        nickName: shouldFormat ? "hh" : "h",
        calc: hours,
        highValue: 60,
        format: "00",
        numberFormat: 2
      }
    ];

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
  }
  function time(dateTime) {
    var dt = typeof dateTime === "number" ? dateTime : new Date(dateTime);
    function separateTime(time) {
      var model = new timeModel(true),
        result = {};
      model.forEach(e => {
        e.value = Math.floor(time / e.calc);
        result[e.nickName] = (e.format + (e.value % e.highValue)).slice(-e.numberFormat);
      });
      return result;
    }
    this.toString = function(format) {
      if (dt > 1000000) return new Date(dt).toTimeString().slice(0, 5);
      var result = format || "hh:mm",
        model = separateTime(dt);
      result.split(":").forEach(item => {
        if (!model[item]) return void 1;
        result = result.replace(item, model[item]);
      });
      return result;
    };
  }
})();

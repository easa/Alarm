(function() {
  // it is the namespace of business layer
  // to keep things separated!
  if (!window.namespace) window.namespace = {};
  window.namespace.bu = new program();

  function program() {
    this.run = function() {
      return {
        state: true,
        model: new timer()
      };
    };
  }
  // class to manage study course
  function study(options) {
    //var course = new model.course();
    this.start = function() {
      return true;
    };
    this.stop = function() {
      return this.toJson();
    };
    this.toString = function() {};
    this.toJson = function() {
      return {};
    };
  }
  // class to manage time
  function timer(options) {
    if (options)
      var opt = {
        startTime: options.begin || 0,
        stopTime: options.end || 0
      };
    //var v = startTime || 0, // v should be consistant
    var initiateTime = Date.now();
    // convert the date-time integer to an object like {hh,mm,ss,ms}
    function separateTime(time, options) {
      if (!time) throw "time should be passed as a parameter";
      var shouldFormat = false;
      if (options && options.doFormat) shouldFormat = true;
      // the time model to show to user
      var model = new namespace.model({ items: ["time"] }).time(shouldFormat),
        result = {};
      // making results
      model.forEach(element => {
        element.value = Math.floor(time / element.calc);
        // chekc if format needed and format it
        if (shouldFormat)
          result[element.nickName] = (
            element.format +
            (element.value % element.highValue)
          ).slice(-element.numberFormat);
        else result[element.nickName] = element.value % element.highValue;
      });
      return result;
    }
    function _toString(time, options) {
      if (!time) time = this.getPastTime();
      var result = options ? options.format || "mm:ss" : "mm:ss:ms",
        model = separateTime(time, (options = { doFormat: true }));
      result.split(":").forEach(item => {
        if (!model[item]) return void 1; //, use hh(hours), mm(minutes), ss(seconds), ms(milisecond) for equivalet in two digit format';
        result = result.replace(item, model[item]);
      });
      return result;
    }
    this.getInitTime = function() {
      return initiateTime;
    };
    this.getPastTime = function(newTime) {
      var result = newTime || Date.now() - initiateTime;
      return newTime === false ? _toString(result) : result;
    };
    this.getValue = function() {
      return {
        inTime: initiateTime,
        passTime: getPastTime
      };
    };
    this.setValue = function() {
      initiateTime = arguments[0] || Date.now();
      return true;
    };
    this.toString = function(time, options) {
      return _toString(time, options);
    };
    this.toJson = function(time) {
      return separateTime(time);
    };
    this.initTime = function() {
      return initiateTime;
    };
  }

  // mocks of classes above
  window.namespace.bu.timer = timer;
  window.namespace.bu.study = study;
})();

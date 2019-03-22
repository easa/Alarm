// it's new. but for the functionality of control the study and other stuff there sould be a test

QUnit.test("The Business namespace where defined!", function(assert) {
  var bis = namespace.bu;
  assert.ok(bis, "business namespace ain't null!");
  var run = bis.run;
  assert.ok(typeof run === "function", "run is a function!");
  assert.ok(typeof run() === "object", "run return true when executed!");
});
QUnit.test("Timer from Business namespace function", function(assert) {
  var t = new namespace.bu.timer();
  assert.equal(t.initTime(), Date.now(), "init time is the time value and should be NOW time.");
  // toJson functoin --- it also chekcs some of inner functions for calculating the time
  assert.deepEqual(t.toJson(1), {h: 0, m: 0, s: 0, ms: 1}, "it checks for 1 milisecond value");
  assert.deepEqual(t.toJson(6000), {h: 0, m: 0, s: 6, ms: 0}, "it chekcs for 6 seconds value");
  assert.deepEqual(t.toJson(121), {h: 0, m: 0, s: 0, ms: 121}, "it checks for 121ms");
  assert.deepEqual(t.toJson(12600000), {h: 3, m: 30, s: 0, ms: 0}, "it cheks 3:30 it's 180+30=210m*60=12600s ");
  assert.deepEqual(t.toJson(86399999), {h: 23, m: 59, s: 59, ms: 999}, "it cheks 23:59 it's 23*60=1380+59=1439m*60=86340s+59=86399s*1000+999=86399999 ");
  // toString functoin
  assert.equal(t.toString(1, {format: "ms"}), "001", "it checks for 1 milisecond value");
  assert.equal(t.toString(6000, {format: "hh:mm:ss"}), "00:00:06", "it chekcs for 6 seconds value");
  //assert.ok(t.toString(6000, { format: 'hh:dd:ss' }), 'bad format'); // it should throw error 'bad format'
  // check the value by passing some time to it
  var temp1 = t.toString(t.getPastTime(Date.now()), {format: "mm:ss:ms"});
  var temp2 = t.toString(t.getPastTime(Date.now()), {format: "mm:ss:ms"});
  var temp3 = t.toString(t.getPastTime(Date.now()), {format: "mm:ss:ms"});
  assert.ok(temp1, `result shouldn\'t be this: temp1= ${temp1}, temp2= ${temp2}, temp3= ${temp3}.`); // it should be in a settimeout function
});
QUnit.test("Study from Business namespace function", function(assert) {
  // get lession and timer as parameter?
  var s = new namespace.bu.study();
  assert.ok(s.start(), "return true when it begins.");
  assert.deepEqual(s.stop(), {}, "returns the information of this course!");
});
// QUnit.test("the Model where defined and test items inside of it! ", function(assert) {
//   // get lession and timer as parameter?
//   var m = new namespace.model({items: ["item", "study", "time"]});
//   assert.ok(m, `the return value of model contains ${m.toString()}`);
//   assert.deepEqual(
//     m.study("session1", "math", "21 jun 20:20", "21 jun 20:35", "15 min").toJson(),
//     {
//       name: "session1",
//       class: "math",
//       startedAt: "21 jun 20:20",
//       stopedAt: "21 jun 20:35",
//       duration: "15 min"
//     },
//     "the return value should be like that"
//   );
// });
QUnit.test("Model Testing --------- ", function(assert) {
  // get lession and timer as parameter?
  var m = new namespace.model({items: ["item", "class", "study", "time"]});
  assert.ok(m, `the return value of model contains ${m.toString()}`);
  assert.deepEqual(
    m
      .study({
        name: "session1",
        class: "math",
        begin: "21 march 2019 20:20",
        end: "21 march 2019 20:35"
      })
      .toJson(),
    {
      name: "session1",
      class: "math",
      startedAt: "20:20",
      stopedAt: "20:35",
      duration: "00:15"
    },
    "the return value should be like that"
  );
});

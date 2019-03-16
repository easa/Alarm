// it's new. but for the functionality of control the study and other stuff there sould be a test

QUnit.test("The Business where defined!", function(assert) {
    var bis = namespace.business;
    assert.ok(bis, "business namespace ain't null!");
    var run = bis.run;
    assert.ok(typeof run === 'function', "run is a function!");
    assert.ok(typeof run() === 'object', "run return true when executed!");
});
QUnit.test("Timer function", function(assert) {
    var t = new namespace.testTimer();
    var t1 = new namespace.testTimer(1);
    assert.equal(t.initTime(), Date.now(), "init time is the time value and should be NOW time.");
    assert.deepEqual(t.toModel(1), { h: 0, m: 0, s: 0, ms: 1 }, "it checks for 1 milisecond value");
    assert.deepEqual(t.toModel(6000), { h: 0, m: 0, s: 6, ms: 0 }, "it chekcs for 6 seconds value");
    assert.deepEqual(t.toModel(121), { h: 0, m: 0, s: 0, ms: 121 }, "it checks for 121ms");
    assert.deepEqual(t.toModel(12600000), { h: 3, m: 30, s: 0, ms: 0 }, "it cheks 3:30 it's 180+30=210m*60=12600s ");
    assert.deepEqual(t.toModel(86399999), { h: 23, m: 59, s: 59, ms: 999 }, "it cheks 23:59 it's 23*60=1380+59=1439m*60=86340s+59=86399s*1000+999=86399999 ");
    //assert.equal(t.toString(12960000), '60:60:60:60', "it's the string convertor check to show in button");
    //assert.ok(t.value(), 'result shouldn\'t be zero.');// it should be in a settimeout function
});
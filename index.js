var gTimer = {};
$(document).ready(function() {
  $("#chronometer").on("click", function() {
    if (this.dataset.state == "run") {
      this.dataset.state = "stop";
      setStudy($("#name").val(), $("#class").val(), gTimer.getInitTime());
      return void 1;
    }
    this.dataset.state = "run";
    var el = this;
    timerOn(this);
  });
});

function setStudy(coursename, classname, begin) {
  var model = new namespace.model({items: ["study"]});
  var study = model.study({
    name: coursename,
    class: classname,
    begin: begin,
    end: Date.now()
    //duration: gTimer.getPastTime(false)
  });
  $("#recordTable").append(study.toTableRow());
}
function timerOn(el){
  var timer = new window.namespace.bu.timer();
    gTimer = timer;
    function updateCornometer() {
      setTimeout(() => {
        el.innerText = timer.toString(timer.getPastTime(), {format: 'hh:mm:ss'});
        if (el.dataset.state == "run") updateCornometer();
      }, 1000);
    }
    updateCornometer();
}
(function(){
    namespace.model = new program();
    function program(){
        this.items={}

    }

    item = function(_name, _class, _s, _e){
        this.name = _name || null
        this.class = _class || null
        this.start = _s || Date.now
        this.end = _e || Date.now
    }
    classroom = function(_name, _teacher, _s, _e){
        this.name = _name || null
        this.teacher = _teacher || null
        this.start = _s || Date.now
        this.end = _e || Date.now
    }
    person = function(_name, _tel, _note){
        this.name = _name || null
        this.tel = _tel || null
        this.note = _note || null
    }
})();
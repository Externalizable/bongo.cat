var InstrumentEnum = {
    BONGO : 0,
    KEYBOARD : 1,
    MEOW: 3,
    CYMBAL: 4,
    MARIMBA: 5
}
var KeyEnum = {
    "A" : 1,
    "D" : 0,
    "1" : 1,
    "2" : 2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6,
    "7" : 7,
    "8" : 8,
    "9" : 9,
    "0" : 0,
    " " : -1,
    "C" : 1,
    "Q" : 1,
    "W" : 2,
    "E" : 3,
    "R" : 4,
    "T" : 5,
    "Y" : 6, //US
    "Z" : 6, //Germany
    "U" : 7,
    "I" : 8,
    "O" : 9,
    "P" : 0
}
var InstrumentPerKeyEnum = {
    "A" : InstrumentEnum.BONGO,
    "D" : InstrumentEnum.BONGO,
    "1" : InstrumentEnum.KEYBOARD,
    "2" : InstrumentEnum.KEYBOARD,
    "3" : InstrumentEnum.KEYBOARD,
    "4" : InstrumentEnum.KEYBOARD,
    "5" : InstrumentEnum.KEYBOARD,
    "6" : InstrumentEnum.KEYBOARD,
    "7" : InstrumentEnum.KEYBOARD,
    "8" : InstrumentEnum.KEYBOARD,
    "9" : InstrumentEnum.KEYBOARD,
    "0" : InstrumentEnum.KEYBOARD,
    " " : InstrumentEnum.MEOW,
    "C" : InstrumentEnum.CYMBAL,
    "Q" : InstrumentEnum.MARIMBA,
    "W" : InstrumentEnum.MARIMBA,
    "E" : InstrumentEnum.MARIMBA,
    "R" : InstrumentEnum.MARIMBA,
    "T" : InstrumentEnum.MARIMBA,
    "Y" : InstrumentEnum.MARIMBA, //US
    "Z" : InstrumentEnum.MARIMBA, //Germany
    "U" : InstrumentEnum.MARIMBA,
    "I" : InstrumentEnum.MARIMBA,
    "O" : InstrumentEnum.MARIMBA,
    "P" : InstrumentEnum.MARIMBA
}
var ClickKeyEquivalentEnum = {
    "1" : "A",
    "2" : " ",
    "3" : "D"
}
var pressed = [];
$(document).ready(function() {
    lowLag.init({'urlPrefix':'./sounds/'});
    lowLag.load(['bongo0.mp3','bongo0.wav'],'bongo0');
    lowLag.load(['bongo1.mp3','bongo1.wav'],'bongo1');
    lowLag.load(['keyboard1.mp3','keyboard1.wav'],'keyboard1');
    lowLag.load(['keyboard2.mp3','keyboard2.wav'],'keyboard2');
    lowLag.load(['keyboard3.mp3','keyboard3.wav'],'keyboard3');
    lowLag.load(['keyboard4.mp3','keyboard4.wav'],'keyboard4');
    lowLag.load(['keyboard5.mp3','keyboard5.wav'],'keyboard5');
    lowLag.load(['keyboard6.mp3','keyboard6.wav'],'keyboard6');
    lowLag.load(['keyboard7.mp3','keyboard7.wav'],'keyboard7');
    lowLag.load(['keyboard8.mp3','keyboard8.wav'],'keyboard8');
    lowLag.load(['keyboard9.mp3','keyboard9.wav'],'keyboard9');
    lowLag.load(['keyboard0.mp3','keyboard0.wav'],'keyboard0');
    lowLag.load(['meow.mp3','meow.wav'],'meow-1');
    lowLag.load(['cymbal.mp3','cymbal.wav'],'cymbal1');
    lowLag.load(['marimba1.mp3','marimba1.wav'],'marimba1');
    lowLag.load(['marimba2.mp3','marimba2.wav'],'marimba2');
    lowLag.load(['marimba3.mp3','marimba3.wav'],'marimba3');
    lowLag.load(['marimba4.mp3','marimba4.wav'],'marimba4');
    lowLag.load(['marimba5.mp3','marimba5.wav'],'marimba5');
    lowLag.load(['marimba6.mp3','marimba6.wav'],'marimba6');
    lowLag.load(['marimba7.mp3','marimba7.wav'],'marimba7');
    lowLag.load(['marimba8.mp3','marimba8.wav'],'marimba8');
    lowLag.load(['marimba9.mp3','marimba9.wav'],'marimba9');
    lowLag.load(['marimba0.mp3','marimba0.wav'],'marimba0');
});
Array.prototype.remove = function(el) {
    return this.splice(this.indexOf(el), 1);
}
$.wait = function(callback, ms) {
    return window.setTimeout(callback, ms);
}
$.play = function(instrument, key, state) {
    var instrumentName = Object.keys(InstrumentEnum).find(k => InstrumentEnum[k] === instrument).toLowerCase();
    var commonKey = KeyEnum[key];
    var paw = (instrument == InstrumentEnum.BONGO ? key : key <= 5 && key != 0 ? 0 : 1);
    var id = (instrument == InstrumentEnum.MEOW ? "#mouth" : '#' + (paw == 0 ? "l" : "r") + 'paw');
    if (state == true) {
        if (jQuery.inArray(commonKey, pressed) !== -1) {
            return;
        } else {
            pressed.push(commonKey);
        }
        if (instrument != InstrumentEnum.MEOW) {
            $(".instrument").each(function(index) {
              if ($(this).attr('id') === instrumentName) {
                $(this).css("visibility", "visible");
              } else {
                $(this).css("visibility", "hidden");
              }
            });
        }
        $.sound(instrumentName + key);
    } else {
        pressed.remove(commonKey);
    }
    if (instrument == InstrumentEnum.MEOW) {
        $('#mouth').css("background-image", "url('images/m" + (state === true ? "2" : "1") + ".png')");
    } else {
        $(id).css("background-image", "url('images/" + (paw == 0 ? "l" : "r") + (state === true ? "2" : "1") + ".png')");
    }
}
$.sound = function(filename) {
    lowLag.play(filename);
}
$(document).bind("contextmenu", function (e) {
    e.preventDefault();
});
$(document).ready(function() {
    function isTouch() {
        var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        var mq = function(query) {
        return window.matchMedia(query).matches;
        }
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            return true;
        }
        var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return mq(query);
    }
    if (isTouch()) {
        $.tap = function(e, keyboardEquivalent) {
            e.preventDefault();
            var instrument = InstrumentPerKeyEnum[keyboardEquivalent.toUpperCase()];
            var key = KeyEnum[keyboardEquivalent.toUpperCase()];
            if (instrument != undefined && key != undefined) {
                $.play(instrument, key, true);
                $.wait(function(){ $.play(instrument, key, false) }, (instrument == InstrumentEnum.MEOW ? 250 : 80));
            }
        }
        $("header").css("visibility", "hidden");
        $("#github").css("visibility", "hidden");
        $("#bongo-left").css("visibility", "visible").on("touchstart", function(e) { $.tap(e, "A") });
        $("#bongo-right").css("visibility", "visible").on("touchstart", function(e) { $.tap(e, "D") });
        $("#cymbal-left").css("visibility", "visible").on("touchstart", function(e) { $.tap(e, "C") });
        $("#piano-keys").css("visibility", "visible");
        $("#key1").on("touchstart", function(e) { $.tap(e, "1") });
        $("#key2").on("touchstart", function(e) { $.tap(e, "2") });
        $("#key3").on("touchstart", function(e) { $.tap(e, "3") });
        $("#key4").on("touchstart", function(e) { $.tap(e, "4") });
        $("#key5").on("touchstart", function(e) { $.tap(e, "5") });
        $("#key6").on("touchstart", function(e) { $.tap(e, "6") });
        $("#key7").on("touchstart", function(e) { $.tap(e, "7") });
        $("#key8").on("touchstart", function(e) { $.tap(e, "8") });
        $("#key9").on("touchstart", function(e) { $.tap(e, "9") });
        $("#key0").on("touchstart", function(e) { $.tap(e, "0") });
        $("#marimba-keys").css("visibility", "visible");
        $("#keyQ").on("touchstart", function(e) { $.tap(e, "Q") });
        $("#keyW").on("touchstart", function(e) { $.tap(e, "W") });
        $("#keyE").on("touchstart", function(e) { $.tap(e, "E") });
        $("#keyR").on("touchstart", function(e) { $.tap(e, "R") });
        $("#keyT").on("touchstart", function(e) { $.tap(e, "T") });
        $("#keyY").on("touchstart", function(e) { $.tap(e, "Y") });
        $("#keyU").on("touchstart", function(e) { $.tap(e, "U") });
        $("#keyI").on("touchstart", function(e) { $.tap(e, "I") });
        $("#keyO").on("touchstart", function(e) { $.tap(e, "O") });
        $("#keyP").on("touchstart", function(e) { $.tap(e, "P") });
        $("#meow").css("visibility", "visible").on("touchstart", function(e) { $.tap(e, " ") });
    }
});
$(document).on("mousedown mouseup", function (e) {
    var keyboardEquivalent = ClickKeyEquivalentEnum[e.which];
    if (keyboardEquivalent != undefined) {
        var instrument = InstrumentPerKeyEnum[keyboardEquivalent.toUpperCase()];
        var key = KeyEnum[keyboardEquivalent.toUpperCase()];
        if (instrument != undefined && key != undefined) {
            $.play(instrument, key, e.type === "mousedown");
        }
    }
});
$(document).on("keydown keyup", function (e) {
    var instrument = InstrumentPerKeyEnum[e.key.toUpperCase()];
    var key = KeyEnum[e.key.toUpperCase()];
    if (instrument != undefined && key != undefined) {
        $.play(instrument, key, e.type === "keydown");
    }
});

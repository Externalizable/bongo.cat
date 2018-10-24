var InstrumentEnum = {
    BONGO : 0,
    KEYBOARD : 1,
    MEOW: 3,
    CYMBAL: 4,
    MARIMBA: 5
}
var KeyEnum = {
    "-" : 1,
    "=" : 0,
    "*" : 1,
    "Z" : 0,
    "S" : 1,
    "X" : 2,
    "D" : 3,
    "C" : 4,
    "V" : 6,
    "G" : 7,
    "B" : 8,
    "H" : 9,
    "N" : 10,
    "J" : 11,
    "M" : 12,
    "," : 14,
    " " : -1,
    "Q" : 1,
    "W" : 2,
    "E" : 3,
    "R" : 4,
    "T" : 5,
    "Y" : 6,
    "U" : 7,
    "I" : 8,
    "O" : 9,
    "P" : 0
}
var InstrumentPerKeyEnum = {
    "-" : InstrumentEnum.BONGO,
    "=" : InstrumentEnum.BONGO,
    "*" : InstrumentEnum.CYMBAL,
    "Z" : InstrumentEnum.KEYBOARD,
    "S" : InstrumentEnum.KEYBOARD,
    "X" : InstrumentEnum.KEYBOARD,
    "D" : InstrumentEnum.KEYBOARD,
    "C" : InstrumentEnum.KEYBOARD,
    "V" : InstrumentEnum.KEYBOARD,
    "G" : InstrumentEnum.KEYBOARD,
    "B" : InstrumentEnum.KEYBOARD,
    "H" : InstrumentEnum.KEYBOARD,
    "N" : InstrumentEnum.KEYBOARD,
    "J" : InstrumentEnum.KEYBOARD,
    "M" : InstrumentEnum.KEYBOARD,
    "," : InstrumentEnum.KEYBOARD,
    " " : InstrumentEnum.MEOW,
    "W" : InstrumentEnum.MARIMBA,
    "Q" : InstrumentEnum.MARIMBA,
    "E" : InstrumentEnum.MARIMBA,
    "R" : InstrumentEnum.MARIMBA,
    "T" : InstrumentEnum.MARIMBA,
    "Y" : InstrumentEnum.MARIMBA,
    "U" : InstrumentEnum.MARIMBA,
    "I" : InstrumentEnum.MARIMBA,
    "O" : InstrumentEnum.MARIMBA,
    "P" : InstrumentEnum.MARIMBA
}
var ClickKeyEquivalentEnum = {
    "1" : "-",
    "2" : " ",
    "3" : "="
}
var pressed = [];
$(document).ready(function() {
    lowLag.init({'urlPrefix':'./sounds/'});
    lowLag.load(['bongo0.mp3','bongo0.wav'],'bongo0');
    lowLag.load(['bongo1.mp3','bongo1.wav'],'bongo1');
    lowLag.load(['1.mp3','1.wav'],'keyboard0');
    lowLag.load(['2.mp3','2.wav'],'keyboard1');
    lowLag.load(['3.mp3','3.wav'],'keyboard2');
    lowLag.load(['4.mp3','4.wav'],'keyboard3');
    lowLag.load(['6.mp3','6.wav'],'keyboard4');
    lowLag.load(['7.mp3','7.wav'],'keyboard6');
    lowLag.load(['8.mp3','8.wav'],'keyboard7');
    lowLag.load(['9.mp3','9.wav'],'keyboard8');
    lowLag.load(['10.mp3','10.wav'],'keyboard9');
    lowLag.load(['11.mp3','11.wav'],'keyboard10');
    lowLag.load(['12.mp3','12.wav'],'keyboard11');
    lowLag.load(['14.mp3','14.wav'],'keyboard12');
    lowLag.load(['15.mp3','15.wav'],'keyboard14');
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
        $("#bongo-left").css("visibility", "visible").on("touchstart", function(e) { $.tap(e, "-") });
        $("#bongo-right").css("visibility", "visible").on("touchstart", function(e) { $.tap(e, "=") });
        $("#cymbal-left").css("visibility", "visible").on("touchstart", function(e) { $.tap(e, "*") });
        $("#piano-keys").css("visibility", "visible");
        $("#keyZ").on("touchstart", function(e) { $.tap(e, "Z") });
        $("#keyS").on("touchstart", function(e) { $.tap(e, "S") });
        $("#keyX").on("touchstart", function(e) { $.tap(e, "X") });
        $("#keyD").on("touchstart", function(e) { $.tap(e, "D") });
        $("#keyC").on("touchstart", function(e) { $.tap(e, "C") });
        $("#keyV").on("touchstart", function(e) { $.tap(e, "V") });
        $("#keyG").on("touchstart", function(e) { $.tap(e, "G") });
        $("#keyB").on("touchstart", function(e) { $.tap(e, "B") });
        $("#keyH").on("touchstart", function(e) { $.tap(e, "H") });
        $("#keyN").on("touchstart", function(e) { $.tap(e, "N") });
        $("#keyJ").on("touchstart", function(e) { $.tap(e, "J") });
        $("#keyM").on("touchstart", function(e) { $.tap(e, "M") });
        $("#keyComma").on("touchstart", function(e) { $.tap(e, ",") });
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

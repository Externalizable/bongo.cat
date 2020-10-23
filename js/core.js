Array.prototype.remove = function(el) {
  return this.splice(this.indexOf(el), 1);
}
const InstrumentEnum = Object.freeze({
  BONGO: 0,
  KEYBOARD: 1,
  MEOW: 3,
  CYMBAL: 4,
  MARIMBA: 5,
  TAMBOURINE: 6,
  COWBELL: 7
})
const KeyEnum = Object.freeze({
  "A": 1,
  "D": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "0": 0,
  " ": 0,
  "C": 1,
  "Q": 1,
  "W": 2,
  "E": 3,
  "R": 4,
  "T": 5,
  "Y": 6, // QWERTY-Layout
  "Z": 6, // QWERTZ-Layout
  "U": 7,
  "I": 8,
  "O": 9,
  "P": 0,
  "B": 1,
  "F": 1
})
const InstrumentPerKeyEnum = Object.freeze({
  "A": InstrumentEnum.BONGO,
  "D": InstrumentEnum.BONGO,
  "1": InstrumentEnum.KEYBOARD,
  "2": InstrumentEnum.KEYBOARD,
  "3": InstrumentEnum.KEYBOARD,
  "4": InstrumentEnum.KEYBOARD,
  "5": InstrumentEnum.KEYBOARD,
  "6": InstrumentEnum.KEYBOARD,
  "7": InstrumentEnum.KEYBOARD,
  "8": InstrumentEnum.KEYBOARD,
  "9": InstrumentEnum.KEYBOARD,
  "0": InstrumentEnum.KEYBOARD,
  " ": InstrumentEnum.MEOW,
  "C": InstrumentEnum.CYMBAL,
  "Q": InstrumentEnum.MARIMBA,
  "W": InstrumentEnum.MARIMBA,
  "E": InstrumentEnum.MARIMBA,
  "R": InstrumentEnum.MARIMBA,
  "T": InstrumentEnum.MARIMBA,
  "Y": InstrumentEnum.MARIMBA, // QWERTY-Layout
  "Z": InstrumentEnum.MARIMBA, // QWERTZ-Layout
  "U": InstrumentEnum.MARIMBA,
  "I": InstrumentEnum.MARIMBA,
  "O": InstrumentEnum.MARIMBA,
  "P": InstrumentEnum.MARIMBA,
  "B": InstrumentEnum.TAMBOURINE,
  "F": InstrumentEnum.COWBELL
})
const ClickKeyEquivalentEnum = Object.freeze({
  "1": "A",
  "2": " ",
  "3": "D"
})
const TapKeyEquivalentEnum = Object.freeze({
  "tap-left": {
    "BONGO": ["A"]
  },
  "tap-right": {
    "BONGO": ["D"],
    "CYMBAL": ["C"],
    "TAMBOURINE": ["B"],
    "COWBELL": ["F"]
  },
  "tap-space": {
    "MEOW": [" "]
  },
  "tap-1": {
    "KEYBOARD": ["1"],
    "MARIMBA": ["Q"]
  },
  "tap-2": {
    "KEYBOARD": ["2"],
    "MARIMBA": ["W"]
  },
  "tap-3": {
    "KEYBOARD": ["3"],
    "MARIMBA": ["E"]
  },
  "tap-4": {
    "KEYBOARD": ["4"],
    "MARIMBA": ["R"]
  },
  "tap-5": {
    "KEYBOARD": ["5"],
    "MARIMBA": ["T"]
  },
  "tap-6": {
    "KEYBOARD": ["6"],
    "MARIMBA": ["Y", "Z"]
  },
  "tap-7": {
    "KEYBOARD": ["7"],
    "MARIMBA": ["U"]
  },
  "tap-8": {
    "KEYBOARD": ["8"],
    "MARIMBA": ["I"]
  },
  "tap-9": {
    "KEYBOARD": ["9"],
    "MARIMBA": ["O"]
  },
  "tap-0": {
    "KEYBOARD": ["0"],
    "MARIMBA": ["P"]
  }
})
const TapKeysPerLayerEnum = Object.freeze({
  "layer-bongo": ["tap-left", "tap-right"],
  "layer-keyboard": ["tap-keys"],
  "layer-meow": ["tap-space"],
  "layer-cymbal": ["tap-right"],
  "layer-marimba": ["tap-keys"],
  "layer-tambourine": ["tap-right"],
  "layer-cowbell": ["tap-right"]
})
const LayersPerInstrumentEnum = Object.freeze({
  "layer-bongo": InstrumentEnum.BONGO,
  "layer-keyboard": InstrumentEnum.KEYBOARD,
  "layer-meow": InstrumentEnum.MEOW,
  "layer-cymbal": InstrumentEnum.CYMBAL,
  "layer-marimba": InstrumentEnum.MARIMBA,
  "layer-tambourine": InstrumentEnum.TAMBOURINE,
  "layer-cowbell": InstrumentEnum.COWBELL
})
var pressed = [];
var currentLayer;
var allLayers = [];
for (var tapKeysPerInstrument of Object.values(TapKeysPerLayerEnum)) {
  allLayers.push(...tapKeysPerInstrument);
}
allLayers = [...new Set(allLayers)];
$(document).ready(function() {
  lowLag.init({
    'urlPrefix': '../sounds/',
    'debug': 'none'
  });
  $.load("bongo", 0, 1);
  $.load("keyboard", 0, 9);
  $.load("marimba", 0, 9);
  $.loadSimple("meow");
  $.loadSimple("cymbal");
  $.loadSimple("tambourine");
  $.loadSimple("cowbell");
  $.layers("layer-bongo");
  $("select#select-instrument").on("change", function() {
    $.layers($(this).val());
  });
});
$.loadSimple = function(file) {
  for (i = 0; i <= 1; i++) {
    lowLag.load([file + ".mp3", file + ".wav"], file + i);
  }
}
$.load = function(file, start, end) {
  for (i = start; i <= end; i++) {
    lowLag.load([file + i + ".mp3", file + i + ".wav"], file + i);
  }
}
$.wait = function(callback, ms) {
  return window.setTimeout(callback, ms);
}
$.play = function(instrument, key, state) {
  var instrumentName = Object.keys(InstrumentEnum).find(k => InstrumentEnum[k] === instrument).toLowerCase();
  var commonKey = KeyEnum[key];
  var id = "#" + (instrument == InstrumentEnum.MEOW ? "mouth" : "paw-" + ((instrument == InstrumentEnum.BONGO ? commonKey : commonKey <= 5 && commonKey != 0 ? 0 : 1) == 0 ? "left" : "right"));
  if (state == true) {
    if (jQuery.inArray(commonKey, pressed) !== -1) {
      return;
    }
    pressed.push(commonKey);
    if (instrument != InstrumentEnum.MEOW) {
      $(".instruments>div").each(function(index) {
        $(this).css("visibility", ($(this).attr("id") === instrumentName) ? "visible" : "hidden");
      });
    }
    lowLag.play(instrumentName + commonKey);
    $.layers(Object.keys(LayersPerInstrumentEnum).find(k => LayersPerInstrumentEnum[k] == instrument), true);
  } else {
    pressed.remove(commonKey);
  }
  $(id).css("background-position-x", (state ? "-800px" : "0"));
}
$.layers = function(selectedLayer) {
  if (selectedLayer !== currentLayer) {
    currentLayer = selectedLayer;
    var layers = TapKeysPerLayerEnum[selectedLayer];
    if (layers != undefined) {
      for (var layer of allLayers) {
        $("#" + layer).css("display", layers.includes(layer) ? "inline-block" : "none");
      }
      var instrument = LayersPerInstrumentEnum[selectedLayer];
      var instrumentName = Object.keys(InstrumentEnum).find(k => InstrumentEnum[k] === instrument).toLowerCase();
      if (instrument != InstrumentEnum.MEOW) {
        $(".instruments>div").each(function(index) {
          $(this).css("visibility", ($(this).attr("id") === instrumentName) ? "visible" : "hidden");
        });
      }
    }
    var layerPerKey = Object.keys(LayersPerInstrumentEnum);
    for (var i = 0; i < layerPerKey.length; i++) {
      if (layerPerKey[i] === selectedLayer) {
        $("select#select-instrument>option:eq(" + i + ")").prop("selected", true);
      }
    }
  }
}
$(document).bind("contextmenu", function(e) {
  e.preventDefault();
});
$(document).on("mousedown mouseup", function(e) {
  if (!window.matchMedia("(max-width: 769px)").matches && !$(e.target).is("a, a *")) {
    var keyboardEquivalent = ClickKeyEquivalentEnum[e.which];
    if (keyboardEquivalent != undefined) {
      var instrument = InstrumentPerKeyEnum[keyboardEquivalent.toUpperCase()];
      var key = KeyEnum[keyboardEquivalent.toUpperCase()];
      if (instrument != undefined && key != undefined) {
        $.play(instrument, key, e.type === "mousedown");
      }
    }
  }
});
$(document).on("keydown keyup", function(e) {
  e.preventDefault();
  var instrument = InstrumentPerKeyEnum[e.key.toUpperCase()];
  var key = KeyEnum[e.key.toUpperCase()];
  if (instrument != undefined && key != undefined) {
    $.play(instrument, key, e.type === "keydown");
  }
});
$(document).on("touchstart touchend", function(e) {
  if (e.target.classList.contains("layer")) {
    if (e.type === "touchstart") {
      $(e.target).addClass("highlight");
      $.layers(e.target.id, true);
    } else {
      $(e.target).removeClass("highlight");
    }
  } else {
    var instrument = LayersPerInstrumentEnum[currentLayer];
    if (instrument != undefined) {
      var keys = TapKeyEquivalentEnum[e.target.id];
      if (keys != undefined) {
        var instrumentName = Object.keys(InstrumentEnum).find(k => InstrumentEnum[k] === instrument);
        if (instrumentName != undefined && keys[instrumentName] != undefined) {
          for (var key of keys[instrumentName]) {
            if (key != undefined) {
              if (e.type === "touchstart") {
                $(e.target).addClass("highlight");
              } else {
                $(e.target).removeClass("highlight");
              }
              $.play(instrument, key, e.type === "touchstart");
            }
          }
        }
      }
    }
  }
});

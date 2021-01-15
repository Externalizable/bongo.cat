@keyframes wave {
  0%, 100% {
    transform: rotate(0)
  }

  20%, 60% {
    transform: rotate(-25deg)
  }

  40%, 80% {
    transform: rotate(10deg)
  }
}

html, body {
  overflow-x: hidden;
  margin: 0
}

body {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #fff;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px
}

header, footer {
  position: absolute;
  text-align: center;
  width: calc(100% - 20px);
  padding: 10px;
  z-index: 500
}

header a, footer a {
  color: #000;
  text-decoration: none
}

footer {
  bottom: 0
}

footer span {
  margin: 0 7px
}

hr {
  position: relative;
  display: block;
  width: 200%;
  height: 5px;
  background: #000;
  margin: 140px 0 0 -50%;
  border: none;
  transform: rotate(13.5deg);
  z-index: 10
}

a#github {
  z-index: 1000
}

svg#github {
  fill: #000;
  color: #fff;
  position: absolute;
  top: 0;
  border: 0;
  right: 0;
  z-index: 1000
}

svg#github:hover .octo-arm {
  animation: wave 560ms ease-in-out
}

select#select-instrument {
  position: relative;
  width: 240px;
  height: 60px;
  margin: 5px 2px;
  padding: 0 15px;
  font-size: 30px;
  color: inherit;
  text-align-last: center;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 0 0 4px rgba(0, 0, 0, 0.1);
  border: 0;
  border-radius: 5px;
  transition: all .2s ease-out;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  z-index: 1000
}

select#select-instrument option {
  color: inherit;
  background: #fff;
  border: 0;
  outline: none
}

#container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 450px
}

#container div {
  position: absolute;
  display: inline-block;
  top: 0;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat
}

#touch {
  display: none
}

#keys>div {
  display: inline-block;
  padding: 0 8px
}

#keys>div span {
  display: block;
  margin: 0 4px 8px
}

#taps, #layers {
  position: absolute;
  width: 100%;
  font-size: 30px;
  text-align: center;
  color: #fff;
  z-index: 1000
}

#layers {
  top: 0
}

#taps {
  bottom: 0;
  margin-bottom: 50px
}

#taps .tap {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 60px;
  margin: 5px 2px
}

#tap-left, #tap-right {
  width: calc(2.5 * 60px + 18px) !important;
  height: calc(2 * 60px + 10px) !important
}

#tap-space {
  width: calc(300px + 45px) !important;
  height: calc(2 * 60px + 10px) !important
}

.highlight {
  background: rgba(119, 158, 203, 0.6) !important;
  transition: none !important;
  transform: scale(0.95);
  transform-origin: 50% 50%
}

.octo-arm {
  transform-origin: 130px 106px
}

.key {
  display: inline-block !important;
  min-width: 35px;
  height: 35px;
  padding: 4px 0 0 6px;
  background: #f5f5f5;
  border: 2px solid #b3b3b3;
  border-radius: 6px;
  box-shadow: inset -6px -4px 0 0 #ccc;
  text-align: left;
  font-size: 15px
}

.key-wide {
  min-width: 135px !important
}

.tap {
  background: rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 0 0 4px rgba(0, 0, 0, 0.1);
  width: 60px;
  height: 135px;
  border-radius: 5px;
  text-align: center;
  transition: all .2s ease-out;
  z-index: 1000
}

.tap span {
  display: block;
  position: relative;
  font-size: 30px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  pointer-events: none
}

.cat div {
  background-position-y: 0;
  background-position-x: 0
}

.cat>#head {
  background-image: url(../images/cat.png);
  z-index: 10
}

.cat>#mouth {
  background-image: url(../images/mouth.png);
  z-index: 20
}

.cat>#paw-left {
  background-image: url(../images/paw-left.png);
  z-index: 30
}

.cat>#paw-right {
  background-image: url(../images/paw-right.png);
  z-index: 30
}

.instruments {
  z-index: 20
}

.instruments>#bongo, #layer-bongo {
  background-image: url(../images/bongo.png)
}

.instruments>#keyboard, #layer-keyboard {
  background-image: url(../images/keyboard.png)
}

.instruments>#cymbal, #layer-cymbal {
  background-image: url(../images/cymbal.png)
}

.instruments>#marimba, #layer-marimba {
  background-image: url(../images/marimba.png)
}

.instruments>#tambourine, #layer-tambourine {
  background-image: url(../images/tambourine.png)
}

.instruments>#cowbell, #layer-cowbell {
  background-image: url(../images/cowbell.png)
}

.instruments>#keyboard, .instruments>#cymbal, .instruments>#marimba, .instruments>#tambourine, .instruments>#cowbell {
  visibility: hidden
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #000 !important;
    color: #fff !important
  }

  header a, footer a {
    color: #fff !important
  }

  hr {
    background: #fff !important
  }

  svg#github {
    fill: #fff !important;
    color: #000 !important
  }

  .key {
    background: #333;
    border: 2px solid #252525;
    box-shadow: inset -6px -4px 0 0 #1b1b1b
  }

  select#select-instrument, .tap {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: inset 0 0 0 4px rgba(255, 255, 255, 0.1)
  }

  select#select-instrument option {
    background: #000
  }

  .tap span {
    text-shadow: none
  }

  .cat div {
    background-position-y: -450px
  }

  .cc-window {
    border: 1px solid rgba(255, 255, 255, 0.2) !important
  }
}

@media (prefers-reduced-motion: reduce) {
  svg#github:hover .octo-arm {
    animation: none !important
  }

  select#select-instrument, .tap {
    transition: none !important
  }

  .highlight {
    transform: scale(1) !important
  }
}

@media only screen and (max-width: 769px) {
  body {
    font-size: 13px
  }

  a#github {
    visibility: hidden
  }

  #container {
    transform: scale(0.6, 0.6) translate(-50%, -50%);
    transform-origin: top left
  }
}

@media only screen and (pointer: coarse) {
  header {
    visibility: hidden
  }

  #touch {
    display: block
  }
}
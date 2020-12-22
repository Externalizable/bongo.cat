import '../style/style.css'
import $ from 'jquery'
import cookieConsent from './modules/cookieConsent'
import core from '../js/core.js'

window.addEventListener("load", function() {
    cookieConsent() 
    this.window.$ = $   
});


if (!window.console) console = {log: function() {}};

var lowLag = new function(){
	this.someVariable = undefined;
	this.showNeedInit = function(){ lowLag.msg("lowLag: you must call lowLag.init() first!"); }

	this.load = this.showNeedInit;
	this.play = this.showNeedInit;

	this.useSuspension = false;
	this.suspendDelay = 10000; // ten seconds
	this.suspendTimeout = null;
	this.suspended = false;

	this.audioTagTimeToLive = 5000;

	this.sm2url = 'sm2/swf/';

	this.soundUrl = "";

	this.debug = "console";

	this.divLowLag = null;
	this.divDebug = null;
	
	this.createElement = function(elemType,attribs){
		 var elem = document.createElement(elemType);
		 if(attribs){
			for(var key in attribs){
				elem.setAttribute(key,attribs[key]);
			}
		 }
		 return elem;
	};
	this.safelyRemoveElement = function(elem){
		if(elem) elem.parentNode.removeChild(elem);
	};
	this.safelyRemoveElementById = function(id){
		this.safelyRemoveElement(document.getElementById(id));
	};
	
	this.ready = function ready(fn) {
		if (document.readyState != 'loading'){
		  fn();
		} else if (document.addEventListener) {
		  document.addEventListener('DOMContentLoaded', fn);
		} else {
		  document.attachEvent('onreadystatechange', function() {
		    if (document.readyState != 'loading')
		      fn();
		  });
		}
	};
	

	this.init = function(config){
		//var divLowLag = document.getElementById("lowLag");
		this.safelyRemoveElement(this.divLowLag);
		this.divLowLag = this.createElement("div",{"id":"lowLag"});
		document.body.appendChild(this.divLowLag);
		
	
		
		var force = undefined;
		if(config != undefined){
			if(config['force'] != undefined){
				force = config['force'];
			} 
			if(config['audioTagTimeToLive'] != undefined){
				lowLag.audioTagTimeToLive = config['audioTagTimeToLive'];
			} 
			if(config['sm2url'] != undefined){
				lowLag.sm2url = config['sm2url'];
			} 
			if(config['urlPrefix'] != undefined){
				lowLag.soundUrl = config['urlPrefix'];
			} 
			if(config['debug'] != undefined){
				lowLag.debug = config['debug'];
			} 
			if (config['useSuspension'] != undefined) {
				lowLag.useSuspension = config['useSuspension'];
			}
			if (config['suspendDelay'] != undefined) {
				lowLag.suspendDelay = config['suspendDelay'];
			}
		}
		
		if(lowLag.debug == "screen" || lowLag.debug == "both"){
			lowLag.divDebug = lowLag.createElement("pre");
			lowLag.divLowLag.appendChild(lowLag.divDebug);
			
		}
		

		var format = "sm2";
		if(force != undefined) format = force;
		else {
			if(window.AudioContext || window.webkitAudioContext ) format = 'audioContext';
			else if(navigator.userAgent.indexOf("Firefox")!=-1) format = 'audioTag';
		}
		switch(format){
			case 'audioContext':

				this.msg("init audioContext");
				this.load= this.loadSoundAudioContext;
				this.play = this.playSoundAudioContext;
				if(!this.audioContext)
					this.audioContext = new(window.AudioContext || window.webkitAudioContext)();
				if (this.useSuspension &= ('suspend' in lowLag.audioContext && 'onended' in lowLag.audioContext.createBufferSource())) {
					this.playingQueue = [];
					this.suspendPlaybackAudioContext();
				}
			break;
			case 'audioTag':
				this.msg("init audioTag");
				this.load= this.loadSoundAudioTag;
				this.play = this.playSoundAudioTag;
			break;

			case 'sm2':
				this.msg("init SoundManager2");

				this.load = this.loadSoundSM2;
				this.play = this.playSoundSM2;
				lowLag.msg("loading SM2 from "+lowLag.sm2url);
				soundManager.setup({ url: lowLag.sm2url, useHighPerformance:true, 
					onready:lowLag.sm2Ready , debugMode: true})


			break;

		}		


	}
	this.sm2IsReady = false;
//sm2 has a callback that tells us when it's ready, so we may need to store
//requests to loadsound, and then call sm2 once it has told us it is set.
	this.sm2ToLoad = [];

	this.loadSoundSM2 = function(url,tag){
		if(lowLag.sm2IsReady){
			lowLag.loadSoundSM2ForReals(url,tag);
		} else {
			lowLag.sm2ToLoad.push([url,tag]);
		}
	}

	this.loadSoundSM2ForReals = function(urls,ptag){
		var tag = lowLag.getTagFromURL(urls,ptag);
		lowLag.msg('sm2 loading '+urls+' as tag ' + tag);
		var urls = lowLag.getURLArray(urls); //coerce
		for(var i = 0; i < urls.length; i++){
			var url = lowLag.soundUrl + urls[i];
			urls[i] = url;
		}

		soundManager.createSound({
			id: tag,
			autoLoad: true,
			url: urls
		});
	};

	this.sm2Ready = function(){
		lowLag.sm2IsReady = true;
		for(var i = 0 ; i < lowLag.sm2ToLoad.length; i++){
			var urlAndTag = lowLag.sm2ToLoad[i];
			lowLag.loadSoundSM2ForReals(urlAndTag[0],urlAndTag[1]);
		}
		lowLag.sm2ToLoad = [];
	}

	this.playSoundSM2 = function(tag){
		lowLag.msg("playSoundSM2 "+tag);

		soundManager.play(tag);
	}



//we'll use the tag they hand us, or else the url as the tag if it's a single tag,
//or the first url 
	this.getTagFromURL = function(url,tag){
		if(tag != undefined) return tag;
		return lowLag.getSingleURL(url);
	}
	this.getSingleURL = function(urls){
		if(typeof(urls) == "string") return urls;
		return urls[0];
	}
//coerce to be an array
	this.getURLArray = function(urls){
		if(typeof(urls) == "string") return [urls];
		return urls;
	}




this.audioContextPendingRequest = {};


	this.audioContext = undefined;
	this.audioBuffers = {};

	this.loadSoundAudioContext = function(urls,tag,urlPrefix){ //urlPrefix is only set when called recursively
		if(!urlPrefix)// save the urlPrefix because lowLag.soundUrl my get overwritten if 1) chrome's async AudioContext is called and 2) the user tries to load more than one sound
			urlPrefix=lowLag.soundUrl;
		var url = lowLag.getSingleURL(urls);
		var tag = lowLag.getTagFromURL (urls,tag);
		lowLag.msg('webkit/chrome audio loading '+ urlPrefix +url+' as tag ' + tag);
		var request = new XMLHttpRequest();
		request.open('GET', urlPrefix + url, true);
		request.responseType = 'arraybuffer';

		// Decode asynchronously
		request.onload = function() {
		  var retVal = lowLag.audioContext.decodeAudioData(request.response, successLoadAudioFile, errorLoadAudioFile);
			//Newer versions of audioContext return a promise, which could throw a DOMException
			if(retVal && typeof retVal.then == 'function'){
				retVal.then(successLoadAudioFile).catch(function(e) {
					errorLoadAudioFile(e);
					urls.shift(); //remove the first url from the array
					if(urls.length>0){
						lowLag.loadSoundAudioContext(urls,tag,urlPrefix); //try the next url
					}
				});
			}
		};
		request.send();

		function successLoadAudioFile (buffer) {
			lowLag.audioBuffers[tag] = buffer;				
			if(lowLag.audioContextPendingRequest[tag]){ //a request might have come in, try playing it now
				lowLag.playSoundAudioContext(tag);
			}
		}

		function errorLoadAudioFile (e){
			lowLag.msg("Error loading webkit/chrome audio: "+e);	
		}
	}

	this.playSoundAudioContext= function(tag){
		lowLag.msg("playSoundAudioContext "+tag);
		var buffer = lowLag.audioBuffers[tag];
		if(buffer == undefined) { //possibly not loaded; put in a request to play onload
			lowLag.audioContextPendingRequest[tag] = true;
			return;
		}
		var context = lowLag.audioContext;
		if (this.useSuspension && this.suspended) {
			this.resumePlaybackAudioContext(); // Resume playback
		}
		var source = context.createBufferSource(); // creates a sound source
		source.buffer = buffer;                    // tell the source which sound to play
		source.connect(context.destination);       // connect the source to the context's destination (the speakers)
		if (typeof(source.noteOn) == "function") {
			source.noteOn(0);                          // play the source now, using noteOn
		} else {
			if (this.useSuspension) {
				this.playingQueue.push(tag);
				source.onended = function(e) {
					lowLag.hndlOnEndedAudioContext(tag, e);
				}
			}
			source.start();				// play the source now, using start
		}
	}

	this.hndlOnEndedAudioContext = function(tag, e){
		for (var i = 0; i < this.playingQueue.length; i++ ) {
			if (this.playingQueue[i] == tag) {
				this.playingQueue.splice(i,1);
				break;
			}
		}
		if (!this.playingQueue.length) {
			this.suspendPlaybackAudioContext();
		}
	}

	this.resumePlaybackAudioContext = function(){
		this.audioContext.resume();
		this.suspended = false;
	}

	this.suspendPlaybackAudioContext = function(){
		if (this.suspendTimeout) {
			clearTimeout(this.suspendTimeout);
		}
		this.suspendTimeout = setTimeout(function(){
			lowLag.audioContext.suspend();
			lowLag.suspended = true;
			lowLag.suspendTimeout = null;
		}, this.suspendDelay);
	}







	this.audioTagID = 0;
	this.audioTagNameToElement = {};

	this.loadSoundAudioTag = function(urls,tag){
		var id = "lowLagElem_"+lowLag.audioTagID++;

		var tag = lowLag.getTagFromURL(urls,tag);
		
		var urls = lowLag.getURLArray(urls);


		lowLag.audioTagNameToElement[tag] = id;

		lowLag.msg('audioTag loading '+urls+' as tag ' + tag);
		var audioElem = this.createElement("audio",{"id":id, "preload":"auto", "autobuffer":"autobuffer"})
		
		for(var i = 0; i < urls.length; i++){
			var url = urls[i];
			var type = "audio/"+lowLag.getExtension(url);
			var sourceElem = this.createElement("source",{"src":lowLag.soundUrl+url,"type":type});
			audioElem.appendChild(sourceElem);
		}
		
		document.body.appendChild(audioElem);
	}

	this.playSoundAudioTag = function(tag){
		lowLag.msg("playSoundAudioTag "+tag);

		var modelId = lowLag.audioTagNameToElement[tag];
		var cloneId = "lowLagCloneElem_"+lowLag.audioTagID++;
		
		var modelElem = document.getElementById(modelId);
		var cloneElem = modelElem.cloneNode(true);
		cloneElem.setAttribute("id",cloneId);
		this.divLowLag.appendChild(cloneElem);
		lowLag.msg(tag);
		if(lowLag.audioTagTimeToLive != -1){
			setTimeout(function(){
					lowLag.safelyRemoveElement(cloneElem);
				},lowLag.audioTagTimeToLive);
		}
		cloneElem.play();
		
	}


	this.getExtension = function(url){
		return url.substring(url.lastIndexOf(".")+1).toLowerCase();

	}


	this.msg = function(m){
		m = "-- lowLag "+m;
		if(lowLag.debug == 'both' || lowLag.debug == 'console'){
			console.log(m);
		}
		if(lowLag.divDebug){
			lowLag.divDebug.innerHTML += m+"\n";			
		}
	}




}
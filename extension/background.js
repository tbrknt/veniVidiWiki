(function() {
	if(typeof(browser) === "undefined"){ // if not in firefox
		browser = chrome;
	}
	var addZerotoWiki = function (currentUrl){
		function extractBaseHostname(url, cb){
			var hostname;
			var urlIndex;
			// check for protocol
			if(url.indexOf('://') > -1){
				urlIndex = 2;
			}else{
				urlIndex = 0;
			}
			var urlParts = url.split('/');
			hostname = urlParts[urlIndex];

			var hostnameParts = hostname.split('.');
			var hostnamePartsLen = hostnameParts.length;
			var hostnameIndex;
			// check for subdomains
			if(hostnamePartsLen > 2){
				// country code top level domain check such as .co.uk
				if(hostnameParts[hostnamePartsLen-2].length == 2 && hostnameParts[hostnamePartsLen-1].length == 2){
					hostnameIndex = hostnamePartsLen-3;
				}else{
					hostnameIndex = hostnamePartsLen-2;
				}
			}else{
				hostnameIndex = 0;
			}
			var baseHostname = hostnameParts[hostnameIndex];
			if(baseHostname === 'wikipedia'){
				//reconstructing url
				hostnameParts[hostnameIndex] = '0wikipedia';
				hostname = hostnameParts.join('.');
				urlParts[urlIndex] = hostname;
				url = urlParts.join('/');
			}
			return url;
		}
		return extractBaseHostname(currentUrl);
	}

	// getting the initial state of the option
	var addZeroActive = true;
	browser.storage.local.get({
		addZeroActive: true
	}, function(items) {
		addZeroActive = items.addZeroActive;
		//console.debug("Getting from storage: "+addZeroActive);
		// messageListener for popup
		browser.runtime.onMessage.addListener(function(request,sender,sendResponse){
			debugger;
			if(request.subject === "askAddZeroActive"){	// setting the switch based on the initial state
				//console.debug("Sending to popup: "+addZeroActive);
				sendResponse(addZeroActive);
			}else if(request.subject === "setAddZeroActive"){	// updating option based on switch
				//console.debug("Getting from popup: "+addZeroActive);
				browser.storage.local.set({
					addZeroActive: request.addZeroActive
				}, function() { 
					addZeroActive = request.addZeroActive;
				});
			}
		});
	});



	//console.debug("helloooo");
	browser.webRequest.onBeforeRequest.addListener(function(details) {
		debugger;
		var reqUrl = details.url;
		// if the feature is enabled add 0
		//console.debug("Checking for request: "+addZeroActive);
		if(addZeroActive){
			reqUrl = addZerotoWiki(reqUrl);
			return {redirectUrl: reqUrl};
		}else{	// do not interfere
			return {cancel:false};
		}
	},
		{urls: ["*://*.wikipedia.org/*"], types: ["main_frame"]}, 
		["blocking"]
	);
})();

(function() {
	function decode_URI(s) {
	  return decodeURIComponent(escape(s));
	}

	// decode "URL and Filename safe" Base 64 string
	function decode_base64url(s){
		// replaces base64url specific characters with their corresponding characters in base64
		s = s.replace(/[-_]/g, function(ch) { return ch == '-' ? '+' : '/'});	
		return decode_URI(atob(s));
	}

	// fixes table of content (toc) anchors
	var tocElem = document.getElementById("toc");
	if(tocElem !== null){
		var aElems = tocElem.getElementsByTagName('a');
		for(var i=0; i<aElems.length; i++){
			var href = aElems[i].href;
			var hashedURL = href.split('?')[1].split('=')[1];
			var decodedURL = decode_base64url(hashedURL);
			var decodedAnchor = decodedURL.split('#')[1];
			aElems[i].href='#'+decodedAnchor;
		}
	}

	// fixes reference anchors
	var refElems = document.getElementsByClassName("reference");
	for(var i=0; i<refElems.length; i++){
		var refAElems = refElems[i].getElementsByTagName('a');
		for(var j=0; j<refAElems.length; j++){
			var href = refAElems[j].href;
			var hashedURL = href.split('?')[1].split('=')[1];
			var decodedURL = decode_base64url(hashedURL);
			var decodedAnchor = decodedURL.split('#')[1];
			refAElems[j].href='#'+decodedAnchor;
		}
	}

    // Expose to global
	// window['variableName'] = variableName;
})();


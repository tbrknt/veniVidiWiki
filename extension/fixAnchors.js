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
	var supElems = document.getElementsByTagName("sup");
	for(var i=0; i<supElems.length; i++){
		var supAElems = supElems[i].getElementsByTagName('a');
		for(var j=0; j<supAElems.length; j++){
			var href = supAElems[j].href;
			var hashedURL = href.split('?')[1].split('=')[1];
			var decodedURL = decode_base64url(hashedURL);
			var decodedAnchor = decodedURL.split('#')[1];
			supAElems[j].href='#'+decodedAnchor;
		}
	}
    // Expose to global
	// window['variableName'] = variableName;
})();


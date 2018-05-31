(function() {
	if(typeof(browser) === "undefined"){ // if not in firefox
		browser = chrome;
	}
	function informBackground(e){
		var addZeroActive = e.target.checked;
		//console.debug("Informing to Background: "+addZeroActive);
		browser.runtime.sendMessage({subject: "setAddZeroActive", addZeroActive: addZeroActive},
	        function (response) {});
	}
	// Restores checkbox state using the preferences
	// stored in browser.storage.local.
	function restore_options() {
		browser.runtime.sendMessage({subject: "askAddZeroActive"}, function(response){
			debugger;
			//console.debug("Restored from Background: "+response);
			updateElements(response);
			document.getElementById('addZeroActive').addEventListener('change', informBackground);
		});
	}

	function updateElements(isActive){
		document.getElementById('addZeroActive').checked = isActive;	
	}

	document.addEventListener('DOMContentLoaded', restore_options);
})();


(function () {
    'use strict';

    var serviceId = 'deviceReady';

    angular.module('app').factory(serviceId, [deviceReady]);

    function deviceReady() {
        // Define the functions and properties to reveal.
    	return function (done) {
    		if (typeof window.cordova === 'object') {
    			document.addEventListener('deviceready', function () {
    				done();
    			}, false);
    		} else {
    			done();
    		}
    	};

        //#region Internal Methods        

        //#endregion
    }
})();
(function () {
    'use strict';
    
    var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',        // animations
        'ngRoute',          // routing
        'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)
		'ngTouch',

        // Custom modules 
        'common',           // common functions, logger, spinner
        'common.bootstrap' // bootstrap dialog wrapper functions

        // 3rd Party Modules
        //'ui.bootstrap'      // ui-bootstrap (ex: carousel, pagination, dialog)
    ]);
    
    // Handle routing errors and success events
    app.run(['$route', 'deviceReady', 'common', function ($route, deviceReady, common) {
    	// Include $route to kick start the router.
    	var logSuccess = common.logger.getLogFn('app', 'success');
    	deviceReady(function () {
    		logSuccess('Angular loaded!', null, true);
    	});

    }]);        
})();
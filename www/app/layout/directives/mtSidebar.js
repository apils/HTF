(function() {
    'use strict';

    // TODO: replace app with your module name
    angular.module('app').directive('mtSidebar', [mtSidebar]);
    
    function mtSidebar () {
        // Usage:
        // 
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'A',
			scope: {
				navbarCollapsed : '='
			},
			controller: 'sidebar',
			controllerAs: 'sb',
            templateUrl: 'app/layout/sidebar.html'
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

})();
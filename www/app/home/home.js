(function () {
    'use strict';
    var controllerId = 'home';
    angular.module('app').controller(controllerId, ['common', 'datacontext', home]);

    function home(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Hot Towel Angular',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
	    vm.accountTypes = [];
        vm.accounts = [];
        vm.title = 'Home';

        activate();

        function activate() {
        	var promises = [getAccounts(), getAccountTypes()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Home View'); });
        }

        function getAccounts() {
        	return datacontext.getAccounts().then(function (data) {
                return vm.accounts = data;
            });
        }

        function getAccountTypes() {
        	return datacontext.getAccountTypes().then(function (data) {
        		return vm.accountTypes = data;
        	});
        }


        
    }
})();
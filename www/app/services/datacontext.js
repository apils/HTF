(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', datacontext]);

    function datacontext(common) {
    	var $q = common.$q;

    	var client;
    	var datastoreManager;
    	var logSuccess = common.logger.getLogFn('app', 'success');
    	var logError = common.logger.getLogFn('app', 'error');

        var service = {
        	getTransactions: getTransactions,
        	getAccountTypes: getAccountTypes,
            getAccounts: getAccounts
        };

	    activate();

	    return service;

	    function activate() {

		    client = new Dropbox.Client({ key: 'i8sa3ua7uke9af1' });

		    // Try to finish OAuth authorization.
		    client.authenticate({ interactive: false }, function(error) {
			    if (error) {
				    logError('Dropbox authentication failed!', error, true);
			    }
		    });

		    if (client.isAuthenticated()) {
			    // Client is authenticated. Display UI.
			    logSuccess('Dropbox authenticated!', null, true);
		    }

		    datastoreManager = client.getDatastoreManager();
		    datastoreManager.createDatastore(function (error, datastore) {
		    	if (error) {
		    		logError('Error opening default datastore: ' + error, true);
		    	}

		    	// Now you have a datastore. The next few examples can be included here.
		    	var accountsTable = datastore.getTable('accounts');
		    	var account = accountsTable.insert({
		    		name: 'Nationwide Joint Account',
		    		type: 'BankAccount',
		    		balance: 2310,
		    		number: '12345678',
		    		currency: '$',
		    		description: 'Carla and Alex Joint Account',
		    		created: new Date()
		    	});
		    });
	    }


	    function getAccounts() {
        	var accounts = [
			{ name: 'Nationwide Joint Account', type: 'BankAccount', balance: 2310, number: '12345678', currency: '$', description: 'Carla and Alex Joint Account' },
			{ name: 'Carla Co-op', type: 'BankAccount', balance: 123.45, number: '98769876', currency: '&pound;', description: 'Carla\'s own account' },
			{ name: 'George Pocket Money', type: 'BankAccount', balance: 8752, number: '', currency: '&euro;', description: 'George\'s pocket money account' },
			{ name: 'Tesco Credit Card', type: 'CreditCard', balance: 3242, number: '1234567890123456', currency: '&pound;', description: 'Tesco Bank' },
			{ name: 'Nationwide CC', type: 'CreditCard', balance: 112, number: '9988776655443322', currency: '$', description: 'Joint Nationwide CC' },
			{ name: 'Car Loan', type: 'Loan', balance: 827, number: '13964', currency: '&euro;', description: 'Credit Plus Loan for £10,000' }
        	];
        	return $q.when(accounts);
        }

        function getAccountTypes() {
        	var accountTypes = [
				{ title: 'Bank Accounts', type: 'BankAccount', icon: 'fa-comments', cssType: 'panel-primary' },
				{ title: 'Credit Cards', type: 'CreditCard', icon: 'fa-tasks', cssType: 'panel-green' },
        		{ title: 'Loans', type: 'Loan', icon: 'fa-shopping-cart', cssType: 'panel-yellow' },
				{ title: 'Mortgages', type: 'Mortgage', icon: 'fa-support', cssType: 'panel-red' }
        	];
	        return $q.when(accountTypes);

        }

        function getTransactions() {
            var transactions = [
                { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
                { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
                { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
                { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
                { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
                { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
                { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
            ];
            return $q.when(transactions);
        }
    }
})();
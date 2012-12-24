define(function (require){

	var Models = {};

	Models.User = Backbone.Model.extend({
		urlRoot: '/api/kazifasta',
		defaults: {type: 'user'},
		initialize: function (){ console.log('New user: '+this);}
	});
	Models.Users = Backbone.Collection.extend({model: Models.User});
	
	Models.Employee = Backbone.Model.extend({
		urlRoot: '/api/kazifasta',
		defaults: {type: 'employee'},
		initialize: function (){ console.log('New employee: '+this);}
	});
	Models.Employees = Backbone.Collection.extend({model: Models.Employee});
	
	Models.Employer = Backbone.Model.extend({
		urlRoot: '/api/kazifasta',
		defaults: {type: 'employer'},
		initialize: function (){ console.log('New employee: '+this);}
	});
	Models.Employers = Backbone.Collection.extend({model: Models.Employer});
	
	return Models;
});
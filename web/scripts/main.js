(function () {
	// subclass the standard backbone model
	var ComingSoonModel = Backbone.Model.extend({
		// the root url of our RESTful API
		urlRoot: '/api/kazifasta',
		// sensible default model values
		// we often override these in model instances
		defaults: {
			type: 'coming soon email',
			email: '',
			timestamp: 0
		}
	});

	// subclass the standard marionette view
	var ComingSoonForm = Backbone.Marionette.ItemView.extend({
		// load an html template for this view
		template: '#template-coming-soon-form',

		// react to DOM events
		events: {
			'submit form': 'onSubmit'
		},

		onSubmit: function (event) {
			// stop default event handling (i.e. reloading the page on a form submission)
			event.stopPropagation();
			event.preventDefault();
			// update our model and save it to the database
			this.model.save({
				email: this.$('input[name=email]').val(),
				timestamp: (new Date()).valueOf()
			});
			// trigger a custom event (publisher in the pub/sub pattern)
			this.options.vent.trigger('show:thanks');
		}
	});

	// subclass the standard marionette view
	var ComingSoonThankYou = Backbone.Marionette.ItemView.extend({
		// load an html template for this view
		template: '#template-coming-soon-thanks',

		// react to DOM events
		events: {
			'click a.reset': 'onReset'
		},

		onReset: function (event) {
			// stop default event handling (i.e. navigating to the link src)
			event.stopPropagation();
			event.preventDefault();
			// trigger a custom event (publisher in the pub/sub pattern)
			this.options.vent.trigger('show:form');
		}
	});

	$(document).ready(function () {
		// a singleton application instance acts as the controller for our MVC architecture
		var Application = new Backbone.Marionette.Application();
		Application.addRegions({
			region_content: 'body > section.content'
		});

		// react to custom view events (subscriber in the pub/sub pattern)
		// this is known as the "observer pattern", or the "pub/sub model" (for event publisher/suscriber)
		// this pattern is commonly used in JavaScript to separate controller and view logic
		Application.on('show:form', function () {
			// dynamically create a view
			var view = new ComingSoonForm({
				model: new ComingSoonModel(),
				vent: Application
			});
			// Application.region.show will cleanly close down the old view and display the new one
			Application.region_content.show(view);
		});
		Application.on('show:thanks', function () {
			var view = new ComingSoonThankYou({
				vent: Application
			});
			Application.region_content.show(view);
		});

		// show first view
		Application.trigger('show:form');
	});
})();
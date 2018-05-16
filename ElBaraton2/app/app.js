(function(app){
	app.AppPipe = ng.core
		.Pipe({
			name: "customSeparator"
		})
		.Class({
			constructor: function() {

			},
			transform: function(v, args) {
				return v.join(args[0]);
			}
		})

	app.UserComponent = ng.core
		.Component({
			selector: "users",
			inputs: ["data"],
			templateUrl: "app/users.html"
		})
		.Class({
			constructor: function() {

			}
		})

	app.AppComponent = ng.core
		.Component({
			selector: "app",
			pipes: [app.AppPipe],
			directives: [app.UserComponent],
			template:
			"<h1>El Baraton</h1><p>{{ name }}</p>" +
			"<ul>" +
				"<li *ngFor='#user of users'>{{ user }}</li>" +
			"</ul>" +
			"<users [data]='users'></users>" +
			"<p>{{ users | customSeparator:',' }}</p>" +
			"<input type='text' [(ngModel)]='name'>" +
			"<p>{{ name }}</p>"
		})
		.Class({
			constructor: function() {
				this.name = "Iparra";
				this.users = ["user1", "user2", "user3"]
			}
		})
})(window.app || (window.app = {}))
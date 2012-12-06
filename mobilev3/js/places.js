/**
 * @author Jamie Bate
 */

var app = app || {};

$( function( $ ) {

	var Place = Backbone.Model.extend({
		
		defaults: {
			id:0,
			sid:0,
			updated_at : '',
			name: '',
			description: '',
			address: '',
			distance: 0,
			latitude: 0,
			longitude: 0,
			todousers: [],
			recommendedusers: [],
			canRemoveRecommended:false,
			canRemoveTodo:false
		},
		
		urlRoot: "/api/index.php/place.json",
		
		initialize: function() {
			
			var self = this;
			
			this.todousers = new RelatedUserList(this.get('todousers'));
			this.todousers.url = function () {
				return self.urlRoot + '/todousers/'+self.get('sid');
			};
			
			this.recommendedusers = new RelatedUserList(this.get('recommendedusers'));
			this.recommendedusers.url = function () {
				return self.urlRoot + '/recommendedusers/'+self.get('sid');
			};
			
		}

	});

	var PlaceList =  Backbone.Collection.extend({
		locationOfPlace: "",
		typeOfPlace: "",
		model : Place,
		initialize : function() {
			this.storage = new Offline.Storage('places', this, {
				autoPush:true
			} );
		},
		url: function () {

			var placesUrl = '/api/index.php/place.json';

			if(this.locationOfPlace=="" && this.typeOfPlace=="") {
				return placesUrl;
			} else {

				placesUrl += '/filter/locationfilter='+this.locationOfPlace;

				if(this.typeOfPlace) {
					placesUrl  += '&typefilter='+this.typeOfPlace;
				}

				return placesUrl;
			}
		},
		search : function(letters) {
			if(letters == "")
				return this;

			var pattern = new RegExp(letters,"gi");
			return _(this.filter( function(data) {
				return pattern.test(data.get("name")) ||pattern.test(data.get("description"));
			}));
		}
	});
	var UserList =  Backbone.Collection.extend({
		model : User,
		initialize : function() {
			this.storage = new Offline.Storage('users', this, {
				autoPush:true
			} );
		},
		url: '/api/index.php/user.json'
	});
	var Comment = Backbone.Model.extend({
	});
	var CommentList =  Backbone.Collection.extend({
		placeId : "",
		model: Comment,
		url : '/api/index.php/place.json/comments/'+this.placeId,
		initialize : function() {
			this.storage = new Offline.Storage('www-comments', this, {
				autoPush: true
			});
		}
	});

	var User = Backbone.Model.extend({

		defaults: {
			id:0,
			sid:0,
			name: '',
			email: '',
			updated_at : '',
			todos: [],
			recommended: [],
			created: []
		},
		
		urlRoot: "/api/index.php/user.json",
		
		initialize: function() {
			
			var self = this;
			
			this.todos = new RelatedPlaceList(this.get('todos'));
			this.todos.url = function () {
				return self.urlRoot + '/todos/'+self.get('sid');
			};
			
			this.recommended = new RelatedPlaceList(this.get('recommended'));
			this.recommended.url = function () {
				return self.urlRoot + '/recommended/'+self.get('sid');
			};
			this.created = new RelatedPlaceList(this.get('created'));
			
		},
		saveRelatedModels : function(){
			
			var related_todos = this.todos.pluck('sid');
			var related_recommended = this.recommended.pluck('sid');	
			this.save({sid: this.id, todos: related_todos, recommended:related_recommended});
		}
	});
	var RelatedPlaceList =  Backbone.Collection.extend({
		model : Place,
		search : function(letters) {
			if(letters == "")
				return this;

			var pattern = new RegExp(letters,"gi");
			return _(this.filter( function(data) {
				return pattern.test(data.get("name")) ||pattern.test(data.get("description"));
			}));
		}
	});
	var RelatedUserList =  Backbone.Collection.extend({
		model : User,
		search : function(letters) {
			if(letters == "")
				return this;

			var pattern = new RegExp(letters,"gi");
			return _(this.filter( function(data) {
				return pattern.test(data.get("name"));
			}));
		}
	});
	var UserSession = Backbone.Model.extend({
        defaults: {
            loggedIn: false,
			name:null,
			latitude: 0,
			longitude: 0,
			address : null
        },
		
        initialize: function(){
			
			this.loadFromCookies();
			
			this.bind('change', this.saveToCookies);
			
			if(!this.get('address')){
				_.bindAll(this);
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(this.onSuccessUpdatePos,
					this.onFailUpdatePos);
				}
			}
            
        },
		onSuccessUpdatePos: function(position) {

			this.set({
				latitude: position.coords.latitude
			});
			//console.log("lat: "+this.get("latitude"));
			this.set({
				longitude: position.coords.longitude
			});
			//console.log("lng: "+this.get("longitude"));

			var geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(this.get("latitude"), this.get("longitude"));

			geocoder.geocode({
				'latLng': latlng
			}, this.onSuccessUpdateAddress);
		},
		onSuccessUpdateAddress : function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					//console.log(results[1].formatted_address);
					this.set({
						address: results[1].formatted_address
					});
				}
			}//Nothing to do otherwise
		},
		onFailUpdatePos : function(error) {
			console.log(error);
		},
		isLoggedIn:function(userId){
			return (userId==this.get('id') && this.get('loggedIn'));
		},
        saveToCookies: function(){
            $.cookie('id', this.get('id'));
			$.cookie('name', this.get('name'));
            $.cookie('loggedIn', this.get('loggedIn'));
            $.cookie('address', this.get('address'));
            $.cookie('latitude', this.get('latitude'));
            $.cookie('longitude', this.get('longitude'));
        },
		clearCookies: function(){
            $.removeCookie('id');
			$.removeCookie('name');
            $.removeCookie('loggedIn');
            $.removeCookie('address');
            $.removeCookie('latitude');
            $.removeCookie('longitude');
        },
        loadFromCookies: function(){
            this.set({id :$.cookie('id')});
            this.set({name :$.cookie('name')});
            this.set({loggedIn :$.cookie('loggedIn')});
            this.set({address : $.cookie('address')});
            this.set({latitude : $.cookie('latitude')});
            this.set({longitude : $.cookie('longitude')});
        }
    })
	app.Places = new PlaceList();
	app.Users = new UserList();
	app.LoggedInUser = new User();
	
	app.BrowsingUserSession = new UserSession();
	app.PlaceView = Backbone.View.extend({

		//... is a list tag.
		tagName:  'li',

		// Cache the template function for a single item.
		template: _.template( $('#place-template').html() ),

		// The DOM events specific to an item.
		events: {
			'keypress .edit': 'updateOnEnter',
			'blur .edit':   'close',
			'click .map' : 'showMap',
			'click .comments' : 'showComments',
			'click .edit' : 'edit',
			'click .bookmark' : 'addBookmark',
			'click .recommend' : 'addRecommendation',
			'click .remove-bookmark' : 'removeBookmark',
			'click .remove-recommend' : 'removeRecommendation',
			'click .on-todo-list' : 'showUsersToDo',
			'click .recommend-by' : 'showUsersRecommend'
		},

		initialize: function() {
			this.model.on( 'change', this.render, this );
			this.model.todousers.on( 'reset', this.addUsersToDo, this );
			this.model.recommendedusers.on( 'reset', this.addUsersRecommend, this );
		},
		// Re-render the titles of the todo item.
		render: function() {
			
			this.$el.html( this.template( this.model.toJSON()) );
			this.form = this.$('.edit');
			return this;
		},
		// Switch this view into `"editing"` mode, displaying the input field.
		edit: function() {
			$('#edit_' + this.model.id).slideToggle('slow');
		},
		// Close the `"editing"` mode, saving changes to the todo.
		close: function() {

			var titleValue = this.$("#edit-title").val().trim();
			var descriptionValue = this.$("#edit-description").val().trim();
			var ratingValue = this.$("#edit-rating").val().trim();
			var addressValue = this.$("#edit-address").val().trim();

			this.model.save({
				title: titleValue,
				description: descriptionValue,
				rating: ratingValue,
				address: addressValue
			});

			this.$el.removeClass('editing');
		},
		// If you hit `enter`, we're through editing the item.
		updateOnEnter: function( e ) {
			if ( e.which === ENTER_KEY ) {
				this.close();
			}
		},
		showMap : function() {

			$('#map_' + this.model.id + '_canvas').slideToggle('slow');

			var mapOptions = {
				center: new google.maps.LatLng(this.model.attributes.latitude, this.model.attributes.longitude),
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map($('#map_' + this.model.id + '_canvas')[0],mapOptions);

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(this.model.attributes.latitude, this.model.attributes.longitude),
				map: map,
				title:this.model.title
			});

			marker.info = new google.maps.InfoWindow({
				content: this.model.attributes.title
			});

			google.maps.event.addListener(marker, 'click', function() {
				marker.info.open(map, marker);
			});
			google.maps.event.trigger(marker, 'click');

		},
		showComments : function() {

			$('#comments_' + this.model.id).slideToggle('slow');
			alert('show comments');
		},
		showUsersToDo : function() {
			this.model.todousers.fetch();
			var todoId = '#todo_' + this.model.get('id');
			$(todoId).slideToggle('slow');
			
		},
		addUsersToDo : function() {
			var todoUsersId = '#todo_' + this.model.get('id') + '_users';
			
			$(todoUsersId).html('');
		
			this.model.todousers.each(function(user) {
				var view = new app.RelatedUserView({
					model: user
				});
				$(todoUsersId).append( view.render().el );
			});
			
		},
		showUsersRecommend : function() {
			this.model.recommendedusers.fetch();
			var recommendedId = '#recommended_' + this.model.get('id');
			$(recommendedId).slideToggle('slow');
		},
		addUsersRecommend : function() {
			
			var recommendedUsersId = '#recommended_' + this.model.get('id') +'_users';
			$(recommendedUsersId).html('');
		
			this.model.recommendedusers.each(function(user) {
				console.log(user);
				var view = new app.RelatedUserView({
					model: user
				});
				$(recommendedUsersId).append( view.render().el );
			});
			
		},
		
		addBookmark : function() {
			var userId = app.BrowsingUserSession.get('id');
			if(app.Users.get(userId)){
				app.Users.get(userId).todos.push(this.model);
				app.Users.get(userId).saveRelatedModels();
			}
		},
		addRecommendation : function() {
			
			var userId = app.BrowsingUserSession.get('id');
			if(app.Users.get(userId)){
				app.Users.get(userId).recommended.push(this.model);
				app.Users.get(userId).saveRelatedModels();
			}
		},
		removeBookmark : function() {
			var userId = app.BrowsingUserSession.get('id');
			if(app.Users.get(userId)){
				app.Users.get(userId).todos.remove(this.model);
				app.Users.get(userId).saveRelatedModels();
			}
		},
		removeRecommendation : function() {
			
			var userId = app.BrowsingUserSession.get('id');
			if(app.Users.get(userId)){
				app.Users.get(userId).recommended.remove(this.model);
				app.Users.get(userId).saveRelatedModels();
			}
		}
	});
	
	app.RelatedUserView = Backbone.View.extend({

		tagName:  'li',

		template: _.template( $('#related-user-template').html() ),

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		}
	});

	app.SearchPlacesView = Backbone.View.extend({

		// Cache the template function for a single item.
		searchTemplate: _.template( $('#search-template').html()),

		events: {
			'submit #find-places': 'performSearch'
		},

		initialize: function() {
			_.bindAll(this, "render");
			app.BrowsingUserSession.bind('change:address', this.render);
		},
		render: function() {
			$(this.el).html(this.searchTemplate(app.BrowsingUserSession.toJSON()));
		},
		close: function() {
			this.remove();
			this.unbind();
		},
		onShow: function() {
			$(this.el).show(500);
		},
		performSearch: function() {
			var locationOfPlace = $("#locationfilter").val().trim();
			var typeofPlace = $("#typefilter").val().trim();

			var searchQuery = '#results/'+locationOfPlace;
			if(typeofPlace) {
				searchQuery += '/'+typeofPlace;
			}
			AppRouter.navigate(searchQuery);
		}
	});

	app.UserView = Backbone.View.extend({

		// Cache the template function for a single item.
		userTemplate: _.template( $('#user-template').html()),

		events: {
			"keyup #filter-todos" : "searchToDos",
			"keyup #filter-recommended" : "searchRecommended"
		},

		initialize: function() {
			
			this.model.todos.on( 'add', this.addToDo, this );
			this.model.todos.on( 'reset', this.addAllToDos, this );
			
			this.model.recommended.on( 'add', this.addRecommended, this );
			this.model.recommended.on( 'reset', this.addAllRecommended, this );
		},
		render: function() {
			$(this.el).html(this.userTemplate(this.model.toJSON(), app.BrowsingUserSession.toJSON()));
			$(this.el).hide();
		},
		close: function() {
			this.remove();
			this.unbind();
		},
		onShow: function() {
			this.loadResults();
			$(this.el).show(500);
		},
		addToDo: function( place ) {
			
			place.set({canRemoveTodo: true});
			
			var view = new app.PlaceView({
				model: place
			});
			$('#todos-list').append( view.render().el );
		},
		addAllToDos: function(places) {
			
			if(places == null) {
				places = this.model.todos;
			}
			
			this.$('#todos-list').html('');
			places.each(this.addToDo, this);
			
		},
		addRecommended: function( place ) {
			
			place.set({canRemoveRecommended: true});
			
			var view = new app.PlaceView({
				model: place
			});
			$('#recommended-list').append( view.render().el );
		},
		addAllRecommended: function(places) {

			if(places == null) {
				places = this.model.recommended;
			}

			this.$('#recommended-list').html('');
			places.each(this.addRecommended, this);
			
		},
		createOnEnter: function( e ) {
			app.Places.create( this.newAttributes() );
			this.form.reset();
		},
		loadResults: function () {
			this.model.fetch();
			this.model.todos.fetch();
			this.addAllToDos(this.model.todos);
			this.model.recommended.fetch();
			this.addAllRecommended(this.model.recommended);
		},
		searchToDos: function(e) {
			var letters = $("#filter-todos").val();
			this.addAll(this.model.todos.search(letters));
		},
		searchRecommended: function(e) {
			var letters = $("#filter-recommended").val();
			this.addAll(this.model.recommended.search(letters));
		}
	});

	app.AddPlaceView = Backbone.View.extend({

		addPlaceTemplate: _.template( $('#add-template').html()),

		render: function() {
			$(this.el).html(this.addPlaceTemplate());
			$(this.el).hide();
		},
		close: function() {
			this.remove();
			this.unbind();
		},
		onShow: function() {
			$(this.el).show(500);
		}
	});
	app.NavView = Backbone.View.extend({

		el: "#app-nav",
		
		events: {
			"click .signout" : "signOut"
		},
		
		appTemplate: _.template( $('#nav-template').html()),
		
		initialize: function() {
			_.bindAll(this, "render");
			app.BrowsingUserSession.bind('change:loggedIn',this.render);
			this.render();
		},
		render: function() {
			$(this.el).html(this.appTemplate(app.BrowsingUserSession.toJSON()));
		},
		signOut:function(){
			app.BrowsingUserSession.clearCookies();
			this.render();
		}
	});
	
	app.SignupView = Backbone.View.extend({

		signUpTemplate: _.template( $('#signup-template').html()),
		events: {
			'submit #signup-form': 'signup',
			'submit #signin-form': 'signin'
		},

		render: function() {
			$(this.el).html(this.signUpTemplate());
			$(this.el).hide();
		},
		close: function() {
			this.remove();
			this.unbind();
		},
		onShow: function() {
			$(this.el).show(500);
		},
		signup: function(e){
			e.preventDefault();
			
			var signUpData = $("#signup-form").serialize();
			
			console.log(signUpData);
			
			var signUpForm = $.ajax({
				type: "POST",
				url: "/api/index.php/user.json",
				dataType: "JSON",
				data: signUpData
			});
				  
			signUpForm.done(function(userData){
				if(userData != false){
					
					app.Users.add(new User({id:userData.id,name:userData.name, email:userData.email}));
					app.BrowsingUserSession.set({loggedIn:true,id:userData.id,name:userData.name});
					window.location.replace('#');
				}
				
			});
		},
		signin: function(e){
			e.preventDefault();
			
			var loginData = $("#signin-form").serialize();
			
			console.log(loginData);
			
			var loginForm = $.ajax({
				type: "POST",
				url: "/api/index.php/user.json/login",
				dataType: "JSON",
				data: loginData
			});
				  
			loginForm.done(function(userData){
				
				if(userData != false){
					app.Users.add(new User({id:userData.id,name:userData.name, email:userData.email}));
					app.BrowsingUserSession.set({loggedIn:true,id:userData.id,name:userData.name});
					window.location.replace('#');
				}
				
			});
		}
	});
	

	app.FoundPlacesView = Backbone.View.extend({

		foundPlacesTemplate: _.template( $('#found-template').html()),

		events: {
			"keyup #filter-by" : "search"
		},

		initialize: function() {
			$(this.el).html(this.foundPlacesTemplate());
			window.app.Places.on( 'add', this.addOne, this );
			window.app.Places.on( 'reset', this.addAll, this );

		},
		render: function() {
			$(this.el).hide();
		},
		close: function() {
			this.remove();
			this.unbind();
		},
		onShow: function() {
			this.loadResults();
			$(this.el).show(500);
			$('#add-log').show(500);
		},
		addOne: function( place ) {

			place.set({
				distance: this.distanceFromUser(place,app.BrowsingUserSession.get("latitude"),app.BrowsingUserSession.get("longitude"))
			});
			var view = new app.PlaceView({
				model: place
			});
			$('#places-list').append( view.render().el );
		},
		addAll: function(places) {

			if(places == null) {
				places = app.Places;
			}

			this.$('#places-list').html('');
			places.each(this.addOne, this);
		},
		distanceFromUser : function(place,userLatitude,userLongitude) {
			var earthsRadius = 6371; // Radius of the earth in km
			var differenceInLat = this.toRad(place.get("latitude")-userLatitude);  // Javascript functions in radians
			var differenceInLng = this.toRad(place.get("longitude")-userLongitude);
			var a = Math.sin(differenceInLat/2) * Math.sin(differenceInLat/2) +
			Math.cos(this.toRad(place.get("longitude"))) * Math.cos(this.toRad(userLongitude)) *
			Math.sin(differenceInLng/2) * Math.sin(differenceInLng/2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			var distance = Math.round(earthsRadius * c); // Distance in km
			return distance;
		},
		toRad : function(Value) {
			return Value * Math.PI / 180;
		},
		newAttributes: function() {
			return {
				title: $("#title").val().trim(),
				description: $("#description").val().trim(),
				address: $("#address").val().trim(),
				rating: $("#rating").val().trim()
			};
		},
		createOnEnter: function( e ) {
			app.Places.create( this.newAttributes() );
			this.form.reset();
		},
		loadResults: function () {
			app.Places.fetch();
		},
		search: function(e) {
			var letters = $("#filter-by").val();
			this.addAll(app.Places.search(letters));
		}
	});

	var ApplicationRouter = Backbone.Router.extend({

		navigationView : null,

		routes: {
			"":"showSearch",
			"results/": "showResults",
			"results/:location": "showResults",
			"results/:location/:type": "showResults",
			"user/" : "showUser",
			"user/:id" : "showUser",
			"addplace/" : "showAdd",
			"signup/" : "showSignup",
			"signin/" : "showSignup"
		},
		
		
		initialize: function() {
			this.navigationView = new app.NavView();
			if(app.BrowsingUserSession.get('loggedIn')){
				
				if(!app.Users.get(app.BrowsingUserSession.get('id'))){
					
					var loggedIn = new User({id: app.BrowsingUserSession.get('id')});
					loggedIn.fetch();
					app.Users.add(loggedIn);
				}
			
			}
		},

		showSearch: function() {
			RegionManager.show(new app.SearchPlacesView());
		},
		showResults: function(location,type) {
			
			var search = false;
			if(location){
				search = true;
				app.Places.locationOfPlace = location;
			}
			if(type){
				search = true;
				app.Places.typeOfPlace = type;
			}
			//ensure we get the latest from the server			
			if(search){
				app.Places.storage.sync.full();
			}
			RegionManager.show(new app.FoundPlacesView());
			
		},
		showUser: function(userId) {
			if(userId){
				if(!app.Users.get(userId)){
					app.Users.add(new User({id:userId}))
				}
				
				RegionManager.show(new app.UserView({model:app.Users.get(userId)}));
			}else{
				
				var loggedInId = app.BrowsingUserSession.get('id');
				RegionManager.show(new app.UserView({model:app.Users.get(loggedInId)}));
			}
		},
		showAdd: function( ) {
			RegionManager.show(new app.AddPlaceView());
		},
		showSignup: function( ) {
			RegionManager.show(new app.SignupView());
		}
	});

	RegionManager = (function (Backbone, $) {
		var currentView;
		var el = "#main";
		var region = {};

		var closeView = function (view) {
			if (view && view.close) {
				view.close();
			}
		};
		var openView = function (view) {
			view.render();
			$(el).html(view.el);
			if (view.onShow) {
				view.onShow();
			}
		};
		region.show = function (view) {
			closeView(currentView);
			currentView = view;
			openView(currentView);
		};
		return region;
	})(Backbone, jQuery);
	var AppRouter = new ApplicationRouter();
	Backbone.history.start();

});
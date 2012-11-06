/**
 * @author Jamie Bate
 */

var app = app || {};

$( function( $ ) {

	var Place = Backbone.Model.extend({
		defaults: {
			id:0,
			updated_at : '',
			name: '',
			description: '',
			address: '',
			rating: 3,
			distance: '??',
			latitude: 0,
			longitude: 0
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

			var placesUrl = '/api/index.php/note.json';

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
	var Comment = Backbone.Model.extend({
	});
	var CommentList =  Backbone.Collection.extend({
		placeId : "",
		model: Comment,
		url : '/api/index.php/note.json/comments/'+this.placeId,
		initialize : function() {
			this.storage = new Offline.Storage('www-comments', this, {
				autoPush: true
			});
		}
	});

	var UserAccount = Backbone.Model.extend({

		defaults: {
			id:0,
			name: '',
			loggedIn:false,
			browsing:false,
			updated_at : '',
			latitude: 0,
			longitude: 0,
			address : '',
			todos : new PlaceList(),
			recommended : new PlaceList(),
			created : new PlaceList()
		},
		initialize: function() {
			if(this.get('loggedIn')||this.get('browsing')){
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
			console.log("lat: "+this.get("latitude"));
			this.set({
				longitude: position.coords.longitude
			});
			console.log("lng: "+this.get("longitude"));

			var geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(this.get("latitude"), this.get("longitude"));

			geocoder.geocode({
				'latLng': latlng
			}, this.onSuccessUpdateAddress);
		},
		onSuccessUpdateAddress : function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					console.log(results[1].formatted_address);
					this.set({
						address: results[1].formatted_address
					});
				}
			}//Nothing to do otherwise
		},
		onFailUpdatePos : function(error) {
			console.log(error);
		}
	});
	var UserList =  Backbone.Collection.extend({
		model: UserAccount,

		url : '/api/index.php/user.json',

		initialize : function() {
			this.storage = new Offline.Storage('users', this, {
				autoPush: true
			}, {
				keys : {
					id: this.todos,
					id: this.recommended,
					id: this.created
				}
			});
		},
		browsingUser : function() {
			
			return _.first(this.where({
				browsing: true
			}));
		}
	});

	app.Places = new PlaceList();
	app.Users = new UserList();
	app.Users.add(new UserAccount({browsing:true}));
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
			'click .recommend' : 'addRecommendation'
		},

		initialize: function() {
			this.model.on( 'change', this.render, this );
		},
		// Re-render the titles of the todo item.
		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
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
		addBookmark : function() {
			var bookmarked = app.Users.browsingUser().get("todos");
			bookmarked.add(this.model);
			app.Users.browsingUser().set({
				todos:bookmarked
			});
		},
		addRecommendation : function() {
			app.Users.browsingUser().recommended.create( this.model );
			
			var recommendation = app.Users.browsingUser().get("recommended");
			recommendation.add(this.model);
			app.Users.browsingUser().set({
				recommended:recommendation
			});
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
			app.Users.browsingUser().bind('change:address', this.render);
		},
		render: function() {
			$(this.el).html(this.searchTemplate(app.Users.browsingUser().toJSON()));
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
			"keyup #filter-todos" : "searchToDos"
		},

		initialize: function() {
			$(this.el).html(this.userTemplate());
			this.model.get("todos").on( 'add', this.addToDo, this );
			this.model.get("todos").on( 'reset', this.addAllToDos, this );
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
		},
		addToDo: function( place ) {
			var view = new app.PlaceView({
				model: place
			});
			$('#todos-list').append( view.render().el );
		},
		addAllToDos: function(places) {

			if(places == null) {
				places = this.model.get("todos");
			}

			this.$('#todos-list').html('');
			places.each(this.addToDo, this);
		},
		createOnEnter: function( e ) {
			app.Places.create( this.newAttributes() );
			this.form.reset();
		},
		loadResults: function () {
			this.addAllToDos(this.model.get("todos"));
		},
		searchToDos: function(e) {
			var letters = $("#filter-todos").val();
			this.addAll(this.model.get("todos").search(letters));
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
	
	app.SignupView = Backbone.View.extend({

		signUpTemplate: _.template( $('#signup-template').html()),
		events: {
			'submit #signup-form': 'signup'
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
		signup: function(){
			alert('signup');
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
				distance: this.distanceFromUser(place,app.Users.browsingUser().get("latitude"),app.Users.browsingUser().get("longitude"))
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
			app.Places.storage.sync.full();
		},
		search: function(e) {
			var letters = $("#filter-by").val();
			this.addAll(app.Places.search(letters));
		}
	});

	var ApplicationRouter = Backbone.Router.extend({

		routes: {
			"":"showSearch",
			"results/:location": "showResults",
			"results/:location/:type": "showResults",
			"user/" : "showUser",
			"addplace/" : "showAdd",
			"signup/" : "showSignup"
		},

		showSearch: function() {
			RegionManager.show(new app.SearchPlacesView());
		},
		showResults: function(location,type) {
			app.Places.locationOfPlace = location;
			app.Places.typeOfPlace = type;
			RegionManager.show(new app.FoundPlacesView());
		},
		showUser: function( ) {
			RegionManager.show(new app.UserView({model:app.Users.browsingUser()}));
		},
		showAdd: function( ) {
			RegionManager.show(new app.AddPlaceView());
		},
		showSignup: function( ) {
			RegionManager.show(new app.SignupView());
		},
		showSelected: function(section) {
			$('#filters li a')
			.removeClass('selected')
			.filter('[href="#/' + ( section || '' ) + '"]')
			.addClass('selected');
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
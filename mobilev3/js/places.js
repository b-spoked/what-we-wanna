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
			classification: '',
			labels: '',
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
			});
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
	var User = Backbone.Model.extend({

		defaults: {
			id:'',
			sid:'',
			thirdparty_id:'',
			name: '',
			email: '',
			thumbnail: '',
			newsletter:false,
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
			id:'',
            loggedIn: false,
			name:'',
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
	app.AuthenticatedUser = new FacebookUser();
	app.BrowsingUserSession = new UserSession();
	
	app.PlaceView = Backbone.View.extend({

		//... is a list tag.
		tagName:  'div',
		
		className: 'span4 well well-small',

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
		
		appTemplate: _.template( $('#nav-template').html()),
		
		initialize: function() {
			_.bindAll(this, "render");
			app.AuthenticatedUser.bind('change',this.updateUsersDetails);
			this.render();
		},
		render: function() {
			$(this.el).html(this.appTemplate(app.AuthenticatedUser.toJSON()));
		},
		updateUsersDetails:function(){
			console.info('login status change');
			if(app.AuthenticatedUser.isConnected()){
				
				//ToDo:check thsi logic
				if(app.BrowsingUserSession.get('id')){
					//check is in users
					if(!app.Users.get(app.BrowsingUserSession.get('id'))){
						
						var authenticatedUser = new User({thirdparty_id:app.AuthenticatedUser.get('id'),
									name:app.AuthenticatedUser.get('name'),
									email:'todo',
									thumbnail:app.AuthenticatedUser.get('pictures').square});
						
						authenticatedUser.save();
						
						app.Users.add(authenticatedUser);
					}
				}else{
					
					//create user
					var authenticatedUser = new User({thirdparty_id:app.AuthenticatedUser.get('id'),
										name:app.AuthenticatedUser.get('name'),
										email:'todo',
										thumbnail:app.AuthenticatedUser.get('pictures').square});
					
					authenticatedUser.save();
				
					app.Users.add(authenticatedUser);
					//create user session
					app.BrowsingUserSession.set({loggedIn:true,
												id:authenticatedUser.get('id'),
												name:authenticatedUser.get('name'),
												thumbnail:authenticatedUser.get('thumbnail')});
				}
			}else{
				app.BrowsingUserSession.set({loggedIn:false});
			}
		}
	
	});
	
	app.LoginView = Backbone.View.extend({

		loginTemplate: _.template( $('#login-template').html()),
		
		events: {
			"click #login" : "userLogin",
			"click #logout" : "userLogout"
		},
		initialize: function() {
			_.bindAll(this, "render");
			app.AuthenticatedUser.on('facebook:unauthorized',this.fbUnauthorized);
			app.AuthenticatedUser.on('facebook:connected',this.fbConnected);
			app.AuthenticatedUser.on('facebook:disconnected',this.fbDisconnected);
			this.render();
		},
		render: function() {
			$(this.el).html(this.loginTemplate(app.AuthenticatedUser.toJSON()));
			$(this.el).hide();
		},
		close: function() {
			this.remove();
			this.unbind();
		},
		onShow: function() {
			$(this.el).show(500);
		},
		
		fbUnauthorized:  function(model, response) {
			console.info('facebook:unauthorized');
			$('#loginstatus').text(response.status);
		},

		fbConnected: function(model, response) {
			console.info('facebook:connected');
			$('#loginstatus').text(response.status);
			$('#login').attr('disabled', true);
			$('#logout').attr('disabled', false);
		},

		fbDisconnected: function(model, response) {
			console.info('facebook:disconnected');
			$('#loginstatus').text(response.status);
			$('#login').attr('disabled', false);
			$('#logout').attr('disabled', true)
		},
		userLogin : function(){
			app.AuthenticatedUser.login()
		},
		userLogout : function(){
			app.AuthenticatedUser.logout()
		}
	});
	
	app.PlacesView = Backbone.View.extend({

		foundPlacesTemplate: _.template( $('#found-template').html()),

		events: {
			"keyup #filter-by" : "search",
			'submit #find-places': 'performSearch'
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
		performSearch: function() {
			var locationOfPlace = $("#locationfilter").val().trim();
			var typeofPlace = $("#typefilter").val().trim();

			var searchQuery = '#/'+locationOfPlace;
			if(typeofPlace) {
				searchQuery += '/'+typeofPlace;
			}
			AppRouter.navigate(searchQuery);
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
	
	app.VisualisePlacesView = Backbone.View.extend({

		visualisePlacesTemplate: _.template( $('#visualise-places-template').html()),
		placeDetailTemplate: _.template( $('#place-detail-template').html()),

		events: {
			'change #find-places': 'loadSelection'
		},

		initialize: function() {
			_.bindAll(this);
			$(this.el).html(this.visualisePlacesTemplate());
		},
		render: function() {
			$(this.el).hide();
		},
		close: function() {
			this.remove();
			this.unbind();
		},
		onShow: function() {
			this.visualise(this.loadResults());
			$(this.el).show(500);
			$('#add-log').show(500);
		},
		loadSelection: function() {
			var locationOfPlace = $("#locationfilter").val().trim();
			alert("search "+locationOfPlace);

			//var searchQuery = '#/'+locationOfPlace;
			//AppRouter.navigate(searchQuery);
		},
		setDistance: function( place ) {
			place.set({
				distance: this.distanceFromUser(place,app.BrowsingUserSession.get("latitude"),
												app.BrowsingUserSession.get("longitude"))
			});
			return place;
		},
		distanceFromUser : function(place,userLatitude,userLongitude) {
			var earthsRadius = 6371; // Radius of the earth in km
			var differenceInLat = this.toRad(place.get("latitude")-userLatitude);
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
		
		loadResults: function () {
			var self = this;
			var data = new Array(); 
			app.Places.fetch();
			app.Places.forEach(function(place) {
				var locatedPlace = self.setDistance(place);
				data.push(locatedPlace.toJSON());
			});
			
			return data;
		},
		
		visualise:function(data){
            
			var width = 420,
				height = 380,
				fill = d3.scale.category20c(),
				distance_centers = {
					"1": { x: 160, y: 150},
					"2": { x: width / 2, y: 250},
					"3": { x: width - 160, y: 350}
				},
				nodes = [];
				
			var vis = d3.select("#places-visual").append("svg:svg")
                .attr("viewBox", "0 0 "+width+" "+height);
				
			this.createDistanceKey(vis,width);	
			
			var force = d3.layout.force()
				.nodes(nodes)
				.links([])
				.gravity(0)
				.size([width, height]);
			
			data.forEach(function(place) {
				var node = {
					id : place.id,
					name: place.name,
					distance : place.distance,
					classification : place.classification,
					value:  (place.distance > 0) ? (10 / place.distance) : 10 
				};
				
				nodes.push(node);	
			});
			//Legend
			//this.createClassificationsKey(vis,width,fill,nodes);
			
			force.on("tick", function(e) {
				
				// Push nodes toward their designated focus.
				var k = .1 * e.alpha;
				nodes.forEach(function(o, i) {
					if(o.distance <= 2){
						range = 1;
					}else if(o.distance > 2 && o.distance <= 10){
						range = 2;
					}else{
						range = 3;
					}
						
					o.y += (distance_centers[range].y - o.y) * k;
					o.x += (distance_centers[range].x - o.x) * k;
				});
			
				vis.selectAll("circle.node")
					.attr("cx", function(d) { return d.x; })
					.attr("cy", function(d) { return d.y; });
			});
			
			force.start();
			
			vis.selectAll("circle.node")
				.data(nodes)
				.enter().append("svg:circle")
				.attr("class", "node")
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; })
				.attr("r", 10)
				.attr("data-legend",function(d) { return d.classification})
				.on("click",this.showPlace)
				.style("fill", function(d) { return fill(d.classification); })
				.style("stroke", function(d) { return d3.rgb(fill(d.classification)).darker(2); })
				.style("stroke-width", 1.5)
				.call(force.drag);
				
			var legend = vis.append("g")
				.attr("class","legend")
				.attr("transform","translate(15,15)")
				.style("font-size","16px")
				.call(d3.legend);	
		},
		
		createDistanceKey :function(vis,width){
			var distances_x = {"< 2km ": 160, "2-10km": width / 2, "> 10km": width - 160},
			distances_data = d3.keys(distances_x),
			distances = vis.selectAll(".classification")
				.data(distances_data);

			distances.enter().append("text")
				.attr("class", "classification")
				.attr("x", function(d){ return distances_x[d] } )
				.attr("y", 40)
				.attr("text-anchor", "middle")
				.text(function(d){ return d});
		},
		
		createClassificationsKey :function(vis,width,fill,nodes){
			
			var legend = vis.selectAll(".legend")
				.data(nodes)
			  .enter().append("g")
				.attr("class", "legend")
				.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
				
			legend.append("rect")
				.attr("x", width - 18)
				.attr("width", 18)
				.attr("height", 18)
				.style("fill", function(d) { return fill(d.classification); })
		  
			legend.append("text")
				.attr("x", width - 24)
				.attr("y", 9)
				.attr("dy", ".35em")
				.style("text-anchor", "end")
				.text(function(d) { return d.classification; });	
		},
		
		showPlace: function(node){
			var placeDetail = "#modal-place-detail";
			var place = app.Places.get(node.id);
			
			$(placeDetail).html( this.placeDetailTemplate( place.toJSON() ) );
			
			var placeDetailDialog = "#place_"+place.get('id');
			
			$(placeDetailDialog).modal('show');
		}		
	});

	var ApplicationRouter = Backbone.Router.extend({

		navigationView : null,

		routes: {
			"": "showPlaces",
			"/:location": "showPlaces",
			"/:location/:type": "showPlaces",
			"user/" : "showUser",
			"user/:id" : "showUser",
			"addplace/" : "showAdd",
			"join/" : "showLogin"
		},
		
		
		initialize: function() {
			this.navigationView = new app.NavView();
		},
		showPlaces: function(location,type) {
			
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
			//RegionManager.show(new app.PlacesView());
			RegionManager.show(new app.VisualisePlacesView());
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
		showLogin: function( ) {
			RegionManager.show(new app.LoginView());
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
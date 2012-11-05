
	/**
	 * Controller
	 */
	var Controller = function () {
		
		var cordinates = null;
		
		function init(){
			Cache.init();
			fetchNotes();
			refreshNotesList();
			$('#yourLocation').text(userAddress());
		}
		
		function refreshNotesList(){
			$('#notes').listview('refresh');
		}
		
		function showMessage(message){
			$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1><strong>"+message+"</strong></h1></div>")
			.css({ "display":"block", "opacity":0.96, "top": $(window).scrollTop() + 100 })
			.appendTo( $("body") )
			.delay( 2500 )
			.fadeOut( 400, function(){
			    $(this).remove();
			});
		}
		
		function fetchNotes() {

			notes = Cache.getNotes();

			if((notes.length >0) && Cache.isCurrent()) {
				displayNotesInRelationToUser();
			} else {
				
				//var searchData = $("#searchNotes").serialize();
				//console.log(searchData);
				apiUrl = "api/index.php/note.json";

				$.ajax({
					type: "GET",
					url: apiUrl
				}).done(function(notes) { 
					 Cache.addNotes(notes);
					 displayNotesInRelationToUser();
				});
			}
		}
		
		function showLocation(){
			$('#locationAddress').val(userAddress());
		}
		
		function userAddress(){
			return Cache.getUserAddress();
		}
		
		function updateSettings()
		{	
			Cache.addUserAddress($('#locationAddress').val());
			Cache.addUserAllowLocation($('#useLocation').val());
			Cache.addUserUpdateFrequency($('#updateFrequency').val());
			displayNotesInRelationToUser();
		}
		
		function fetchFilteredNotes(queryString) {

			//var searchData = $("#searchNotes").serialize();
			//console.log(searchData);
			apiUrl = "api/index.php/note.json";

			$.ajax({
				type: "GET",
				url: apiUrl
			}).done(function(notes) { 
				 Cache.addNotes(notes);
				 displayNotesInRelationToUser();
			});
		}
		
		
		function refreshStoredNotes() {
			Cache.clearNotes();
			fetchNotes();
		}
		
		
		function displayNotesInRelationToUser()
		{
			$('#notes').empty();
			notes = Cache.getNotes();
			
			if (navigator.geolocation)
			{
			    navigator.geolocation.getCurrentPosition(
			        function(position){
					$.each(notes, function(i, note)
					{
						var dist = Location.distanceFromUser(note,position.coords.latitude,position.coords.longitude);
						Location.address(position.coords.latitude,position.coords.longitude);
						NoteItemView.addNote(note,dist, "#notes");
						NoteDetailView.createNotePage(note,dist);
						NoteDetailView.createMapPage(note);
					});
			        },
				function(error) {
					showNotesWithUnknownDistance(notes);	
				});
			}else{
				showNotesWithUnknownDistance(notes);
			}
		}
		
		/**
		 * We can't calculate the distance so tell people
		 */
		function showNotesWithUnknownDistance(notes){
			$.each(notes, function(i, note)
			{	
					NoteItemView.addNote(note,"??", "#notes");
					NoteDetailView.createNotePage(note,"??");
					NoteDetailView.createMapPage(note);
			});	
		}
		
		function displayFavourites() {

			//clear first
			$('#fav_notes').empty();
			var favs = Cache.getFavourites();

			$.each(favs, function(i, fav) {
				var distance = "??";
				NoteItemView.addNote(fav,distance, "#fav_notes");
				NoteDetailView.createNotePage(fav,distance);
				NoteDetailView.createMapPage(fav);
			});
			
		}
		
		function completeAndSaveNote(e){
			
			e.preventDefault();
			
			var address = $('#address').val();
			var geocoder = new google.maps.Geocoder();
			
			geocoder.geocode( { 'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {  
					latLong = results[0].geometry.location.toString();
					$("#latitude").val(results[0].geometry.location.lat());
					$("#longitude").val(results[0].geometry.location.lng());
					var formData = $("#addNoteForm").serialize();
					console.log(formData);
					Note.add(formData);
				}else{
					var formData = $("#addNoteForm").serialize();
					console.log(formData);
					Note.add(formData);	
				}
			});
		}
		
		function editNote(e) {
			 e.preventDefault();
			var formData = $("#editNoteForm").serialize();
			Note.edit(formData);
		}
		
		function bookmarkNote() {
			var btnId = $(this).attr("id");

			$(btnId).find('span.ui-btn-text').text("Remove");

			var noteId =btnId.split("_")[1];

			var apiUrl = "api/index.php/note/"+noteId;

			$.ajax({
				type: "GET",
				url: apiUrl,
				dataType: "json",
				success: Cache.addFavourite
			});

			showMessage("Added to favourites");
		}
		
		function removeNoteBookmark(id) {
			$(id).find('span.ui-btn-text').text("Add");

			var noteId =id.split("_")[1];
			Cache.removeFavourite(noteId);
			showMessage("Removed from favourites");
		}
		
		function searchNotesByTag() {
					
			var tagId = $(this).attr("id");
			var tagName =tagId.split("_")[1];
			console.log(tagName);
			fetchNotes();
			
		}
		
		function displayAccountNotes() {
			notes = Cache.getAccountNotes();

			if((notes.length >0) && Cache.isCurrent()) {
				setupAccountNotes(notes);
			} else {
				apiUrl = "api/index.php/note.json";

				$.ajax({
					type: "GET",
					url: apiUrl,
					success: setupAccountNotes
				});
			}
		}
		
		function setupAccountNotes(notes) {
			//clear first
			$('#account_notes').empty();
			Cache.addAccountNotes(notes);

			$.each(notes, function(i, note) {
			   AccountNoteItemView.addNote(note, "#account_notes");
			});
		}
		
		function editAccountNote() {
			var Id = $(this).attr("id");
			var noteId = Id.split("_")[1];
			
			var apiUrl = "api/index.php/note/"+noteId;
		
			$.ajax({
				type: "GET",
				url: apiUrl,
				dataType: "json",
				success: EditNoteView.setDetail
			});
			
		}
		
		function setRating(){
			var Id = $(this).attr("id");
			alert("rating: "+Id);
		}
		
		return{
			editAccountNote:editAccountNote,
			setupAccountNotes:setupAccountNotes,
			displayAccountNotes:displayAccountNotes,
			removeNoteBookmark:removeNoteBookmark,
			bookmarkNote:bookmarkNote,
			editNote:editNote,
			displayFavourites:displayFavourites,
			displayNotesInRelationToUser:displayNotesInRelationToUser,
			refreshStoredNotes:refreshStoredNotes,
			fetchNotes:fetchNotes,
			searchNotesByTag:searchNotesByTag,
			init:init,
			refreshNotesList:refreshNotesList,
			completeAndSaveNote:completeAndSaveNote,
			showLocation:showLocation,
			updateSettings:updateSettings,
			refreshStoredNotes:refreshStoredNotes,
			setRating:setRating
		};
	}();
	/**
	 * Caching for favourites and users events
	 */
	var Cache = function() {

		var FAVOURITE_NOTES = "favourite_notes";
		var ACCOUNT_NOTES = "account_notes";
		var USER_ADDRESS = "user_address";
		var USER_UPDATE_FREQUENCY = "user_update_freq";
		var USER_ALLOW_LOCATION = "user_allow_location";
		var NO_ADDRESS = "Area Unknown";
		var NOTES = "notes";
		var NOTES_LAST_UPDATED = "notes_last_updated";

		function init() {
			if (!localStorage[FAVOURITE_NOTES]) {
				localStorage[FAVOURITE_NOTES] = JSON.stringify([]);
			}
			if (!localStorage[NOTES]) {
				localStorage[NOTES] = JSON.stringify([]);
			}
			if (!localStorage[ACCOUNT_NOTES]) {
				localStorage[ACCOUNT_NOTES] = JSON.stringify([]);
			}
			if (!localStorage[USER_ADDRESS]) {
				localStorage[USER_ADDRESS] = JSON.stringify([NO_ADDRESS]);
			}
			if (!localStorage[USER_UPDATE_FREQUENCY]) {
				localStorage[USER_UPDATE_FREQUENCY] = JSON.stringify([]);
			}
			if (!localStorage[USER_ALLOW_LOCATION]) {
				localStorage[USER_ALLOW_LOCATION] = JSON.stringify([]);
			}
		}
		
		function isCurrent() {

			var today = new Date();
			var lastUpdate = new Date(localStorage[NOTES_LAST_UPDATED]);
			//Set 1 day in milliseconds
			var one_day=1000*60*60*24

			//Calculate difference btw the two dates, and convert to days
			var numberOfDays = Math.ceil((lastUpdate.getTime()-today.getTime())/(one_day));

			return(numberOfDays < 7 );

		}
		
		function addFavourite(note) {
			var favs = getFavourites();
			favs.push(note);
			localStorage[FAVOURITE_NOTES] = JSON.stringify(favs);
		}
		
		function removeFavourite(noteId) {
			favs = getFavourites();

			var key = '';
			for(i in favs) {
				if(favs[i].id === noteId) {
					key = i;
					break;
				}
			}

			favs.splice(key,1);

			localStorage[FAVOURITE_NOTES] = JSON.stringify(favs);

		}
		
		function getFavourites() {
			
			if(localStorage[FAVOURITE_NOTES]) {

				var favs = jQuery.parseJSON(localStorage[FAVOURITE_NOTES]);

				if(favs.length > 1) {
					favs.sort( function(a, b) {
						if (a.id < b.id)
							return -1;
						if (a.id > b.id)
							return 1;
						return 0;
					});
				}
				return favs;
			}
			return new Array();
		}
		
		function clearFavourites(){
			localStorage[FAVOURITE_NOTES] = JSON.stringify([]);
		}
		
		function addUserAddress(address){
			
			if(address == ""){
				address = NO_ADDRESS;
			}
			
			localStorage[USER_ADDRESS] = JSON.stringify(address);
		}
		
		function getUserAddress(){
			return jQuery.parseJSON(localStorage[USER_ADDRESS]);
		}
		
		function getUserUpdateFrequency(){
			return jQuery.parseJSON(localStorage[USER_UPDATE_FREQUENCY]);
		}
		
		function addUserUpdateFrequency(frequency){
			
			if(frequency == ""){
				frequency = 7;
			}
			
			localStorage[USER_UPDATE_FREQUENCY] = JSON.stringify(frequency);
		}
		
		function getUserAllowLocation(){
			return jQuery.parseJSON(localStorage[USER_ALLOW_LOCATION]);
		}
		
		function addUserAllowLocation(allow){
			
			if(allow == ""){
				allow = true;
			}
			
			localStorage[USER_ALLOW_LOCATION] = JSON.stringify(allow);
		}
		
		
		
		function userAddressNotSet(){
			
			var currentAddress = getUserAddress();
			if(currentAddress == "" || currentAddress == NO_ADDRESS){
				return true;
			}
			return false;
		}
		
		function addNotes(notes) {
			clearNotes();
			localStorage[NOTES_LAST_UPDATED] = new Date();
			localStorage[NOTES] = JSON.stringify(notes);
		}
		
		function clearNotes() {
			localStorage[NOTES] = JSON.stringify([]);
		}
		
		function getNotes() {
			return jQuery.parseJSON(localStorage[NOTES]);
		}
		
		function addAccountNotes(notes) {
			clearAccountNotes();
			localStorage[NOTES_LAST_UPDATED] = new Date();
			localStorage[ACCOUNT_NOTES] = JSON.stringify(notes);
		}
		
		function clearAccountNotes() {
			localStorage[ACCOUNT_NOTES] = JSON.stringify([]);
		}
		
		function getAccountNotes() {
			return jQuery.parseJSON(localStorage[ACCOUNT_NOTES]);

		}
		
		return{
			isCurrent:isCurrent,
			init:init,
			getAccountNotes:getAccountNotes,
			clearAccountNotes:clearAccountNotes,
			addAccountNotes:addAccountNotes,
			getNotes:getNotes,
			clearNotes:clearNotes,
			addNotes:addNotes,
			getFavourites:getFavourites,
			removeFavourite:removeFavourite,
			addFavourite:addFavourite,
			addUserAddress:addUserAddress,
			getUserAddress:getUserAddress,
			userAddressNotSet:userAddressNotSet,
			getUserUpdateFrequency:getUserUpdateFrequency,
			addUserUpdateFrequency:addUserUpdateFrequency,
			getUserAllowLocation:getUserAllowLocation,
			addUserAllowLocation:addUserAllowLocation
		};
		
	}();
	
	/**
	 * Map functionality
	 */
	var Location = function() {
		
		function distanceFromUser(note,userLatitude,userLongitude)
		{	
	
			var earthsRadius = 6371; // Radius of the earth in km
			var differenceInLat = toRad(note.latitude-userLatitude);  // Javascript functions in radians
			var differenceInLng = toRad(note.longitude-userLongitude); 
			var a = Math.sin(differenceInLat/2) * Math.sin(differenceInLat/2) +
			        Math.cos(toRad(note.longitude)) * Math.cos(toRad(userLongitude)) * 
			        Math.sin(differenceInLng/2) * Math.sin(differenceInLng/2); 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var distance = Math.round(earthsRadius * c); // Distance in km
			return distance;
		}
		
		function address(userLatitude,userLongitude)
		{
 			if(Cache.userAddressNotSet()){
			
				var geocoder = new google.maps.Geocoder();
				var latlng = new google.maps.LatLng(userLatitude, userLongitude);
				
				geocoder.geocode({'latLng': latlng}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						if (results[1]) {
							console.log(results[1].formatted_address);
							Cache.addUserAddress(results[1].formatted_address);
						} 
					} //Nothing to do otherwise
				});
			}
		}
		
		/**
		* Converts numeric degrees to radians
		*/
		function toRad(Value)
		{
		    return Value * Math.PI / 180;
		}
		
		return{
			distanceFromUser:distanceFromUser,
			address:address
		};
		
	}();
	
	/**
	 * Note functionality
	 */
	var Note = function() {

		function add(noteData) {

			var apiUrl = "api/index.php/note.json";

			$.ajax({
				type: "POST",
				url: apiUrl,
				data: noteData,
				success: addedMessage
			});
		}
		function edit(noteData) {
			
			var apiUrl = "api/index.php/note";
			console.log(noteData);
			$.ajax({
				type: "PUT",
				url: apiUrl,
				data: noteData,
				success: editedMessage
			});
		}
		function addedMessage() {
			Controller.showMessage("Thanks, your note has been added");
		}
		function editedMessage() {
			Controller.showMessage("Thanks, your note has been updated");
		}
		
		return{
			add: add,
			edit:edit
		};
		
	}();
	
	var NoteItemView = function() {

		function addNote(note, distance,noteList) {
			
			var tags = note.tags.split(",");
			
			noteItem = '<li><a href="#note_'+note.id+'">';
			noteItem += '<h4>' + note.name + '</h4>';
			noteItem += '<span class="ui-li-count">'+distance+' km</span>';
			noteItem += '<p><i class="icon-tags"></i>';
			for (tag in tags){
				tagLink = $.trim(tags[tag]);
				noteItem += '<span class="tags"><em>'+tagLink+'</em></span>';
			}
			noteItem += '</p>';
			noteItem += '<p>' + note.description + '</p>';
			noteItem += '</a></li>';

			$(noteList).append(noteItem);
			$(noteList).listview("refresh");
		}
		
		return{
			addNote: addNote	
		};
	}();
	var NoteDetailView = function() {

		function createNotePage(note,distance) {
			
			var tags = note.tags.split(",");
			
			var notePage = '<div data-role="page" id="note_'+note.id+'">';
				notePage += '<div data-role="header" data-position="fixed">';
					notePage += '<h2>'+note.name+'</h2>';
					notePage += '<a data-rel="back" data-icon="back">Back</a>';
						notePage += '<div data-role="navbar">';
							notePage += '<ul>';
								notePage += '<li><a class="favourite" id="favBtn_'+note.id+'" data-icon="heart">Fav</a></li>';
								//TODO: native app //notePage += '<li><a id="image_'+note.id+'" data-icon="info">Pics</a></li>';
								notePage += '<li><a href="#map_'+note.id+'" data-icon="mappin">Map</a></li>';
							notePage += '</ul>';
						notePage += '</div>';
				notePage += '</div>';
				notePage += '<div data-role="content">';
				notePage += '<p>'+note.address+'</p>';	
				notePage += '<p>About <strong>'+distance+'</strong> km away.</p>';
				notePage += '<p>'+note.description+'</p>';
				if(tags){
					notePage += tagSection(tags);	
				}
				notePage += ratingSection(); 
				notePage += '</div>';
			notePage += '</div>';

			$('body').append(notePage);
		}
		
		function createMapPage(note){
			var mapPage = '<div data-role="page" id="map_'+note.id+'">';
				mapPage += '<div data-role="header" data-position="fixed">';
					mapPage += '<h2>'+note.name+'</h2>';
					mapPage += '<a data-rel="back" data-icon="back">Back</a>';
				mapPage += '</div>';
				mapPage += '<div data-role="content">';
				mapPage += '<div id="map_canvas_'+note.id+'" style="height:300px;"></div>';
				mapPage += '</div>';
			mapPage += '</div>';
			
			$('body').append(mapPage);
			setMapData(note);
		}
		
		function setMapData(note)
		{
			var mapCanvas = "#map_canvas_"+note.id;
			//$(mapCanvas).gmap({ 'center': new google.maps.LatLng(note.latitude, note.longitude) });
			
			$(mapCanvas).gmap('addMarker', { 'position':  new google.maps.LatLng(note.latitude, note.longitude), 'bounds': false }).click(function() {
				$(mapCanvas).gmap('openInfoWindow', { 'content': note.address }, this);
			});
			
			$(mapCanvas).gmap('option', 'zoom', 16);
			$(mapCanvas).gmap('refresh');
		}
		
		function createImagePage(note){
			
			if(note.image){
				var imagePage = '<div data-role="page" id="image_'+note.id+'">';
					imagePage += '<div data-role="header" data-position="fixed">';
						imagePage += '<h2>'+note.name+'</h2>';
						imagePage += '<a data-rel="back" data-icon="back">Back</a>';
					imagePage += '</div>';
					imagePage += '<div data-role="content">';
					imagePage += '<ul id="Gallery">';
					imagePage += '<li><a href="'+note.image+'"><img src="'+note.image+'" alt="'+note.name+'" /></a></li>';
					imagePage += '</div>';
				imagePage += '</div>';
	
				$('body').append(imagePage);
			}
			
		}
		
		function tagSection(tags){
			var tagSection =  '<div data-role="collapsible" data-theme="a"><h3>Others Like This</h3>';
			for (tag in tags){
				tagLink = $.trim(tags[tag]);
				tagSection += '<a id="tag_'+tagLink+'" data-role="button" data-inline="true" data-mini="true" data-theme="d">'+tagLink+'</a>';
			}
			tagSection += '</div>';
			return tagSection;
		}
		
		function ratingSection(){
			var starSection = '<div data-role="collapsible" data-theme="a"><h3>Rate It!</h3>';
			starSection +='<div class="rating"><span id="star_5">&#9734;</span><div class="rating-label">Awsome</div><span id="star_4">&#9734;</span><span id="star_3">&#9734;</span><span id="star_2">&#9734;</span><span id="star_1">&#9734;</span></div></div>';
			return starSection;
		}
		
		return{
			createNotePage:createNotePage,
			createMapPage:createMapPage
		};
	}();
	var EditNoteView = function() {

		function setDetail(note) {
			$('#editNoteForm #id').val(note.id);
			$('#editNoteForm #name').val(note.name);
			$('#editNoteForm #tags').val(note.tags);
			$('#editNoteForm #description').val(note.description);
			//TODO: native app $('#editNoteForm #image').val(note.image);
		}
		
		return{
			setDetail:setDetail	
		};
	}();
	var AddNoteView = function() {

		function setLocationDetail(position) {
			
			if(position){
				$('#addNoteForm #latitude').val(position.coords.latitude);
				$('#addNoteForm #longitude').val(position.coords.longitude);
			}
		}
		
		return{
			setLocationDetail:setLocationDetail	
		};
	}();
	var AccountNoteItemView = function() {

		function addNote(note, noteList) {
			
			var tags = note.tags.split(",");
			
			noteItem = '<li><a id="accountnote_'+note.id+'" href="#edit">';
			noteItem += '<h4><i class="icon-edit"></i> ' + note.name + '</h4>';
			
			noteItem += '<p><i class="icon-tags"></i>';
			for (tag in tags){
				tagLink = $.trim(tags[tag]);
				noteItem += '<span class="tags"><em>'+tagLink+'</em></span>';
			}
			noteItem += '</p>';
			noteItem += '<p>' + note.description + '</p>';
			noteItem += '</a></li>';

			$(noteList).append(noteItem);
			$(noteList).listview("refresh");
		}
		
		return{
			addNote:addNote	
		};
	}();
	
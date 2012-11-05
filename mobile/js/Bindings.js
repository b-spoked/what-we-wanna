$(function() {
		$( "#address" ).addresspicker();
		$( "#locationAddress" ).addresspicker();
		
		Controller.init();

		/**
		* Event Bindings
		**/
		$( document ).delegate( ".favourite", "click", Controller.bookmarkNote );
		$( document ).delegate( "#refresh", "click", Controller.refreshStoredNotes );
		$( document ).delegate( "#editNoteForm", "submit", Controller.editNote );
		$( document ).delegate( "#addNoteForm", "submit", Controller.completeAndSaveNote );
		$( document ).delegate( "#searchNotes", "submit", Controller.fetchNotes );
		$( document ).delegate( "#settingsForm", "submit", Controller.updateSettings );
		$( document ).delegate( '[id^="accountnote_"]', "click", Controller.editAccountNote );
		$( document ).delegate( '[id^="tag_"]', "click", Controller.searchNotesByTag );
		$( document ).delegate( '#location', "click", Controller.showLocation );
		$( document ).delegate( "#fav", "pageshow", Controller.displayFavourites );
		$( document ).delegate( "#admin", "pageshow", Controller.displayAccountNotes );
		$( document ).delegate( "#noteslist", "pageshow", Controller.refreshNotesList );
		$( document ).delegate( '[id^="star_"]', "tap", Controller.setRating );
});
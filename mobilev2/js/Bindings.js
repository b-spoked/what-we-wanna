$(function() {
	
    $( "#address" ).addresspicker();
	$( "#locationAddress" ).addresspicker();
		
	Controller.init();

	/**
	* Event Bindings
	**/
	$( document ).delegate( "#addNoteForm", "submit", Controller.completeAndSaveNote );
	$( document ).delegate( "#searchNotes", "submit", Controller.fetchFilteredNotes );
    $( document ).delegate( "#settingsForm", "submit", Controller.updateSettings );
    $( document ).delegate( "#editNoteForm", "submit", Controller.saveEditedNote );
    $( document ).delegate( "#addCommentForm", "submit", Controller.saveNoteComment );
    $( document ).delegate( "#bookmarks", "click", Controller.displayBookmarks );
    $( document ).delegate( '[id^="tag_"]', "click", Controller.filterNotesByTag );
    $( document ).delegate( '[id^="edit_"]', "click", Controller.editAccountNote);
    $( document ).delegate( '[id^="fav_"]', "click", Controller.bookmarkNote);
    $( document ).delegate( '[id^="comment_"]', "click", Controller.getComments);
    $( document ).delegate( '[id^="map_"]', "click", Controller.showLocation );
});
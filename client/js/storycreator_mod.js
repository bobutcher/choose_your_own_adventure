(function(ns) {
  'use strict';

  /**
   * This module should handle all of the functions pertaining to the creation
   * of new stories. Including:
   * 1. listening for a new story to be created
   * 2. POST a new story to the ajax database
   * 3. generate UI for working on a story which should include:
   * 		a. list of steps that exist
   * 		b. entry form for new steps
   */

$('#newStoryNameForm').on('submit', function newStoryTrigger(event) {
    event.preventDefault();
    addNewStory($('#new-story-name').val());
});


/**
 * This function should make POST to ajax and add a new story to the database
 * @param {[type]} storyName [the name of the story to create]
 */
function addNewStory(storyName) {
  $.ajax({
    type: 'POST',
    url: '/stories/newstory',
    headers: {authorization: ns.currentToken()},
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({title: storyName}),
    success: function storyPosted(data) {
      $('.stepsList').empty();
      $('.create-story-step').css({display: 'block'});
      ns.storyEditUI(data.title, data.ID);
    },
    error: function errorStoryPosted(xhr) {
      console.log(xhr);
    }
  });
}

ns.storyEditUI = function storyEditUI(storyName, storyID) {
  $('.story-name').text(storyName);
  $('.story-id').val(storyID);
  $('#create-story').css({display: 'none'});
  $('#edit-story').css({display: 'block'});
  $('#parentID').text('Start of story');
};



  window.ns = ns;
})(window.ns || {});

(function(ns) {
  'use strict';
/**
 * These two click handlers are operating the Nav links in the UI.
 * The nav will always be available and clicking on these two options will
 * show either all of the stories that have been created or else will create
 * a new story and add it to the list.
 */

/**
 * When clicked, this function should:
 * 1. Ajax for a list of stories that exist
 * 2. Change the UI to show a list of stories but only after Ajax gets back
 */
  $('.list-stories').on('click', function listStories(event){
    getStoryList();
  });

  function getStoryList() {
    $.ajax({
      type: 'GET',
      url: '/stories/storylist',
      dataType: 'JSON',
      // headers: {authorization: ns.currentToken()},
      success: function recievedStoryList(data) {
        console.log("receivedStoryList: " + data);
        showStoryList(data);
        return data;
      },
      error: function errorStoryList(xhr) {
        console.log(xhr);
      }
    });
  }

  function showStoryList(array){
    array.forEach(function addStoryToList(element){
      var newItem = $('<li>').text(element.title);
      $('#story-list').append(newItem);
    });
    $('#story-list').css({display: 'block'});
  }

/**
 * When clicked, this function should:
 * 1. Change the UI to a prompt asking for a new story title
 * @param  {[type]} '.create-story' [description]
 * @return {[type]}                 [description]
 */
  $('.create-story').on('click', function newStory(event){

  });


  window.ns = ns;
}(window.ns || {}));

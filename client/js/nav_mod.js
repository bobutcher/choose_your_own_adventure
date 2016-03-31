(function(ns) {
  'use strict';
/**
 * These two click handlers are operating the Nav links in the UI.
 * The nav will always be available and clicking on these two options will
 * show either all of the stories that have been created or else will created
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
      success: function gotStoryList(data) {
        console.log(data);
        showStoryList(data);
        return data;
      },
      error: function errorStoryList() {
        console.log('Error on getStoryList fn: ' + xhr);
      }

    });
  }

  function showStoryList(array){
    var item1 = $('<li>').text(array[0].prop1);
    var item2 = $('<li>').text(array[0].prop2);
    $('#story-list')
      .append(item1)
      .append(item2);
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

(function(ns) {
  'use strict';

//This module should handle the moment when a user clicks on one of the
//existing stories from the story list. It should:
//1. make an ajax request for the selected story
//2. clear the UI and replace it with the edit story UI of the selected story

  $('#story-list').on('click', 'li', function chooseStory(event) {
    ajaxForSelectedStory($(this).attr('id'));
  });

  function ajaxForSelectedStory(storyID) {
    $.ajax({
      type: 'GET',
      url: '/stories/' + storyID,
      headers: {authorization: ns.currentToken()},
      dataType: 'json',
      contentType: 'application.json',
      data: JSON.stringify({storyID: storyID}),
      success: function selectedStory(data) {
        editSelectedStory(data);
      },
      error: function errorSelectedStory(xhr) {
        console.log(xhr);
      }
    });
  }

  function editSelectedStory(storyData) {
    $('.stepsList').empty();
    storyData.storySteps.forEach(function addToStepsList(each) {
      ns.updateStepList(
                        storyData.storyID,
                        each.stepID,
                        each.parentID,
                        each.stepText,
                        each.optionAText,
                        each.optionBText,
                        each.optionAID,
                        each.optionBID,
                        each.deadend
      );
    });
    ns.storyEditUI(storyData.title, storyData.storyID);
    $('.create-story-step').css({display: 'none'});
  }

  window.ns = ns;
})(window.ns || {});

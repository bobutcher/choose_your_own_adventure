(function(ns) {
  'use strict';
/**
 * This module should handle everything that need to happen with regards to
 * editing a story. Including:
 * 1. Taking steps from the creation form and adding them to the list of steps
 * 2. POSTing new steps to ajax
 * 3. POSTing (PATCHing?) edited steps to ajax
 */

/**
 * This will listen for the form to be submitted and then it will:
 * 1. POST the new step to Ajax
 * 2. Update the list of steps at the bottom
 */
$('.create-story-step').on('submit', function createNewStep(event) {
  event.preventDefault();
  var stepText = $('#new-step-text').val();
  var choiceA = $('#new-step-option-a').val();
  var choiceB = $('#new-step-option-b').val();
  addNewStep(stepText, choiceA, choiceB);
  updateStepList(stepText, choiceA, choiceB);
});

function addNewStep(stepText, choiceA, choiceB) {
  $.ajax({
    type: 'PATCH',
    url: '/stories/newstep',
    dataType: 'json',
    // data: {steptext: stepText, choiceA: choiceA, choiceB: choiceB},
    success: function newStepAdded(data) {
      console.log('working');
    },
    error: function errorStepAdded(xhr) {
      console.log(xhr);
    }
  });
}


/**
 * This function should take in the values from:
 * 1. The text for the step
 * 2. The text from option A
 * 3. The text from option B
 * And create a new item on the step list with each of those values.
 * @param  {[string]} stepText [text from step editing text field]
 * @param  {[string]} choiceA  [text from step editing choice A field]
 * @param  {[string]} choiceB  [text from step editing choice B field]
 */
function updateStepList(stepText, choiceA, choiceB) {
  $('.stepsList')
    .append(
      $('<li>')
        .append($('<h4>').addClass('stepText').text(stepText)
          .append($('<button>')
                    .attr({id: "12345"})
                    .addClass('editButton')
                    .text('edit')))
        .append($('<p>').addClass('choiceA').text(choiceA)
          .append($('<button>')
                    .attr({id: "12345"})
                    .addClass('editButton')
                    .text('edit'))
          .append($('<button>')
                    .attr({id: "11112"})
                    .addClass('addStepButton')
                    .text('+')))
        .append($('<p>').addClass('choiceB').text(choiceB)
          .append($('<button>')
                    .attr({id: "54321"})
                    .addClass('editButton')
                    .text('edit'))
          .append($('<button>')
                    .attr({id: "11113"})
                    .addClass('addStepButton')
                    .text('+')))
    );
}




  window.ns = ns;
})(window.ns || {});

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
  var storyID = $('.story-id').val();
  var stepText = $('#new-step-text').val();
  var choiceA = $('#new-step-option-a').val();
  var choiceB = $('#new-step-option-b').val();
  addNewStepToAjax(storyID, stepText, choiceA, choiceB);
  $('#new-step-text').val('');
  $('#new-step-option-a').val('');
  $('#new-step-option-b').val('');
  $('#parentID').text('');
  $('.create-story-step').css({display: 'none'});
});

function addNewStepToAjax(storyID, stepText, choiceA, choiceB) {
  $.ajax({
    type: 'PATCH',
    url: '/stories/newstep',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({storyID: storyID, steptext: stepText, choiceA: choiceA, choiceB: choiceB}),
    success: function newStepAdded(data) {
      updateStepList(stepText, choiceA, choiceB, data.optionAID, data.optionBID);
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
function updateStepList(stepText, choiceA, choiceB, optionAID, optionBID) {
  var text = $('<p>')
                .addClass('stepText')
                .text(stepText);
  var textEditButton = $('<button>')
                      .addClass('editButton')
                      .text('edit')
                      .css({display: 'block'});
  var textEdit = $('<input>')
                      .addClass('editOption textEdit')
                      .val(stepText)
                      .css({display: 'none'});
  var optionA = $('<p>')
                  .attr({id: optionAID})
                  .addClass('choiceA')
                  .text(choiceA);
  var optionAEdit = $('<input>')
                      .addClass('editOption editOptionA')
                      .val(choiceA)
                      .css({display: 'none'});
  var addStepButtonA = $('<button>')
                          .addClass('addStepButtonA')
                          .text('+');
  var optionB = $('<p>')
                  .attr({id: optionBID})
                  .addClass('choiceB')
                  .text(choiceB);
  var optionBEdit = $('<input>')
                      .addClass('editOption editOptionB')
                      .val(choiceB)
                      .css({display: 'none'});
  var addStepButtonB = $('<button>')
                          .addClass('addStepButtonB')
                          .text('+');
  var newStepListItem = $('<li>')
                          .append($('<section>')
                            .append(text)
                            .append(textEditButton)
                            .append(textEdit)
                          )
                          .append($('<section>')
                            .append(optionA)
                            .append(optionAEdit)
                            .append(addStepButtonA)
                          )
                          .append($('<section>')
                            .append(optionB)
                            .append(optionBEdit)
                            .append(addStepButtonB)
                          );
  $('.stepsList')
    .append(newStepListItem);
}


/**
 * Listens for a click on the edit button for a step and provides the input
 * field to end all three pieces (text, opt1, opt2).
 */
$('.stepsList').on('click', '.editButton', function editText(event) {
  $(this).closest('li').find('p').css({display: 'none'});
  $(this).closest('li').find('.editOption').css({display: 'block'});
});

/**
 * Listens for 'enter' on the inputs for editing a step and toggles back to
 * the text instead of the inputs.
 */
$('.stepsList').on('keyup', '.editOption', function stopEditText(event) {
  if(event.keyCode === 13){
    $('.editOption').css({display: 'none'});
    $(this).closest('li').find('p').css({display: 'block'});
    $(this).closest('li').find('.editOption').css({display: 'none'});
    $(this).closest('li').find('.stepText')
      .text(
        $(this).closest('li').find('.textEdit').val()
      );
    $(this).closest('li').find('.choiceA')
      .text(
        $(this).closest('li').find('.editOptionA').val()
      );  
    $(this).closest('li').find('.choiceB')
      .text(
        $(this).closest('li').find('.editOptionB').val()
      );
  }
});

/**
 * These three are for adding a new step after the chosen option.
 */
$('.stepsList').on('click', '.addStepButtonA', function addNewStepToA() {
    addNewStep($(this).closest('section').find('.choiceA').attr('id'));
});

$('.stepsList').on('click', '.addStepButtonB', function addNewStepToB() {
    addNewStep($(this).closest('section').find('.choiceB').attr('id'));
});

function addNewStep(IDNumber) {
  $('#parentID').text('Parent ID#: ' + IDNumber);
  $('.create-story-step').css({display: 'block'});

}


  window.ns = ns;
})(window.ns || {});

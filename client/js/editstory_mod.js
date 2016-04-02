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
  var parentID = $('#parentID').text();
  var stepText = $('#new-step-text').val();
  var choiceA = $('#new-step-option-a').val();
  var choiceB = $('#new-step-option-b').val();
  var deadend = $('#deadend').is(':checked');
  addNewStepToAjax(storyID, parentID, stepText, choiceA, choiceB, deadend);
  $('#new-step-text').val('');
  $('#new-step-option-a').val('');
  $('#new-step-option-b').val('');
  $('.create-story-step').css({display: 'none'});
  $('#' + parentID).closest('section').find('button').remove();
});

function addNewStepToAjax(storyID, parentID, stepText, choiceA, choiceB, deadend) {
  $.ajax({
    type: 'PATCH',
    url: '/stories/newstep',
    headers: {authorization: ns.currentToken()},
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({storyID: storyID, parentID: parentID, steptext: stepText, choiceA: choiceA, choiceB: choiceB, deadend: deadend}),
    success: function newStepAdded(data) {
      updateStepList(parentID, stepText, choiceA, choiceB, data.optionAID, data.optionBID, deadend);
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
function updateStepList(parentID, stepText, choiceA, choiceB, optionAID, optionBID, deadend) {
  var parent = $('<aside>')
                .addClass('parentID')
                .css({display: 'none'})
                .text(parentID);
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
  if (!deadend) {
    $('.stepsList')
      .append($('<li>')
                  .append(parent)
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
                  )
      );
  }
  else {
    $('.stepsList')
      .append($('<li>')
                  .append(parent)
                  .append($('<section>')
                    .append(text)
                    .append(textEditButton)
                    .append(textEdit)
                  )
      );
  }
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
    newEditsAjax( $('.story-id').val(),
                  $(this).closest('li').find('.parentID').text(),
                  $(this).closest('li').find('.stepText').text(),
                  $(this).closest('li').find('.choiceA').text(),
                  $(this).closest('li').find('.choiceB').text()
                );
  }
});

function newEditsAjax(storyID, parentID, stepText, optionA, optionB) {
  $.ajax({
    type: 'PATCH',
    url: '/stories/editstep',
    headers: {authorization: ns.currentToken()},
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({
                  storyID: storyID,
                  parentID: parentID,
                  steptext: stepText,
                  optionA: optionA,
                  optionB: optionB}),
    success: function appliedEdits(data) {
      console.log(data);
    },
    error: function errorAppliedEdits(xhr) {
      console.log(xhr);
    }
  });
}

/**
 * These three are for adding a new step after the chosen option.
 */
$('.stepsList').on('click', '.addStepButtonA', function addNewStepToA() {
    addNewStep($(this).closest('section').find('.choiceA').attr('id'));
    $(this).css({display: 'none'});
});

$('.stepsList').on('click', '.addStepButtonB', function addNewStepToB() {
    addNewStep($(this).closest('section').find('.choiceB').attr('id'));
    $(this).css({display: 'none'});
});

function addNewStep(IDNumber) {
  $('#parentID').text(IDNumber);
  $('.create-story-step').css({display: 'block'});

}


  window.ns = ns;
})(window.ns || {});

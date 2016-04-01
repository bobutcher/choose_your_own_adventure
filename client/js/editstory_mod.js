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
  console.log('submit is happening');
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
    contentType: 'application/json',
    data: JSON.stringify({steptext: stepText, choiceA: choiceA, choiceB: choiceB}),
    success: function newStepAdded(data) {
      console.log(data);
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
  var text = $('<p>')
                .addClass('stepText')
                .text(stepText);
  var textEditButton = $('<button>')
                      .attr({id: '1'})
                      .addClass('editButton')
                      .text('edit')
                      .css({display: 'block'});
  var textEdit = $('<input>')
                      .addClass('editOption textEdit')
                      .val(stepText)
                      .css({display: 'none'});
  var optionA = $('<p>')
                  .addClass('choiceA')
                  .text(choiceA);
  var optionAEdit = $('<input>')
                      .addClass('editOption editOptionA')
                      .val(choiceA)
                      .css({display: 'none'});
  var addStepButtonA = $('<button>')
                          .attr({id: '2'})
                          .addClass('addStepButton')
                          .text('+');
  var optionB = $('<p>')
                  .addClass('choiceB')
                  .text(choiceB);
  var optionBEdit = $('<input>')
                      .addClass('editOption editOptionB')
                      .val(choiceB)
                      .css({display: 'none'});
  var addStepButtonB = $('<button>')
                          .attr({id: '2'})
                          .addClass('addStepButton')
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

$('.stepsList').on('click', '.editButton', function editText(event) {
  $(this).closest('section').find('p').css({display: 'none'});
  $(this).closest('li').find('.editOption').css({display: 'block'});
});

$('.stepsList').on('keyup', '.editOption', function stopEditText(event) {
  if(event.keyCode === 13){
    $('.editOption').css({display: 'none'});
    $('.stepText').css({display: 'block'}).text($('.textEdit').val());
    $('.choiceA').css({display: 'block'}).text($('.editOptionA').val());
    $('.choiceB').css({display: 'block'}).text($('.editOptionB').val());
  }
});



  window.ns = ns;
})(window.ns || {});

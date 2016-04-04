(function(ns) {
  'use strict';
  var token;

/**
 * This function listens for a form submission and does three things:
 * 1. It sends an ajax request to the server asking for a token
 * 2. It stores that token for later use
 * 3. It removes the login UI and replaces it with the story creation UI
 * @param  {[type]} '#loginform'
 */
  $('#loginform').on('submit', function logIn(event){
    event.preventDefault();
    getToken(initStoryUI);
  });

  function getToken(callback){
    $.ajax({
      type: 'POST',
      url: '/login',
      dataType: 'JSON',
      success: function gotToken(data){
        token = data;
        callback();
      },
      error: function noToken(xhr){
        console.log('Error on getToken fn: ' + xhr);
      }
    });
  }

  ns.currentToken = function currentToken(){
    return token;
  };

  function initStoryUI() {
    $('#login').css({display: 'none'});
    $('#mainNav').css({display: 'block'});
  }

  $('#loginform').on('mousedown', '#loginbutton', function styleLoginClick() {
    $(this).css({border: 'solid #97CC59 1px'});
  });

  $('#loginform').on('mouseleave', '#loginbutton', function styleLoginClick() {
    $(this).css({border: 'solid black 1px'});
  });



  window.ns = ns;
})(window.ns || {});

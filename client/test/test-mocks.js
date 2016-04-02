
/**
 * This file mocks out Ajax calls by returning fake data from .json
 * files defined in the test/mocks directory
 *
 *  NOTE: All paths/methods/data in here is made up and incomplete
 *        You should update this file to document your API!
 */

/**
 * This `if` condition restricts the mocking to only happen when the
 * query string includes: debug
 * For example: going to localhost:8080?debug WILL enable mocking
 *              going to localhost:8080 WILL NOT enable mocking
 */
if (window.location.search.match(/[^a-z]debug([^a-z]|$)/i)) {

    // Get token
    $.mockjax({
      url: '/login',
      type: 'POST',
      proxy: 'test/mocks/token.json'
    });

    // Retrieve the list of stories
    $.mockjax({
      url: '/stories/storylist',
      type: 'GET',
      proxy: 'test/mocks/storylist.json'
    });

    // POST a new story
    $.mockjax({
      url: '/stories/newstory',
      type: 'POST',
      proxy: 'test/mocks/newstory.json'
    });

    // add a new step to a story
    $.mockjax({
      url: '/stories/newstep',
      type: 'PATCH',
      proxy: 'test/mocks/newstep.json'
    });

    // edit a step in a story
    $.mockjax({
      url: '/stories/editstep',
      type: 'PATCH',
      proxy: 'test/mocks/stepedit.json'
    });

}

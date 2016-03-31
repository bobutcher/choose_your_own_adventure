
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
      type: 'GET',
      proxy: 'test/mocks/token.json'
    });

    // Retrieve a story
    $.mockjax({
      url: '/stories/storylist',
      type: 'GET',
      proxy: 'test/mocks/storylist.json'
    });

    // Retrieve all steps for a story
    $.mockjax({
      url: '/steps-in-a-story',
      type: '??',
      proxy: 'mocks/story-steps.json'
    });

    // Create a new step in a story
    $.mockjax({
      url: '/step-me-up',
      type: '??',
      proxy: 'mocks/new-step.json'
    });

    // Update a step in a story
    $.mockjax({
      url: '/step-update',
      type: '??',
      proxy: 'mocks/step-update.json'
    });

}

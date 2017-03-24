# enzyme-wait
Wait for an async element to appear when performing integration tests with enzyme.
Returns a promise which resolves with the root component you performed your search on.

**NEW**: There is now a fully working example repo using both Promises and async/await.

## How to use:

`````javascript
createWaitForElement(
    enzymeSelector,
    /*Optional*/ timeOut,
    /*Optional*/ intervalDuration
)(componentToSearchOn)
    .then(/* ... */)
    .catch(/* ... */)
`````

## Example Usage (Promises):

`````javascript
import React from 'react';
import { mount } from 'enzyme'
import { createWaitForElement } from 'enzyme-wait';

/**
 * The component you want to test. Assume it displays
 * the string "ready" after performing some async action
 * which takes time.
 */
import SampleComponent from '...';

const waitForSample = createWaitForElement('#sample-ready');

const component = mount(<SampleComponent />);

it('displays ready once it is ready', ()=> {
    waitForSample(component)
        .then( copmonent => expect(copmonent.text()).to.include('ready') );
});
`````

## Example Usage (async/await)

The same as above but using async/await instead of Promises:
`````javascript
it('displays ready once it is ready', async ()=> {
    const componentReady = await waitForSample(component);
    expect(copmonentReady.text()).to.include('ready');
});
`````

## Chaining promises

If you have multiple async actions happening, just make sure to always return a Promise which
resolves with the root component. This way you can create nice looking chains and avoid callback hell.

Example:

`````javascript
const component = mount(<SampleComponent />);

it('displays ready after multiple interactions', ()=> {
    createWaitForElement('#sample-ready')(component)
        .then( /* do something and return a resolved promise with the comp */ )
        .then( /* do something and return a resolved promise with the comp */ )
        .then( createWaitForElement('#another-component-ready') )
        .then( component => expect(component.text().to.include('ready') );
});

`````

## Checking out the example repo

There is now a working example inside this repo using both the Promise-approach as well as the async/await-approach.

To play around with this example you can:

1. clone this repo
1. run `npm install && npm run dist` on the root repo (this is required to create a lib version of this package which is listed in the example's dependencies )
1. go to the example folder `cd example`
1. in there, run `npm install && npm start`
1. open your browser at `http://localhost:90000` to see the example or run `npm test` to see the tests working.

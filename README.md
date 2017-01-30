# enzyme-wait
Wait for an async element to appear when performing integration tests with enzyme. 
Returns a promise which resolves with the root component you perfomerd your search on.

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

## Example Usage:

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

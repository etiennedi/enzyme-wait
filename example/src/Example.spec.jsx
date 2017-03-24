import React from 'react';
import { mount } from 'enzyme';
import { createWaitForElement } from 'enzyme-wait';

import Example from './Example';

const waitForListItem = createWaitForElement('.list-item');

it('doesnt show any list items in the beginning', ()=> {
  const component = mount(<Example />);
  expect(component.find('.list-item')).toHaveLength(0)
})

it('shows a Loading message in the beginning', ()=> {
  const component = mount(<Example />);
  expect(component.text()).toContain('Loading')
});

describe('examples with PROMISES', ()=> {
  it('shows list items after some time', ()=> {
    const component = mount(<Example />);
    return waitForListItem(component).then(
      (componentReady)=> {
        expect(componentReady.find('.list-item')).toHaveLength(3)
      }
    )
  })

  it('doesnt show loading anymore', ()=> {
    const component = mount(<Example />);
    return waitForListItem(component).then(
      (componentReady)=> {
        expect(componentReady.text()).not.toContain('Loading')
      }
    )
  })
})

describe('examples with ASYNC / AWAIT ',  ()=> {
  it('shows list items after some time', async ()=> {
    const component = mount(<Example />);
    const componentReady = await waitForListItem(component);
    expect(componentReady.find('.list-item')).toHaveLength(3)
  })

  it('doesnt show loading anymore', async ()=> {
    const component = mount(<Example />);
    const componentReady = await waitForListItem(component);
    expect(componentReady.text()).not.toContain('Loading')
  })
})

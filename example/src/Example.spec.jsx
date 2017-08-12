import React from 'react';
import { mount } from 'enzyme';
import {
  createWaitForElement,
  createWaitForText,
} from 'enzyme-wait';

import Example from './Example';


it('shows a Loading message in the beginning', ()=> {
  const component = mount(<Example />);
  expect(component.text()).toContain('Loading')
});

describe('createWaitForElement', () => {
  const waitForListItem = createWaitForElement('.list-item');

  it('doesnt show any list items in the beginning', ()=> {
    const component = mount(<Example />);
    expect(component.find('.list-item')).toHaveLength(0)
  });


  describe('examples with PROMISES', ()=> {
    it('shows list items after some time', ()=> {
      const component = mount(<Example />);
      return waitForListItem(component).then(
        (componentReady)=> {
          expect(componentReady.find('.list-item')).toHaveLength(3)
        }
      )
    });

    it('doesnt show loading anymore', ()=> {
      const component = mount(<Example />);
      return waitForListItem(component).then(
        (componentReady)=> {
          expect(componentReady.text()).not.toContain('Loading')
        }
      )
    });
  });

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
  });
});

describe('createWaitForText', () => {
  const waitForText = createWaitForText('first item');

  it('doesnt show any text in the beginning', ()=> {
    const component = mount(<Example />);
    expect(component.text()).not.toContain('first item')
  });

  describe('examples with PROMISES', ()=> {
    it('shows list item test after some time', ()=> {
      const component = mount(<Example />);
      return waitForText(component).then(
        (componentReady)=> {
          expect(componentReady.text()).toContain('first item')
        }
      )
    });

    it('doesnt show loading anymore', ()=> {
      const component = mount(<Example />);
      return waitForText(component).then(
        (componentReady)=> {
          expect(componentReady.text()).not.toContain('Loading')
        }
      )
    });
  });

  describe('examples with ASYNC / AWAIT ',  ()=> {
    it('shows list item text after some time', async ()=> {
      const component = mount(<Example />);
      const componentReady = await waitForText(component);
      expect(componentReady.text()).toContain('first item')
    })

    it('doesnt show loading anymore', async ()=> {
      const component = mount(<Example />);
      const componentReady = await waitForText(component);
      expect(componentReady.text()).not.toContain('Loading')
    })
  });
});

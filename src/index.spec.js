import { createWaitForElement } from './index'

const wait = createWaitForElement('mockSelector');

describe('wrong usage', () => {
  it('throws an Assertion error if no root component is specified.', () => {
    wait(undefined)
      .catch(err => expect(err).toMatchSnapshot('no component'))
  });

  it('throws an Assertion error if a root component cannot be found', () => {
    const mockComponent = {
      length: 0,
    };

    wait(mockComponent)
      .catch(err => expect(err).toMatchSnapshot('component length zero'))
  });

  it('throws an Assertion error if no selector is specified', () => {

    const wait = createWaitForElement(undefined);
    wait()
      .catch(err => expect(err).toMatchSnapshot('no selector'))
  });
});

describe('core logic', () => {
  describe('target component always ready', () => {

    let mockComponent;

    beforeEach(() => {
      mockComponent = {
        find: jest.fn().mockReturnValue({ length: 1 }),
        length: 1,
      }
    });

    it('resolves after calling find on the root component with the selector', () => {
      return wait(mockComponent)
        .then(() => {
          expect(mockComponent.find).toHaveBeenCalledWith('mockSelector')
        })
    })
  });

  describe('target component never ready', () => {

    let mockComponent;

    beforeEach(() => {
      mockComponent = {
        find: jest.fn().mockReturnValue({ length: 0 }),
        length: 1,
      }
    });

    it('rejects after calling find on the root component with the selector', () => {
      return wait(mockComponent)
        .catch(() => {
          expect(mockComponent.find).toHaveBeenCalledWith('mockSelector')
        })
    });

    it('rejects after calling find on the root component 201 times', () => {
      // one initial call, then 200 calls (2000ms / 10ms = 200 times)

      return wait(mockComponent)
        .catch(()=> {
          expect(mockComponent.find).toHaveBeenCalledTimes(201)
        })
    });

    it('rejects after calling find on the root component with the selector', () => {
      return wait(mockComponent)
        .catch(e => {
          expect(e).toMatchSnapshot('run into timeout')
        })
    })
  });

  describe('target component ready after a couple of tries', () => {

    let mockComponent;
    beforeEach(() => {

      const findMock = jest
        .fn(()=> ({ length: 1 }))
        .mockReturnValueOnce(()=> ({ length: 0 }))
        .mockReturnValueOnce(()=> ({ length: 0 }))
        .mockReturnValueOnce(()=> ({ length: 0 }));

      mockComponent = {
        find: findMock,
        length: 1,
      }
    });

    it('resolves after calling find on the root component with the selector', () => {
      return wait(mockComponent)
        .then(() => {
          expect(mockComponent.find).toHaveBeenCalledWith('mockSelector')
        })
    });

    it('calls find on the root component 4 times, then resolves', () => {
      // three unsuccessful calls, then one successfull call to resolve

      return wait(mockComponent)
        .then(()=> {
          expect(mockComponent.find).toHaveBeenCalledTimes(4)
        })
    });
  })
});

import AssertionError from 'assertion-error';

const DISPLAY_NAME = 'waitForElement';

export const createWaitForElement = (selector, maxTime = 2000, interval = 10) => rootComponent => {

  // Check correct usage
  if (!selector) {
    return Promise.reject(new AssertionError(`No selector specified in ${DISPLAY_NAME}.`));
  }

  if (!rootComponent) {
    return Promise.reject(new AssertionError(`No root component specified in ${DISPLAY_NAME}.`));
  }

  if (!rootComponent.length) {
    return Promise.reject(new AssertionError(`Specified root component in ${DISPLAY_NAME} not found.`));
  }


  // Race component search against maxTime
  return new Promise((resolve, reject) => {

    let remainingTime = maxTime;

    const intervalId = setInterval(() => {
      if (remainingTime < 0) {
        clearInterval(intervalId);
        return reject(new AssertionError(`Expected to find ${selector} within ${maxTime}ms, but it was never found.`))
      }

      const targetComponent = rootComponent.update().find(selector);
      if (targetComponent.length) {
        clearInterval(intervalId);
        return resolve(targetComponent);
      }

      remainingTime = remainingTime - interval;
    }, interval)
  });
};

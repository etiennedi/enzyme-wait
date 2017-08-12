// Node modules
import AssertionError from 'assertion-error';

// Constants
const DISPLAY_NAME_ELEMENT = 'waitForElement';
const DISPLAY_NAME_TEXT = 'waitForText';

const DEFAULT_MAX_TIME = 2000;
const DEFAULT_INTERVAL = 10;

export const createWaitForElement = (selector, maxTime = DEFAULT_MAX_TIME, interval = DEFAULT_INTERVAL) => rootComponent => {

  // Check correct usage
  if (!selector) {
    return Promise.reject(new AssertionError(`No selector specified in ${DISPLAY_NAME_ELEMENT}.`));
  }

  if (!rootComponent) {
    return Promise.reject(new AssertionError(`No root component specified in ${DISPLAY_NAME_ELEMENT}.`));
  }

  if (!rootComponent.length) {
    return Promise.reject(new AssertionError(`Specified root component in ${DISPLAY_NAME_ELEMENT} not found.`));
  }

  // Race component search against maxTime
  return new Promise((resolve, reject) => {

    let remainingTime = maxTime;

    const intervalId = setInterval(() => {
      if (remainingTime < 0) {
        clearInterval(intervalId);
        return reject(new AssertionError(`Expected to find ${selector} within ${maxTime}ms, but it was never found.`))
      }

      const targetComponent = rootComponent.find(selector);
      if (targetComponent.length) {
        clearInterval(intervalId);
        return resolve(rootComponent);
      }

      remainingTime = remainingTime - interval;
    }, interval)
  });
};

export const createWaitForText = (text, maxTime = DEFAULT_MAX_TIME, interval = DEFAULT_INTERVAL) => rootComponent => {
  // Check correct usage
  if (!text) {
    return Promise.reject(new AssertionError(`No text specified in ${DISPLAY_NAME_TEXT}.`));
  }

  if (!rootComponent) {
    return Promise.reject(new AssertionError(`No root component specified in ${DISPLAY_NAME_TEXT}.`));
  }

  if (!rootComponent.length) {
    return Promise.reject(new AssertionError(`Specified root component in ${DISPLAY_NAME_TEXT} not found.`));
  }

  // Reace text search against maxTime
  return new Promise((resolve, reject) => {

    let remainingTime = maxTime;

    const intervalId = setInterval(() => {
      if (remainingTime < 0) {
        clearInterval(intervalId);
        return reject(new AssertionError(`Expected to find ${text} within ${maxTime}ms, but it was never found.`))
      }

      const hasText = rootComponent.text().includes(text);
      if (hasText) {
        clearInterval(intervalId);
        return resolve(rootComponent);
      }

      remainingTime = remainingTime - interval;
    }, interval)
  });
};

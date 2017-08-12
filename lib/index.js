'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWaitForText = exports.createWaitForElement = undefined;

var _assertionError = require('assertion-error');

var _assertionError2 = _interopRequireDefault(_assertionError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constants
const DISPLAY_NAME_ELEMENT = 'waitForElement'; // Node modules

const DISPLAY_NAME_TEXT = 'waitForText';

const DEFAULT_MAX_TIME = 2000;
const DEFAULT_INTERVAL = 10;

const createWaitForElement = exports.createWaitForElement = function (selector) {
  let maxTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_MAX_TIME;
  let interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_INTERVAL;
  return rootComponent => {

    // Check correct usage
    if (!selector) {
      return Promise.reject(new _assertionError2.default(`No selector specified in ${DISPLAY_NAME_ELEMENT}.`));
    }

    if (!rootComponent) {
      return Promise.reject(new _assertionError2.default(`No root component specified in ${DISPLAY_NAME_ELEMENT}.`));
    }

    if (!rootComponent.length) {
      return Promise.reject(new _assertionError2.default(`Specified root component in ${DISPLAY_NAME_ELEMENT} not found.`));
    }

    // Race component search against maxTime
    return new Promise((resolve, reject) => {

      let remainingTime = maxTime;

      const intervalId = setInterval(() => {
        if (remainingTime < 0) {
          clearInterval(intervalId);
          return reject(new _assertionError2.default(`Expected to find ${selector} within ${maxTime}ms, but it was never found.`));
        }

        const targetComponent = rootComponent.find(selector);
        if (targetComponent.length) {
          clearInterval(intervalId);
          return resolve(rootComponent);
        }

        remainingTime = remainingTime - interval;
      }, interval);
    });
  };
};

const createWaitForText = exports.createWaitForText = function (text) {
  let maxTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_MAX_TIME;
  let interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_INTERVAL;
  return rootComponent => {
    // Check correct usage
    if (!text) {
      return Promise.reject(new _assertionError2.default(`No text specified in ${DISPLAY_NAME_TEXT}.`));
    }

    if (!rootComponent) {
      return Promise.reject(new _assertionError2.default(`No root component specified in ${DISPLAY_NAME_TEXT}.`));
    }

    if (!rootComponent.length) {
      return Promise.reject(new _assertionError2.default(`Specified root component in ${DISPLAY_NAME_TEXT} not found.`));
    }

    // Reace text search against maxTime
    return new Promise((resolve, reject) => {

      let remainingTime = maxTime;

      const intervalId = setInterval(() => {
        if (remainingTime < 0) {
          clearInterval(intervalId);
          return reject(new _assertionError2.default(`Expected to find ${text} within ${maxTime}ms, but it was never found.`));
        }

        const hasText = rootComponent.text().includes(text);
        if (hasText) {
          clearInterval(intervalId);
          return resolve(rootComponent);
        }

        remainingTime = remainingTime - interval;
      }, interval);
    });
  };
};
/**
 * Misc functions.  Consider replacing this file with a library such as underscore or lodash, if it grows large.
 */

/**
 * @name isFunction
 * @description
 * Determines if a reference is a `Function`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Function`.
 */
function isFunction(value) {
  return typeof value === 'function';
}

module.exports = {
  isFunction : isFunction
};
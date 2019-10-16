export default function match(defaultValue, ...matchers) {
  /* eslint-disable no-restricted-syntax */
  for (const [condition, value] of matchers) {
    if (condition) {
      return value;
    }
  }
  /* eslint-enable no-restricted-syntax */

  return defaultValue;
}

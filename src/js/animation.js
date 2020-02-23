/**
 *  sleep function implementation
 * default value = 200ms
 */
const sleep = (time = 200) => {
  return new Promise(resolve => setTimeout(() => resolve(true), time));
};

/**
 * Generate random numbers between a certain range of intergers
 * @param {number}    max Maximum range
 * @param {number}    min Minimum range. Defaults to 0
 * @return {number}
 */
export default (max, min = 0): number => Math.floor(min + (Math.random() * (max - min)));

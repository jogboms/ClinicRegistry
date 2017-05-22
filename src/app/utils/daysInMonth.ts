/**
 * @see http://stackoverflow.com/questions/315760/what-is-the-best-way-to-determine-the-number-of-days-in-a-month-with-javascript
 */
export default function daysInMonth(m, y) { //m is 1-based, feb = 2
  return 31 - (--m ^ 1? m % 7 & 1:  y & 3? 3: y % 25? 2: y & 15? 3: 2);
}
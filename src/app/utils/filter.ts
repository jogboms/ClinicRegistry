export let filter = (date, month, year) => {
  const _date = new Date(date);
  if((_date.getMonth()+1) === parseInt(month)
    && (_date.getFullYear()) === parseInt(year)) {
    return true;
  }
  return false;
};

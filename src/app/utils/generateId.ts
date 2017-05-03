export let generateId = (i, x, y, z) => {
  return y+'/'+x+'/'+i+'/'+z;
  // return y+'|'+x+'|'+i;
};

export let generateIdOld = (size) => {
  let date = new Date();
  let m:any = date.getMonth()+1;
  if(m < 10) m = '0'+m;

  size = (size < 10) ? '000'+size : (size < 100) ? '00'+size : (size < 1000) ? '0'+size : size;

  let code = date.getFullYear()+'|'+m+'|'+size;
  return code;
};

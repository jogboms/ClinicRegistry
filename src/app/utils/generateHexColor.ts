export let generateHexColor = () => {
  return '#'+'abcd234cd789abcd'.split('').map((v,i,a) => {
    return i>5 ? null : a[Math.floor(Math.random()*16)]
  }).join('');
  // return '#'+'abcd23456789abcd'.split('').map((v,i,a) => {
  //   return i>5 ? null : a[Math.floor(Math.random()*16)]
  // }).join('');
  // return '#'+'abcd456789abcdef'.split('').map((v,i,a) => {
  //   return i>5 ? null : a[Math.floor(Math.random()*16)]
  // }).join('');
  // return '#'+'0123456789abcdef'.split('').map((v,i,a) => {
  //   return i>5 ? null : a[Math.floor(Math.random()*16)]
  // }).join('');
};

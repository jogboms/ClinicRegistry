export function redirect(ext = ''){
  let d = (window.location.origin+window.location.pathname).split('index.html')

  window.location.href = d[0]+'index.html'+(ext.length ? '#/'+ext : '');
}

export function reload(){
  let d = (window.location.origin+window.location.pathname).split('index.html')

  window.location.href = d[0]+'index.html'+window.location.hash;
}


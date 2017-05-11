// Global Object libraries
if(typeof require != 'undefined'){
  window.fs = require('fs');
  window.jay = { name: 'jay' };
  console.log(window);
  // window.jQuery = window.$ = require('jquery');
}

// Node-Webkit environment
if(typeof nw !== 'undefined'){
  var win = nw.Window.get();

  var app = {
    name : 'ClinicRegistry'
  }
}

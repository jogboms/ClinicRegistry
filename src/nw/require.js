// import * as $ from 'jquery';
// Global Object libraries
if(typeof require != 'undefined'){
  window.fs = require('fs');

  // window.jQuery = window.$ = require('jquery');
  // window.jQuery = window.$ = require('jquery')(window);
}

// Node-Webkit environment
if(typeof nw !== 'undefined'){
  var win = nw.Window.get();

  var app = {
    name : 'ClinicRegistry'
  }
}

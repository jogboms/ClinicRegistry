import restate, { Storage } from './restate';

var data = {name: 'I am ReState'};
var DB = {};
var storage: Storage = {
  set: (key, value) => DB[key] = value,
  get: (key) => DB[key],
  remove: () => null,
  clear: () => null
}
var config = {
  storage: storage
}
// console.log(restate()((state) => state)(undefined, {type: null}));
// console.log(restate()((state) => state)());
// console.log(restate()((state) => state)(data, {type: null}));

const test = require('tape');

test('persist test', (t) => {
  // t.plan(1);

  // var data = {name: 'I am ReState'};

  t.equal(restate()((state) => state)(data, {type: null}), data);

  setTimeout(function () {
    t.equal(restate()((state) => console.log(state))(undefined, {type: null}), data);
  }, 1000);
  t.end();
});

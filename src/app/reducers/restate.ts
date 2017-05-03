/**
 * Persist ngRx States on page reloads
 *
 * e.g.
 * const config = {
 *   states: ['reducer_name', ..., 'more_reducer_names'],
 *   storage: LocalStorage, // Default
 *   delay: 5000
 * }
 * compose(restate(config), combineReducers)({'reducer_name': (state, action) => {}, ..., 'more_reducer_names': (state, action) => {}})
 */

/**
 * Interface for which all forms of custom storage providers must abide to
 */
export interface Storage {
  /**
   * Set a value to a key
   * @param {string} key   Unique Identifier for the value on storage
   * @param {string} value Value to store
   */
  set(key: string, value: string): void;
  /**
   * Retrieve a value from storage
   * @param  {string} key Unique Identifier for the value on storage
   * @return {string}     Content of value
   */
  get(key): string;
  /**
   * Remove a value from storage
   * @param {any} key Unique Identifier for the value on storage
   */
  remove(key: any): void;
  /**
   * Remove all contents from store
   */
  clear(): void;
}

/**
 * Interface for which Restate's Configuration must abide to
 */
export interface RestateConfig {
  /**
   * States to Re-state on page reload. The names should tally with the Original state's name in the store.
   * If left unassigned, All states is Re-state'd back to the Store. Optional.
   * @type {Array<string>}
   */
  states?: string[];
  /**
   * Storage type to use in Persisting state. Should be of key-value type.
   * Defaults to localStorage. Optional.
   * @type {Storage}
   */
  storage?: Storage;
  /**
   * Debounce delay when persisting states to storage. Delay in milliseconds.
   * Defaults to 3500. Optional.
   * @type {number}
   */
  delay?: number;
}

/**
 * window.localStorage implementation of a storage provider
 * defaults to a plain object storage for non-window environments
 * @type {Storage}
 */
/**
 * Mock storage object for non-window environment.
 * @type {Object}
 */
var MOCK_Storage = {};
const LocalStorage: Storage = {
  set: (key, value) => {
    typeof window !== 'undefined' ?
      localStorage.setItem(key, value) : MOCK_Storage[key] = value;
  },
  get: (key) => {
    return typeof window !== 'undefined' ?
      localStorage.getItem(key) : MOCK_Storage[key];
  },
  remove: (key) => {
    typeof window !== 'undefined' ?
      localStorage.removeItem(key) : delete MOCK_Storage[key];
  },
  clear: () => {
    typeof window !== 'undefined' ?
      localStorage.clear() : MOCK_Storage = {};
  }
}
/**
 * Default configurations for Restate
 * @type {RestateConfig}
 */
const defaults: RestateConfig = {
  states: undefined,
  storage: LocalStorage,
  delay: 3500
}
/**
 * Higher-order function that returns the Meta-Reducer
 * @param {RestateConfig = defaults} config Configuration for Meta-Reducer
 * @returns {Function}
 */
export function restate(config: RestateConfig = {}) {
  config = Object.assign({}, defaults, config);
  return (reducer) => {
    const state = {}, key = '__RESTATE__', style = ['color:green;font-weight:700', 'font-weight:normal'],
    save = (state = {}) => {
      if(config.storage) {
        config.storage.set(key, JSON.stringify(state));
      }
    },
    load = () => {
      if(config.storage && config.storage.get(key)) {
        const data = JSON.parse(config.storage.get(key));
        if(config.states) {
          config.states.map(n => state[n] = data[n])
        }
        console.log('%cReState: %cLoaded state(s)', ...style);
        return config.states ? state : data;
      }
      return undefined;
    },
    persist = (state) => {
      console.log('%cReState: %cSaving state(s)', ...style);
      save(state);
    },
    throttle = (call, time) => {
      var id = null, max = 0;
      return (...args) => {
        if(id !== null && max <= Math.ceil(time/1000)) {
          clearTimeout(id);
        }
        if(max > Math.ceil(time/1000)) max = 0;
        id = setTimeout(() => call(...args), time);
        ++max;
      };
    },
    restate = throttle(persist, config.delay);

    return (state = load() || undefined, action) => {
      const new_state = reducer(state, action);
      restate(new_state);
      return new_state;
    };
  }
}

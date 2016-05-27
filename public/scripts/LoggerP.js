'use strict';

var _redux = require('redux');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var store = (0, _redux.createStore)(LogList.LogReducer);
// var inputJSON = [
//     {
//         "EventSeverity": "z",
//         "Timestamp": "Tue May 24 2016 12:52:46 GMT-0500 (Central Daylight Time)",
//         "Message": "z",
//         "id": 1464112366341,
//         "EventType": "z"
//     },
//     {
//         "EventSeverity": "a",
//         "Timestamp": "Tue May 24 2016 12:52:51 GMT-0500 (Central Daylight Time)",
//         "Message": "a",
//         "id": 1464112371356,
//         "EventType": "a"
//     },
//     {
//         "EventSeverity": "b",
//         "Timestamp": "Tue May 24 2016 12:53:38 GMT-0500 (Central Daylight Time)",
//         "Message": "b",
//         "id": 1464112418349,
//         "EventType": "b"
//     }
// ];

var get_log_entries = function get_log_entries() {
  return inputJSON;
};

var LogList = React.createClass({
  displayName: 'LogList',


  getInitialState: function getInitialState() {
    var store_0 = (0, _redux.createStore)(this.LogReducer);
    return { store: store_0 };
  },

  LogReducer: function LogReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    console.log(" ");
    console.log(action.type, 'called with state', state, 'and action', action);

    switch (action.type) {
      case 'ADD_LOG':
        return [].concat(_toConsumableArray(state), [action.log_entry]);
      case 'REMOVE_LOG':
        return action.newState;

      default:
        return state;
    }
  },

  createAddLogAction: function createAddLogAction(log_entry) {
    return {
      type: 'ADD_LOG',
      log_entry: log_entry
    };
  },

  createRemoveLogAction: function createRemoveLogAction(id) {
    var index = 0;
    var newLog = this.state.store.getState().slice();
    for (var i = 0; i < newLog.length; i++) {
      if (newLog[i].id == id) {
        index = i;
        break;
      }
    }
    newLog.splice(index, 1);
    return {
      type: 'REMOVE_LOG',
      newState: newLog
    };
  },

  dispatchAdd: function dispatchAdd(log_entry) {
    this.state.store.dispatch(this.createAddLogAction(log_entry));
  },

  dispatchRemove: function dispatchRemove(id) {
    this.state.store.dispatch(this.createRemoveLogAction(id));
  },

  render: function render() {
    console.log(this.state.store.getState());
    var LogNodes = this.state.store.getState();
    return React.createElement(
      'div',
      { className: 'LogList' },
      LogNodes
    );
  }
});

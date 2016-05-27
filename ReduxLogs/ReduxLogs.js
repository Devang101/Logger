var inputJSON = [
    {
        "EventSeverity": "z",
        "Timestamp": "Tue May 24 2016 12:52:46 GMT-0500 (Central Daylight Time)",
        "Message": "z",
        "id": 1464112366341,
        "EventType": "z"
    },
    {
        "EventSeverity": "a",
        "Timestamp": "Tue May 24 2016 12:52:51 GMT-0500 (Central Daylight Time)",
        "Message": "a",
        "id": 1464112371356,
        "EventType": "a"
    },
    {
        "EventSeverity": "b",
        "Timestamp": "Tue May 24 2016 12:53:38 GMT-0500 (Central Daylight Time)",
        "Message": "b",
        "id": 1464112418349,
        "EventType": "b"
    }
]

var LogReducer = function (state = inputJSON, action) {
    console.log(" ");
    console.log(action.type,'called with state', state, 'and action', action);

    switch (action.type) {
        case 'ADD_LOG':
            return [
                ...state,
                action.object
            ]
        case 'REMOVE_LOG':
            return action.newState;

        default:
            return state;
    }
};

import {createStore} from 'redux';

var store_0 = createStore(LogReducer);

console.log("\n", '### It starts here');
console.log('store_0 state after initialization:', store_0.getState());

var addLog = function (inputObject) {
    return {
        type: 'ADD_LOG',
        object: inputObject
    };
};

var removeLog = function (id , state) {
    var index =0;
    var newLog = state.slice();
    for(var i=0; i<newLog.length; i++) //find index of log_entry with input id
    {
      if(newLog[i].id == id)
      {
        index=i;
        break;
      }
    }
    newLog.splice(index, 1); //remoce object from log
    return {
        type: 'REMOVE_LOG',
        newState: newLog,
    };
};

store_0.dispatch(addLog(
  {
      "EventSeverity": "addedLog",
      "Timestamp": "Tue May 24 2016 12:53:38 GMT-0500 (Central Daylight Time)",
      "Message": "addedLog",
      "id": Date.now(),
      "EventType": "addedLog"
  }
));
console.log(" ");
console.log('store_0 state after action addLog:', store_0.getState());

store_0.dispatch(removeLog(1464112366341, store_0.getState()));
console.log(" ");
console.log('store_0 state after action removeLog with id of z:', store_0.getState());

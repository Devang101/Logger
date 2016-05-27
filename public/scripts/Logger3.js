import {createStore} from 'redux';
var store = createStore(LogList.LogReducer);
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

var get_log_entries = function() {
  return inputJSON;
}

var LogList = React.createClass({

  getInitialState: function() {
    var store_0 = createStore(this.LogReducer);
    return {store: store_0};
  },

  LogReducer : function (state = {}, action) {
      console.log(" ");
      console.log(action.type,'called with state', state, 'and action', action);

      switch (action.type) {
          case 'ADD_LOG':
              return [
                  ...state,
                  action.log_entry
              ]
          case 'REMOVE_LOG':
              return action.newState;

          default:
              return state;
      }
  },

  createAddLogAction : function (log_entry) {
      return {
          type: 'ADD_LOG',
          log_entry: log_entry
      };
  },

  createRemoveLogAction : function (id) {
      var index =0;
      var newLog = this.state.store.getState().slice();
      for (var i = 0; i < newLog.length; i++)
      {
        if(newLog[i].id == id)
        {
          index =i;
          break;
        }
      }
      newLog.splice(index,1);
      return {
          type: 'REMOVE_LOG',
          newState: newLog,
      };
  },

  dispatchAdd : function (log_entry)
  {
    this.state.store.dispatch(this.createAddLogAction(log_entry));
  },

  dispatchRemove : function (id)
  {
    this.state.store.dispatch(this.createRemoveLogAction(id));
  },

  render: function() {
    console.log(this.state.store.getState());
    var LogNodes = this.state.store.getState();
    return (
      <div className="LogList">
        {LogNodes}
      </div>
    );
  }
});

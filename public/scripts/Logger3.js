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
];

var get_log_entries = function() {
  return inputJSON;
}

var LogList = React.createClass({

  getInitialState: function() {
    return {data: this.props.data};
  },

  render: function() {

    console.log(get_log_entries());
    var LogNodes = this.props.data.map(function(Log) {
      return (
        <div id={Log.id} key={Log.id}>
          Timestamp={Log.Timestamp}<br/>
          EventType={Log.EventType}<br/>
          EventSeverity={Log.EventSeverity}<br/>
          Message={Log.Message}<br/>
          id={Log.id}<br/>
        </div>
      );
    });
    return (
      <div className="LogList">
        {LogNodes}
      </div>
    );
  }
});

var LogForm = React.createClass({
  getInitialState: function() {
    return {Timestamp: '', EventType: '', EventSeverity: '', Message: ''};
  },
  handleTimestampChange: function(e) {
    var today = new Date();
    this.setState({Timestamp: (today.toString)});
  },
  handleEventTypeChange: function(e) {
    this.setState({EventType: e.target.value});
  },
  handleEventSeverityChange: function(e) {
    this.setState({EventSeverity: e.target.value});
  },
  handleMessageChange: function(e) {
    this.setState({Message: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var today = new Date();
    var Timestamp = today.toString();
    var EventType = this.state.EventType.trim();
    var EventSeverity = this.state.EventSeverity.trim();
    var Message = this.state.Message.trim();
    if (!Timestamp || !EventType || !EventSeverity || !Message) {
      return;
    }
    var Log = ({Timestamp: Timestamp, EventType: EventType, EventSeverity: EventSeverity, Message:Message});
    var Logs = this.state.data;
    Log.id = Date.now();
    var newLogs = Logs.concat([Log]);
    inputJSON = newLogs;
    console.log(newLogs);
    this.setState({data: newLogs});
    this.setState({Timestamp: '', EventType: '', EventSeverity: '', Message: ''});
  },
  render: function() {
    return (
      <form className='LogForm' onSubmit={this.handleSubmit}>
        <input type='text' placeholder="EventType" value ={this.state.EventType} onChange={this.handleEventTypeChange}/>
        <input type='text' placeholder="EventSeverity" value ={this.state.EventSeverity} onChange={this.handleEventSeverityChange}/>
        <input type='text' placeholder="Message" value ={this.state.Message} onChange={this.handleMessageChange}/>
        <input type="submit" value="Post"/>
      </form>
    );
  }
});

var LogRemoveForm = React.createClass({
  getInitialState: function(){
    return {id: ''};
  },
  handleIDchange: function(e){
    this.setState({id : e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var id = this.state.id.trim();
    if (!id)
    {
      return;
    }
    var newLogs = this.state.data.slice(); //copy currentLogs
    var index =0;
    for(var i=0; i<newLogs.length; i++) //find index of log_entry with input id
    {
      if(newLogs[i].id == id)
      {
        index=i;
        break;
      }
    }
    newLogs.splice(index, 1); //remoce object from log
    console.log(get_log_entries());
    inputJSON = newLogs;
    this.setState({data:newLogs}); //set state to newLogs
    this.setState({id: ''});
  },
  render: function(){
    return(
      <form className='Remove' onSubmit={this.handleSubmit}>
        <input type='text' placeholder="Log id" value ={this.state.id} onChange={this.handleIDchange}/>
        <input type="submit" value="Remove"/>
      </form>
    )
  }
});

ReactDOM.render(
  (<div className="LogBox">
    <h1>Logs</h1>
    <LogList data={inputJSON}/>
    <LogForm/>
    <LogRemoveForm/>
  </div>),
  document.getElementById('content')
);

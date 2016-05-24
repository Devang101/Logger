var inputJSON = [];
var get_log_entries = function() {
  return inputJSON;
}

var LogList = React.createClass({
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
    this.props.onLogSubmit({Timestamp: Timestamp, EventType: EventType, EventSeverity: EventSeverity, Message:Message});
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
    if (!id) {
      return;
    }
    this.props.onLogRemoveSubmit(id);
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
var LogBox = React.createClass({
  loadLogs: function() {
    this.setState({data: inputJSON});
  },
  handleLogRemoveSubmit: function(id) {
    var Logs = this.state.data;
    console.log(get_log_entries());
    for(var i=0; i<Logs.length; i++)
    {
      if(Logs[i].id == id)
      {
        delete Logs[i];
        break;
      }
    }
    inputJSON = Logs;
    this.setState({data:Logs});
 },
  handleLogSubmit: function(Log) {
    var Logs = this.state.data;
    Log.id = Date.now();
    var newLogs = Logs.concat([Log]);
    inputJSON = newLogs;
    this.setState({data: newLogs});
 },
  getInitialState: function() {
    return {data: []};
  },
  // componentDidMount: function() {
  //   this.loadLogsFromServer();
  //   setInterval(this.loadLogsFromServer, this.props.pollInterval);
  // },
  render: function() {
    return (
      <div className="LogBox">
        <h1>Logs</h1>
        <LogList data={this.state.data} />
        <LogForm onLogSubmit={this.handleLogSubmit} />
        <LogRemoveForm onLogRemoveSubmit={this.handleLogRemoveSubmit}/>
      </div>
    );
  }
});

ReactDOM.render(
  <LogBox data= {inputJSON} />,
  document.getElementById('content')
);

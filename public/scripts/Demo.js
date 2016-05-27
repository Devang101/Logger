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
    Log.id = Date.now();
    LogList.dispatchAdd(Log);
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
    LogList.dispatchRemove(id) //set state to newLogs
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
  (<div className="LogList_And_Forms">
    <h1>Logs</h1>
    <LogList/>
    <LogForm />
    <LogRemoveForm/>
  </div>),
  document.getElementById('content')
);

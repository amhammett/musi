import React from 'react'
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Settings from '../../Settings'

class JsonRecord extends React.Component {
  constructor(props) {
    super(props);
    var loading_state = {'uuid': 'XX', 'hostname': 'loading...', 'alias': '', 'isDeletable': true}
    if(!props.uuid || props.uuid === 'new') {
      loading_state = {'uuid': '', 'hostname': '', 'alias': '', 'isDeletable': false}
    }
    this.state = {
      record: loading_state,
      snackSubmitOpen: false,
      snackDeleteOpen: false
    }
    this.recordSubmit = this.recordSubmit.bind(this)
    this.recordDelete = this.recordDelete.bind(this)
    this.textChange = this.textChange.bind(this)
  }

  componentDidMount() {
    const url = `${Settings.endpoints.JDI_ENDPOINT}/minion/${this.props.uuid}`
    fetch(url)
    .then((response) => {
      return response.json();
    }).then((json) => {
      if(json.length === 1) {
        this.recordUpdate(json[0])
      }
    })
  };

  textChange(e) {
    var key = e.target.id.split('-')[1]
    var nuRecord = this.state.record
    nuRecord[key] = e.target.value
    this.setState({
      record: nuRecord
    })
  }

  recordUpdate(data) {
    data.isDeletable = true
    this.setState({
      record: data
    })
    // todo: display confirmation
  };

  recordDelete(e) {
    const url = `${Settings.endpoints.JDI_ENDPOINT}/minion/${this.props.uuid}`
    fetch(url, {method: 'DELETE'})
    .then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({snackSubmitOpen: true})
    })
  }

  recordSubmit(e) {
    var url = `${Settings.endpoints.JDI_ENDPOINT}/minion/${this.props.uuid}`
    var fetch_method = 'PUT'
    if(!this.state.record.isDeletable) {
      url = `${Settings.endpoints.JDI_ENDPOINT}/minion`
      fetch_method = 'POST'
    }
    fetch(url, {
      method: fetch_method,
      body: JSON.stringify(this.state.record)
    })
    .then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({snackSubmitOpen: true})
    })
  }

  snackSubmitClose = () => {
    this.setState({
      snackSubmitOpen: false
    })
  }

  snackDeleteClose = () => {
    this.setState({
      snackDeleteOpen: false
    })
  }

  render() {
    const buttonStyle = {
      margin: 12,
    };

    let buttons = null;
    if(this.state.record.isDeletable) {
      buttons = (
        <div>
          <RaisedButton label="Submit" style={buttonStyle} onClick={this.recordSubmit} primary={true} />
          <Snackbar
            key="snack-submit"
            open={this.state.snackSubmitOpen}
            message="Record Updated"
            autoHideDuration={4000}
            onRequestClose={this.snackSubmitClose}
          />
          <RaisedButton label="Delete" style={buttonStyle} onClick={this.recordDelete} secondary={true} />
          <Snackbar
            key="snack-delete"
            open={this.state.snackDeleteOpen}
            message="Record Deleted"
            autoHideDuration={4000}
            onRequestClose={this.snackDeleteClose}
          />
        </div>
      )
    } else {
      buttons = (
        <div>
          <RaisedButton label="Submit" style={buttonStyle} onClick={this.recordSubmit} primary={true} />
          <Snackbar
            key="snack-submit"
            open={this.state.snackSubmitOpen}
            message="Record Updated"
            autoHideDuration={4000}
            onRequestClose={this.snackSubmitClose}
          />
        </div>
      )
    }
    return (
      <div key={this.state.record.uuid} className="jdi-textform">
        <TextField
          id="textfield-hostname"
          hintText="hostname"
          floatingLabelText="Minion Hostname"
          onChange={this.textChange}
          defaultValue={this.state.record.hostname}
        /><br />
        <TextField
          id="textfield-alias"
          hintText="Alias"
          floatingLabelText="Minion Alias"
          onChange={this.textChange}
          defaultValue={this.state.record.alias}
        /><br />
        {buttons}
      </div>
    )
  }
}

const Minion = ({match}) => (
  <div className="page-view page-minion">
    <h2>Jenkins Minion Instance</h2>
    <p>
      Record of a Jenkins minion instance
    </p>
    <Paper className="page" zDepth={1}>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Minion Record" />
        </ToolbarGroup>
      </Toolbar>

      <JsonRecord uuid={match.params.uuid}/>
    </Paper>
  </div>
)

export default Minion

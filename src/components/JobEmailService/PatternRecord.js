import React from 'react'

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Settings from '../../Settings'
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

class JsonRecord extends React.Component {
  constructor(props) {
    super(props);
    var loading_state = {'id': 'XX', 'pattern': 'loading...', 'email': '', 'isDeletable': true}
    if(!props.id || props.id === 'new') {
      loading_state = {'id': '', 'pattern': '', 'email': '', 'isDeletable': false}
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
    console.log(this.props)
    if(this.props.id === 'new') {
      return
    }
    const url = `${Settings.endpoints.JES_ENDPOINT}/${this.props.id}`
    fetch(url)
    .then((response) => {
      return response.json();
    }).then((json) => {
      this.recordUpdate(json)
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
  };

  recordDelete(e) {
    const url = `${Settings.endpoints.JES_ENDPOINT}/${this.props.id}`
    fetch(url, {method: 'DELETE'})
    .then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({snackDeleteOpen: true})
    })
  }

  recordSubmit(e) {
    var url = `${Settings.endpoints.JES_ENDPOINT}/${this.props.id}`
    var fetch_method = 'PUT'
    if(!this.state.record.isDeletable) {
      url = `${Settings.endpoints.JES_ENDPOINT}`
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
            message="Record Added"
            autoHideDuration={4000}
            onRequestClose={this.snackSubmitClose}
          />
        </div>
      )
    }

    const textInputStyle = {
      marginRight: 24,
    }
    const textInputStyleId = {
      width: 320,
      marginRight: 24,
    }
    console.log(this.state)
    return (
      <div key={this.state.record.id} className="jes-textform">
        <TextField
          id="textfield-id"
          floatingLabelText="ID"
          onChange={this.textChange}
          defaultValue={this.state.record.id}
          style={textInputStyleId}
        />
        <TextField
          id="textfield-pattern"
          hintText="job matching pattern"
          floatingLabelText="Pattern"
          onChange={this.textChange}
          defaultValue={this.state.record.pattern}
          style={textInputStyle}
        />
        <TextField
          id="textfield-email"
          hintText="Email Address"
          floatingLabelText="Email Address"
          onChange={this.textChange}
          defaultValue={this.state.record.email}
          style={textInputStyle}
        /><br />
        {buttons}
      </div>
    )
  }
}

const PatternRecord = ({match}) => (
  <div className="page-view page-master">
    <h2>Job Email Pattern</h2>
    <p>
      Record of job to email pattern
    </p>
    <Paper className="page" zDepth={1}>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Pattern Record" />
        </ToolbarGroup>
      </Toolbar>

      <JsonRecord id={match.params.id}/>
    </Paper>
  </div>
)

export default PatternRecord

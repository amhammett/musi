import React from 'react'

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Settings from '../../Settings'
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

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
    const url = `${Settings.endpoints.JDI_ENDPOINT}/master/${this.props.uuid}`
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
    const url = `${Settings.endpoints.JDI_ENDPOINT}/master/${this.props.uuid}`
    fetch(url, {method: 'DELETE'})
    .then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({snackDeleteOpen: true})
    })
  }

  recordSubmit(e) {
    var url = `${Settings.endpoints.JDI_ENDPOINT}/master/${this.props.uuid}`
    var fetch_method = 'PUT'
    if(!this.state.record.isDeletable) {
      url = `${Settings.endpoints.JDI_ENDPOINT}/master`
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
    return (
      <div key={this.state.record.uuid} className="jdi-textform">
        <TextField
          id="textfield-hostname"
          hintText="hostname"
          floatingLabelText="Master Hostname"
          onChange={this.textChange}
          defaultValue={this.state.record.hostname}
          style={textInputStyle}
        />
        <TextField
          id="textfield-alias"
          hintText="Alias"
          floatingLabelText="Master Alias"
          onChange={this.textChange}
          defaultValue={this.state.record.alias}
          style={textInputStyle}
        /><br />
        {buttons}
      </div>
    )
  }
}

class MinionSelectList extends React.Component {
  styles = {
    chip: {
      margin: 4,
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    }
  }

  handleChipClick = (uuid) => {
    console.log(uuid)
  }

  minionSelectList = this.props.minionList.map((minion) =>
    <Chip
      key={minion.uuid}
      style={this.styles.chip}
      onClick={() => this.handleChipClick(minion.uuid)}
    >
      <Avatar icon={<FontIcon className="material-icons">add_circle</FontIcon>} />
      {minion.hostname}
    </Chip>
  )

  render() {
  console.log(this)
    return (
      <div style={this.styles.wrapper}>
        {this.minionSelectList}
      </div>
    )
  }
}


class JsonRelationship extends React.Component {
  constructor(props) {
    super(props);

    var loadingList = [{'uuid': 'xx'}]
    this.state = {
      registerOpen: false,
      minionList: loadingList
    }
  }

  componentDidMount() {
    const url = `${Settings.endpoints.JDI_ENDPOINT}/minion`
    fetch(url)
    .then((response) => {
      return response.json();
    }).then((json) => {
      this.minionListUpdate(json)
    })
  };

  minionListUpdate = (data) => {
   this.setState({minionList: data})
  }

  handleRegisterOpen = () => {
    this.setState({registerOpen: true});
  };

  handleRegisterClose = () => {
    this.setState({registerOpen: false});
  };

  render() {
    const registerMinionActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleRegisterClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleRegisterClose}
      />,
    ];
    return (
    <Paper className="page" zDepth={1}>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Registered Minions" />
        </ToolbarGroup>
        <ToolbarGroup>
          <FlatButton
            className="material-icons"
            icon={
              <FontIcon
                className="material-icons"
                onClick={this.handleRegisterOpen}
              >
                add_circle
              </FontIcon>
            }
          />
          <Dialog
            title="Register Minion"
            actions={registerMinionActions}
            model={false}
            open={this.state.registerOpen}
            onRequestClose={this.HandleRegisterCloseon}
            autoScrollBodyContent={true}
          >
            <MinionSelectList minionList={this.state.minionList} />
          </Dialog>
        </ToolbarGroup>
      </Toolbar>
      <div>asdf</div>
    </Paper>
    )
  }
}

const Master = ({match}) => (
  <div className="page-view page-master">
    <h2>Jenkins Master Instance</h2>
    <p>
      Record of a Jenkins master instance
    </p>
    <Paper className="page" zDepth={1}>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Master Record" />
        </ToolbarGroup>
      </Toolbar>

      <JsonRecord uuid={match.params.uuid}/>
    </Paper>
    <JsonRelationship />
  </div>
)

export default Master

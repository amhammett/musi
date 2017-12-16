import React from 'react'

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Settings from '../../Settings'

class LogSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      logOutput: null
    }
    this.searchChange = this.searchChange.bind(this)
    this.searchKeyPress = this.searchKeyPress.bind(this)

  }

  searchChange(e) {
    var value = e.target.value
    this.setState({
      searchInput: value
    })
  }

  outputUpdate(data) {
    this.setState({logOutput: data})
  }

  searchKeyPress = (event) => {
    if(event.charCode === 13) {
      const url = `${Settings.endpoints.BI_ENDPOINT+this.state.searchInput}`
      fetch(url)
      .then((response) => {
        return response.text()
      }).then((body) => {
        this.outputUpdate(body)
        console.log(body)
      })
    }
  }

  render() {
     const searchStyle = {
       backgroundColor: 'white',
     }

    const searchIconButton = 'search'

    return (
      <div>
        <Paper className="page" zDepth={1} key='log-search'>
          <Toolbar style={searchStyle}>
            <TextField
              id="search"
              hintText="Search"
              fullWidth={true}
              underlineShow={false}
              onKeyPress={this.searchKeyPress}
              onChange={this.searchChange}
            />
            <IconButton>
             <FontIcon className="material-icons" key="search-button">{searchIconButton}</FontIcon>
            </IconButton>
          </Toolbar>
        </Paper>

        <Paper className="page" zDepth={1} key='log-output'>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text='Log Output' />
            </ToolbarGroup>
          </Toolbar>
          <div className="codeOutput">
            <pre>{this.state.logOutput}</pre>
          </div>
        </Paper>
      </div>
    )
  }
}

const JenkinsNotification = () => (
  <div className="page-view page-buildlogs">
    <h2>Build Logs</h2>
    <p>Enter a Jenkins Build url to display log information</p>
    <p>e.g. http://jenkins.scea/jenkins/job/job-name/build-number/</p>
    <LogSearch />
  </div>
)

export default JenkinsNotification

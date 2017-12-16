import React from 'react'

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Settings from '../../Settings'
import 'typeface-roboto'

class PatternList extends React.Component {
  render() {
    const rowButtonStyle = {
      minWidth: 36,
    };
    const patternRow = this.props.data.map((record) =>
          <TableRow key={record.id}>
            <TableRowColumn>{record.id}</TableRowColumn>
            <TableRowColumn>{record.pattern}</TableRowColumn>
            <TableRowColumn>{record.email}</TableRowColumn>
            <TableRowColumn>
              <FlatButton
                label="edit"
                labelPosition="after"
                href={"/jes/job-email/" + record.id}
                className="material-icons"
                style={rowButtonStyle}
                icon={<FontIcon className="material-icons">create</FontIcon>}
              />
            </TableRowColumn>
          </TableRow>
    )

    return (
      <Table onCellClick={this.rowIconToggle}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Pattern</TableHeaderColumn>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {patternRow}
        </TableBody>
      </Table>
    )
  }
}

class PatternSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {patternData: { 'Patterns Loading': [{'id': '...', 'pattern': 'loading', 'email': '...' }]}};
  }

  componentDidMount() {
    const url = `${Settings.endpoints.JES_ENDPOINT}`
    fetch(url)
    .then((response) => {
      return response.json();
    }).then((json) => {
      if(!Object.keys(json)) {
        json = [{'id': '...', 'pattern': 'non-found', 'email': '...' }];
      } else {
        this.updatePatternData(json);
      }
    })
  }

  updatePatternData(data) {
    this.setState({
      patternData: { 'Patterns': data }
    })
  }

  render() {
    const patternTable = Object.keys(this.state.patternData).map(key =>
      <Paper className="page" zDepth={1} key={key}>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={key} />
          </ToolbarGroup>
          <ToolbarGroup>
            <FlatButton
              href="/jes/job-email/new"
              className="material-icons"
              icon={<FontIcon className="material-icons">add_circle</FontIcon>}
            />
          </ToolbarGroup>
        </Toolbar>
        <PatternList data={this.state.patternData[key]}/>
      </Paper>
    )

    return (
      <Paper>
        {patternTable}
      </Paper>
    )
  }
}

const JobEmailService = () => (
  <div className="page-view page-master">
    <h2>Job Email Patterns</h2>
    <p>list of job patterns with associated emails to notify</p>
    <PatternSection />
  </div>
)

export default JobEmailService

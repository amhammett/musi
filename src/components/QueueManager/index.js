import React from 'react'

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

class QueueList extends React.Component {
  render() {
    const queueRow = this.props.data.map((record) =>
          <TableRow key={record.user}>
            <TableRowColumn>{record.user}</TableRowColumn>
            <TableRowColumn>{record.host}</TableRowColumn>
          </TableRow>
    )

    return (
      <Table onCellClick={this.rowIconToggle}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>User</TableHeaderColumn>
            <TableHeaderColumn>Host</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {queueRow}
        </TableBody>
      </Table>
    )
  }
}

class QueueSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { queueData: { 'LoadingQueue': [ { 'user': 'loading', 'host': '...' }] } };
  }

  componentDidMount() {
    const url = `${Settings.endpoints.QM_ENDPOINT}`
    fetch(url)
    .then((response) => {
      return response.json();
    }).then((json) => {
      if(!Object.keys(json)) {
        json = { 'QueueEmpty': [{'user': 'none-found', 'host': '...' }] };
      } else {
        this.updateQueueData(json);
      }
    })
  }

  updateQueueData(data) {
    this.setState({
      queueData: data
    })
  }

  render() {
    const queueTable = Object.keys(this.state.queueData).map(key =>
      <Paper className="page" zDepth={1} key={key}>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={key} />
          </ToolbarGroup>
        </Toolbar>
        <QueueList data={this.state.queueData[key]}/>
      </Paper>
    )

    return (
      <Paper>
        {queueTable}
      </Paper>
    )
  }
}

const QueueManager = () => (
  <div className="page-view page-master">
    <h2>Redis Queues</h2>
    <p>list of queues with anything (user/host) currently waiting</p>
    <QueueSection />
  </div>
)

export default QueueManager

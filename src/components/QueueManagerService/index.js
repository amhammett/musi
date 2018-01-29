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
    const url = Settings.endpoints.QMS_ENDPOINT
    fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        console.log(res.err)
      }
    })
    .then((json) => {
      console.log(json)
      if(Object.keys(json).length === 0) {
        json = { 'QueueEmpty': [{'user': 'queues-empty', 'host': 'no users found' }] };
      }
      this.updateQueueData(json)
    })
    .catch(err => {
      console.log(err)
      this.updateQueueData({ 'QueueEndpointError': [{'user': 'system-error', 'host': 'unable to contact server' }] })
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

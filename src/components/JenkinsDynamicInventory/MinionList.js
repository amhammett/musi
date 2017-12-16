import React from 'react'

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import 'typeface-roboto'
import Settings from '../../Settings'

class JsonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rows: [{'uuid': 'XX', 'hostname': 'loading...', 'alias': ''}]};
  }

  componentDidMount() {
    const url = `${Settings.endpoints.JDI_ENDPOINT}/minion`
    fetch(url)
    .then((response) => {
      return response.json();
    }).then((json) => {
      this.updateRows(json);
    })
  }

  updateRows(data) {
    this.setState({
      rows: data
    })
  }

  rowIconToggle(rowNumber, ColumnId) {
    console.log(this)
  }

  render() {
    const rowButtonStyle = {
      minWidth: 36,
    };
    const jsonTable = (this.state.rows).map((row) =>
          <TableRow key={row.uuid}>
            <TableRowColumn>{row.uuid}</TableRowColumn>
            <TableRowColumn>{row.hostname}</TableRowColumn>
            <TableHeaderColumn>Operating System</TableHeaderColumn>
            <TableHeaderColumn>Tags</TableHeaderColumn>
            <TableRowColumn>
              <FlatButton
                label="edit"
                labelPosition="after"
                href={"/jdi/minion/" + row.uuid}
                className="material-icons"
                style={rowButtonStyle}
                icon={<FontIcon className="material-icons">create</FontIcon>}
              />
            </TableRowColumn>
          </TableRow>
    );

    return (
      <Table onCellClick={this.rowIconToggle}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Hostname</TableHeaderColumn>
            <TableHeaderColumn>Operating System</TableHeaderColumn>
            <TableHeaderColumn>Tags</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
            {jsonTable}
        </TableBody>
      </Table>
    )
  }
}


const Minion = () => (
  <div className="page-view page-minion">
    <h2>Jenkins Minion Instances</h2>
    <p>
      Minion instances (sometimes called Jenkins slaves) are used with Master servers to delegate workload due
      to available resources, configuration and/or connectivity.
    </p>
    <Paper className="page" zDepth={1}>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Minion" />
        </ToolbarGroup>
        <ToolbarGroup>
          <FlatButton
            href="/jdi/minion/new"
            className="material-icons"
            icon={<FontIcon className="material-icons">add_circle</FontIcon>}
          />
        </ToolbarGroup>
      </Toolbar>
      <JsonTable />
    </Paper>
  </div>
)

export default Minion

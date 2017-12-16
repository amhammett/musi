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
    const url = `${Settings.endpoints.JDI_ENDPOINT}/master`
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
    const jsonRowData = (this.state.rows).map((row) =>
          <TableRow key={row.uuid+"-record"}>
            <TableRowColumn>{row.uuid}</TableRowColumn>
            <TableRowColumn>{row.hostname}</TableRowColumn>
            <TableRowColumn>{row.alias}</TableRowColumn>
            <TableRowColumn>
              <FlatButton
                label="edit"
                labelPosition="after"
                href={"/jdi/master/" + row.uuid}
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
            <TableHeaderColumn>Alias</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jsonRowData}
        </TableBody>
      </Table>
    )
  }
}


const Master = () => (
  <div className="page-view page-master">
    <h2>Jenkins Master Instances</h2>
    <p>
      Master instances (sometimes called Jenkins Prime) are primary Jenkins servers used to run tasks and
      coordinate build pipelines.
    </p>
    <Paper className="page" zDepth={1}>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Master" />
        </ToolbarGroup>
        <ToolbarGroup>
          <FlatButton
            href="/jdi/master/new"
            className="material-icons"
            icon={<FontIcon className="material-icons">add_circle</FontIcon>}
          />
        </ToolbarGroup>
      </Toolbar>
      <JsonTable />
    </Paper>
  </div>
)

export default Master

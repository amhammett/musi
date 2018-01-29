import React, { Component } from 'react';

import 'typeface-roboto'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import './musi.css';
import Router from './Router'
import Menu from './Menu'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  appBarToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            iconClassNameRight="muidocs-icon-navigation-expand-more"
           />
          <Menu />
          <Router />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

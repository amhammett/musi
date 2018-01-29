import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

// move to db
const menuList = [
  { name: 'Queue Manager', link: '/qms',      icon: 'poll',        disabled: false },
  { name: 'Notifications', link: '/nss',      icon: 'sms failed',  disabled: false },
]
//  { name: 'Mail Service',  link: '/yams',     icon: 'email',       disabled: false },
//  { name: 'Settings',      link: '/settings', icon: 'settings',    disabled: true },
//  { name: 'Admin',         link: '/admin',    icon: 'lock',        disabled: true },
//  { name: 'Logout',        link: '/logout',   icon: 'exit_to_app', disabled: true},
//  { name: 'Master',            link: '/jdi/master',    icon: 'dvr',        disabled: true },
//  { name: 'Minion',            link: '/jdi/minion',    icon: 'storage',    disabled: true },
//  { name: 'Rule',              link: '/jdi/rule',      icon: 'label',      disabled: true },
//  { name: 'State',             link: '/jdi/state',     icon: 'tonality',   disabled: true },

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  appBarToggle = () => this.setState({open: !this.state.open});

  render() {
    const menuItems = menuList.map((menuItem) =>
            <MenuItem key={menuItem.name}
              containerElement={<Link to={menuItem.link} />}
              primaryText={menuItem.name}
              leftIcon={<FontIcon className="material-icons">{menuItem.icon}</FontIcon>}
              disabled={menuItem.disabled}
            />
    )

    return (
         <Drawer open={this.state.open}>
            <AppBar
              title="musi | wow"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
            {menuItems}
          </Drawer>
    )
  }
}

export default Menu;

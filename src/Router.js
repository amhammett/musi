import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import BuildInvestigation from './components/BuildInvestigation'
import JenkinsDynamicInventory from './components/JenkinsDynamicInventory'
import JobEmailService from './components/JobEmailService'
import QueueManager from './components/QueueManager'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/bi' component={BuildInvestigation} />
      <Route path='/jdi' component={JenkinsDynamicInventory} />
      <Route path='/jes' component={JobEmailService} />
      <Route path='/qm' component={QueueManager} />
    </Switch>
  </main>
)

export default Main

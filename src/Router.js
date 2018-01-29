import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import JenkinsLogRetrieval from './components/JenkinsLogRetrieval'
import NotificationSubscriptionService from './components/NotificationSubscriptionService'
import QueueManagerService from './components/QueueManagerService'
import YetAnotherMailService from './components/YetAnotherMailService'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/jlr' component={JenkinsLogRetrieval} />
      <Route path='/nss' component={NotificationSubscriptionService} />
      <Route path='/qms' component={QueueManagerService} />
      <Route path='/yams' component={YetAnotherMailService} />
    </Switch>
  </main>
)

export default Main

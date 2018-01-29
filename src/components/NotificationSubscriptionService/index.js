import React from 'react'
import {Switch, Route} from 'react-router-dom'

import SubscriptionList from './SubscriptionList.js'
import SubscriptionRecord from './SubscriptionRecord.js'


const NotificationSubscriptionService = () => (
  <Switch>
    <Route exact path='/nss' component={SubscriptionList} />
    <Route path='/nss/subscription/:id' component={SubscriptionRecord} />
  </Switch>
)

export default NotificationSubscriptionService

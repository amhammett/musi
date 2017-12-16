import React from 'react'
import {Switch, Route} from 'react-router-dom'

import MasterList from './MasterList.js'
import MasterRecord from './MasterRecord.js'
import MinionList from './MinionList.js'
import MinionRecord from './MinionRecord.js'

const JenkinsDynamicInventory = () => (
  <Switch>
    <Route exact path='/jdi/master' component={MasterList} />
    <Route path='/jdi/master/:uuid' component={MasterRecord} />
    <Route exact path='/jdi/minion' component={MinionList} />
    <Route path='/jdi/minion/:uuid' component={MinionRecord} />
  </Switch>
)

export default JenkinsDynamicInventory

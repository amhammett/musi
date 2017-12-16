import React from 'react'
import {Switch, Route} from 'react-router-dom'

import PatternList from './PatternList.js'
import PatternRecord from './PatternRecord.js'

const JobEmailService = () => (
  <Switch>
    <Route exact path='/jes/job-email' component={PatternList} />
    <Route path='/jes/job-email/:id' component={PatternRecord} />
  </Switch>
)

export default JobEmailService

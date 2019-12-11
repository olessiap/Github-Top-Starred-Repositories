import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ErrorPage from './mainComponents/ErrorPage'
import CommitsPage from "./mainComponents/CommitsPage"
import HomePage from "./mainComponents/HomePage"

//main component for the route organization
export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" render={(props) => <HomePage {...props} /> } />
            <Route to path="/error" render={(props) => <ErrorPage {...props} /> } />
            <Route to path="/:repo_id" render={(props) => <CommitsPage {...props} /> } />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App

import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import BookList from "./BookList"
import Welcome from "./Welcome"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/explore" component={BookList} />
      </Switch>
    </Router>
  )
}

export default App

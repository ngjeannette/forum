import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './component/Home'
import Signup from './component/Signup'
import Login from './component/Login'
import CreateQ from './component/CreateQ'
import UserQ from './component/UserQ'
import UserQIndividual from './component/UserQindividual'
import Nav from './component/Nav'

function App() {
  return (
    <Router>
      <div className="main">
        <Nav />
        <div className="content">
          <Route exact path="/" render={(props) => (<Home {...props} isAuthed={true} />)} />
          <Route  path="/signup" render={(props) => (<Signup {...props} isAuthed={true} />)} />
          <Route  path="/login" render={(props) => (<Login {...props} isAuthed={true} />)} />
          <Route  path="/createQ" render={(props) => (<CreateQ {...props} isAuthed={true} />)} />
          <Route  path="/userQ" render={(props) => (<UserQ {...props} isAuthed={true} />)} />
          <Route  path="/userQindividual" render={(props) => (<UserQIndividual {...props} isAuthed={true} />)} />
        </div>
      </div>
    </Router>
  );
}
export default App;
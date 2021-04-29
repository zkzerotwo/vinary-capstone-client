import React from 'react'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import Login from './Login/Login'
import Register from './Register/Register'
import Dashboard from './Dashboard/Dashboard'
import Footer from './Footer'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/dashboard' component={Dashboard} />
            </Switch>
          </BrowserRouter>
          <Footer />
    </div>
  );
}

export default App;

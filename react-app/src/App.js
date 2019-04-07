import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import logo from './logo.svg';
import Newperson from './Newperson';
import CreateQuiz from './Createquiz';
import Dashboard from './Dashboard';
import Admin from './Admin';
import Edit from './Edit'
import Login from './Login';
import Admindash from './Admindash'
import Deluser from './Deluser'
import NewComponent from './NewComponent'
import Edit_cat from './Edit_cat'
import Playquiz from './Playquiz'
import Playcat from './Playcat'
import Play from './Play'
import Leaderboard from './Leaderboard'
import Scoreboard from './Scoreboard'
import Viewme from './Viewme'


import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
               <Route exact path='/' component={Home} />
               <Route exact path='/signup' component={Newperson} />
               <Route exact path='/login' component={Login} />
               <Route exact path='/createquiz' component={CreateQuiz} />
               <Route exact path='/edit' component={NewComponent} />
               <Route exact path='/dashboard' component={Dashboard} />
               <Route exact path='/adminlog' component={Admin} />
               <Route exact path='/admindashboard' component={Admindash} />
               <Route exact path='/deluser' component={Deluser} />
               <Route exact path='/edit_cat' component={Edit_cat} />
               <Route exact path='/playquiz' component={Playquiz} />
               <Route exact path='/play/cat' component={Playcat} />
               <Route exact path='/play' component={Play} />
               <Route exact path='/leaderboard' component={Leaderboard} />
               <Route exact path='/viewscore' component={Scoreboard} />
               <Route exact path='/viewme' component={Viewme} />


          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

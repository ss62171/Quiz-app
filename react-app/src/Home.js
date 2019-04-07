import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './Home.css';

export default class Home extends Component{
  constructor(){
    super();
    this.logout = this.logout.bind(this)
  }

  logout(){
    localStorage.setItem("isAuth",JSON.stringify(false));
    localStorage.setItem("username","");
    this.setState({temp : 0})
  }

  render(){
    if(localStorage.getItem("isAuth").toString()=="false"){
      return(<Redirect to="/login" />)
    }

    return(
      <div>
      <div className="App">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to={'/'}>React App</Link>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to={'/'}>Home</Link></li>
              { !(localStorage.getItem("isAuth")) &&
              <li><Link to={'/signup'}>Create Person</Link></li>
            }
            { !(localStorage.getItem("isAuth")) &&
                <li><Link to={'/login'}>Login</Link></li>}

              { (localStorage.getItem("isAuth")) &&
                <li><Link to={'/playquiz'}>Play Quiz</Link></li>}
              { (localStorage.getItem("isAuth")) &&
                <li><Link to={'/leaderboard'}>Leaderboard</Link></li>}
                { (localStorage.getItem("isAuth")) &&
                <li><Link to={'/viewme'}>View My Score</Link></li>}

            </ul>
          </div>
        </nav>
      { (localStorage.getItem("isAuth")) &&  <button style={divStyle} onClick={this.logout}><span>logout</span></button>}
      </div>
      </div>
    );
  }


}
const divStyle = {
color: 'blue',
display : 'inline-block',
float : 'right'
};

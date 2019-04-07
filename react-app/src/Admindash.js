import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './Home.css';

export default class Admindash extends Component{
  constructor(){
    super();
    this.state={
      temp: 1
    }
    this.logout = this.logout.bind(this);

  }

  logout(){
    localStorage.setItem("isAdmin",JSON.stringify(false));
    this.setState({temp : 0})
  }

  render(){
    if(localStorage.getItem("isAdmin").toString()=="false"){
      return(<Redirect to="/adminlog" />)
    }

    return(
      <div>
      <div className="App">

        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
            </div>
            <ul className="nav navbar-nav">
              <li><Link to={'/createquiz'}>Create Quiz</Link></li>
              <li><Link to={'/deluser'}>Delete user</Link></li>

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

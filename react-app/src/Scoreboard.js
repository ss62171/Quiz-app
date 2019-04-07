import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './Home.css';

export default class Home extends Component{
  constructor(){
    super();
    this.state = {
      data : [],
      some : localStorage.getItem("to_edit"),
      user : localStorage.getItem("username")
    }
  }

  async componentDidMount(){
    const request = new Request('http://127.0.0.1:8080/scores/' + this.state.some);
    const response = await fetch(request);
    const status = await response.status;
    var data = await response.json();
    this.setState({data : data})
  }

  render(){
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
              <li><Link to={'/playquiz'}>Play Quiz</Link></li>
              <li><Link to={'/leaderboard'}>Leaderboard</Link></li>
              <li><Link to={'/viewscore'}>View Score</Link></li>

            </ul>
          </div>
        </nav>
      </div>
      <table className="table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Username</th>
            <th>Score</th>

          </tr>
        </thead>
        <tbody>{this.state.data.map(function(item, key) {
             return (
                <tr key = {key}>
                    <td>{item.title}</td>
                    <td>{item.username}</td>
                    <td>{item.score}</td>
                    
                </tr>
              )
           },this)}
        </tbody>
     </table>
      </div>
    );
  }
}

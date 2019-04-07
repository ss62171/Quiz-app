import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import './Home.css';

export default class Playcat extends Component{
constructor(){
  super();
  this.state={
    data : [],
    genre : localStorage.getItem("to_play"),
    some : "",
    scoreboard:{
      username: localStorage.getItem("username"),
      genre : localStorage.getItem("to_play"),
      title : "",
      score : 0
    },
    submitted : false
  }

  this.handleSubmit = this.handleSubmit.bind(this)
}

async handleSubmit(event){
  event.preventDefault()
  this.state.scoreboard.title = event.target.value
  const request = new Request('http://127.0.0.1:8080/store/' , {
   method: 'POST',
   body: JSON.stringify(this.state.scoreboard),
    });

    const response = await fetch(request);
    const status = await response.status;

    if(status == 200){
  this.setState({submitted:true})
  localStorage.setItem("to_play_cat",this.state.scoreboard.title);
  }
  else{
    alert("You have already attempted this quiz , score will not contribute")
    this.setState({submitted:true})
    localStorage.setItem("to_play_cat",this.state.scoreboard.title);

  }
}

  async componentDidMount(){
    const request = new Request('http://127.0.0.1:8080/subt/' + this.state.genre);
    const response = await fetch(request);
    const status = await response.status;
    var data = await response.json();
    this.setState({data : data})
  }

  render(){
    if(this.state.submitted){
      return(<Redirect to="/play" />)
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
              <li><Link to={'/playquiz'}>Play Quiz</Link></li>
              <li><Link to={'/leaderboard'}>Leaderboard</Link></li>
              <li><Link to={'/viewscore'}>View Score</Link></li>

            </ul>
          </div>
        </nav>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.title}</td>
                      <td><button value={item.title} onClick={this.handleSubmit}>Play</button></td>

                  </tr>
                )
             },this)}
          </tbody>
       </table>

      </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link , Redirect} from 'react-router-dom';
import './Home.css';

export default class Home extends Component{
  constructor(){
    super();
    this.state ={
      data : [],
      submitted : false,
      some : ""
      }
      this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    event.preventDefault()
    this.state.some = event.target.value
    this.setState({submitted:true})
    localStorage.setItem("to_edit",this.state.some);

  }

  async componentDidMount(){
    const request = new Request('http://127.0.0.1:8080/genres/');
    const response = await fetch(request);
    const status = await response.status;
    var data = await response.json();
    this.setState({data : data})
  }

  render(){
    if(this.state.submitted){
      return(<Redirect to="/viewscore" />)
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
              <li><Link to={'/viewme'}>View My Score</Link></li>

            </ul>
          </div>
        </nav>
      </div>
      <table className="table-hover">
        <thead>
          <tr>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>{this.state.data.map(function(item, key) {
             return (
                <tr key = {key}>
                    <td>{item.genre}</td>
                    <td><button value={item.genre} onClick={this.handleSubmit}>View</button></td>
                </tr>
              )
           },this)}
        </tbody>
     </table>
      </div>
    );
  }
}

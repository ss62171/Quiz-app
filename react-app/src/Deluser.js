import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './CreateQuiz.css'


export default class Deluser extends Component{
  constructor() {
    super();
    this.state = {
      data: []
    }

    this.delete = this.delete.bind(this);
  }

  async componentDidMount(){
    const request = new Request('http://127.0.0.1:8080/people/');
    const response = await fetch(request);
    const status = await response.status;
    var data = await response.json();
    await this.setState({data : data})
  }

  async delete(event){
    var id = event.target.value;
    const request = new Request('http://127.0.0.1:8080/admindel/' + id,{
  method: 'DELETE'
});
    const response = await fetch(request);
    const status = await response.status;
    var data = await response.json();
    if(status == 200){
      console.log("Deleted")
    }

    this.componentDidMount();
  }

  render(){
    if(localStorage.getItem("isAdmin").toString()=="false"){
      return(<Redirect to="/adminlog" />)
    }
    return(
      <div className="App">
        <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
            <ul className="nav navbar-nav">
              <li><Link to={'/createquiz'}>Create Quiz</Link></li>
              <li><Link to={'/deluser'}>Delete user</Link></li>
            </ul>
          </div>
        </div>
        </nav>
      </div>

        <table className="table-hover">
          <thead>
            <tr>
              <th>username</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
              if(item.isadmin == "0"){
               return (
                  <tr key = {key}>
                      <td>{item.username}</td>
                      <td>{item.name}</td>
                      <td><button value={item.id} onClick={this.delete}>Delete</button></td>
                  </tr>
                )}
             },this)}
          </tbody>
       </table>
      </div>

    );
  }
}

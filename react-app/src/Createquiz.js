import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './CreateQuiz.css'
import Edit from './Edit'
export default class CreateQuiz extends Component{

  constructor(){
    super();
    this.state ={
      data : [],
      ques : [],
      temp : "",
      genredata:{
      some:""},
      addgenre:{
        genre : ""
      },
      submitted : false,
      adding: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFChange = this.handleFChange.bind(this);
    this.addgenre = this.addgenre.bind(this);
    this.opendiv = this.opendiv.bind(this);
    this.DeleteGenre = this.DeleteGenre.bind(this);
  }

  async DeleteGenre(event){
    var id = event.target.value
    const request = new Request('http://127.0.0.1:8080/del_genre/' + id,{
      method : 'DELETE',
    });
    const response = await fetch(request);
    const status = await response.status;
    var data = await response.json();
    if(status == 200){
      console.log("Deleted")
    }

    this.componentDidMount();
  }

  handleSubmit(event){
    event.preventDefault()
    this.state.genredata.some = event.target.value
    this.setState({submitted:true})
    localStorage.setItem("to_edit",this.state.genredata.some);

  }

  opendiv(){
    this.setState({adding:true})
  }

  async addgenre(event){
    event.preventDefault();
    const request = new Request('http://127.0.0.1:8080/creategenre/',{
      method : 'POST',
      body: JSON.stringify(this.state.addgenre)
    });
    const response = await fetch(request);
    const status = await response.status;
    this.componentDidMount();
    document.getElementById("myform").reset();
    this.state.adding = false;
  }

  async componentDidMount(){
    const request = new Request('http://127.0.0.1:8080/genres/');
    const response = await fetch(request);
    const status = await response.status;
    var data = await response.json();
    this.setState({data : data})
  }

  handleFChange(event) {
    this.state.addgenre.genre = event.target.value;
  }

  render(){
    if(this.state.submitted){
      return(<Redirect to="/edit" />)
    }
    if(localStorage.getItem("isAdmin").toString()=="false"){
      return(<Redirect to="/adminlog" />)
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
            <li><Link to={'/createquiz'}>Create Quiz</Link></li>
            <li><Link to={'/deluser'}>Delete user</Link></li>

            </ul>
          </div>
        </nav>
      </div>
      <div className="App">
      <button onClick={this.opendiv}>Add Genre</button>
      {this.state.adding &&
        <div>
          <form onSubmit={this.addgenre} id="myform">
          <input type="text" value={this.state.genre} onChange={this.handleFChange}/>
          <button  className="btn btn-default">Add</button>
          </form>
        </div>
      }

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
                    <td><button value={item.genre} onClick={this.handleSubmit}>Edit</button></td>
                    <td><button value={item.id} onClick={this.DeleteGenre}>Delete Genre</button></td>
                </tr>
              )
           },this)}
        </tbody>
     </table>
     </div>

   );


  }
}

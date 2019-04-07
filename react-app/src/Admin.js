import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './Home.css';

export default class Admin extends Component{
  constructor(){
  super();
  this.state = {
    formData :{
      username : "",
      password : ""
    },
    submitted : false

  }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleFChange(event) {
    this.state.formData.username = event.target.value;
}

  handleLChange(event) {
    this.state.formData.password = event.target.value;
}
async handleSubmit (event) {
  event.preventDefault();
  const request = new Request('http://127.0.0.1:8080/adminlog/' , {
   method: 'POST',
   body: JSON.stringify(this.state.formData),
    });

    const response = await fetch(request);
    const status = await response.status;
    console.log(status)
    var data = await response.json();
    if(status == 200)
    {
      localStorage.setItem("isAuth",JSON.stringify(true));
      localStorage.setItem("username",JSON.stringify(this.state.formData.username));
      localStorage.setItem("isAdmin",JSON.stringify(true));
      this.setState({submitted:true})
    }
    else if (status == 401) {
      localStorage.setItem("isAuth",JSON.stringify(false));
      alert("password incorrect")
    }

    else{
      localStorage.setItem("isAuth",JSON.stringify(false));
      alert("No user")
    }
}



  render(){
    {if(this.state.submitted) {
      this.state.submitted = false;
      return(<Redirect to="/admindashboard" />)
    }
    }
    if(localStorage.getItem("isAdmin").toString()=="true"){
      return(<Redirect to="/admindashboard" />)
    }
    return(
      <div>
      <div className="App">

      <div className="formContainer">
        <form  id="myform" onSubmit={this.handleSubmit}>
          <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" value={this.state.username} onChange={this.handleFChange}/>
          </div>


          <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" value={this.state.password} onChange={this.handleLChange}/>
          </div>
              <button  className="btn btn-default">Login</button>
        </form>

      </div>

      </div>
      </div>
    );
  }
}

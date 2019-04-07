import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './Login.css';

export default class Login extends Component {

  constructor(){
    super();
    this.state={
      formData :{
        username : "",
        password : ""
      },
        data : "",
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

  const request = new Request('http://127.0.0.1:8080/user/' , {
   method: 'POST',
   body: JSON.stringify(this.state.formData),
    });

    const response = await fetch(request);
    const status = await response.status;
    var data = await response.json();
    console.log(data)
    if(status == 200)
    {
      localStorage.setItem("isAuth",JSON.stringify(true));
      localStorage.setItem("username",JSON.stringify(this.state.formData.username));
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
  render() {
    {if(this.state.submitted) {
      this.state.submitted = false;
      return(<Redirect to="/dashboard" />)
    }
    }
    if(localStorage.getItem("isAuth").toString()=="true"){
      return(<Redirect to="/dashboard" />)
    }
    return (
      <div>
        <div className="App">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" to={'/'}>React App</Link>
              </div>
              <ul className="nav navbar-nav">
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/signup'}>Create Person</Link></li>
                <li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/adminlog'}>Admin Login</Link></li>

              </ul>
            </div>
          </nav>
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

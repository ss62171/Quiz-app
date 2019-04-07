import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './Newperson.css';

export default class Newperson extends Component{
  constructor(){
    super();
    this.state = {
      formData : {
        username: "",
        password: "",
        name: ""
      },
      submitted : false,
      msg_p : "",
      msg_u : "",
      is : 2
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.beforeSubmit = this.beforeSubmit.bind(this);
    }

    beforeSubmit(event){
      this.state.is = 1;
      console.log("before validation")
      console.log(this.state.is)
      event.preventDefault();
        this.validate()
        console.log("after validation")
        console.log(this.state.is)
      if(this.state.is == 1){
      this.handleSubmit(event)}
    }

    handleSubmit (event) {
      if(this.state.is == 1){
      event.preventDefault();
      fetch('http://localhost:8080/signup/', {
       method: 'POST',
       body: JSON.stringify(this.state.formData),
     })
        .then(response => {
          if(response.status >= 200 && response.status < 300)
            this.setState({submitted: true});
    });
    document.getElementById("myform").reset();
    this.setState({
      formData : {
        username: "",
        password: "",
        name: ""
      },
      msg_p : "",
      msg_u : "",
      is : 2
    })
  }
}


    handleFChange(event) {
      this.state.formData.username = event.target.value;
      if(this.state.formData.username != "")
      {
        this.setState({msg_u:""})
      }
    }

    handleLChange(event) {
      this.state.formData.password = event.target.value;
      if(this.state.formData.password.length >= 6)
      {
        this.setState({msg_p:""})
      }
    }

    handleCChange(event) {
      this.state.formData.name = event.target.value;
      if(this.state.formData.username != "")
      {
        this.setState({msg_n:""})
      }
    }

    validate(){
      console.log("under validate")
      if(this.state.formData.username == ""){
        console.log("username")
        console.log(this.state.formData.username)
        this.setState({msg_u : "Username can't be blank"});
        this.state.is = 0;
      }
      if(this.state.formData.password.length < 6){
        this.setState({msg_p : "Password can't be less than 6 characters"});
        this.state.is = 0;
      }
      if(this.state.formData.name == ""){
        this.setState({msg_n : "Name can't be blank"});
        this.state.is = 0;
      }
    }

  render(){
    if(localStorage.getItem("isAuth").toString()=="true"){
      return(<Redirect to="/dashboard" />)
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
              <li><Link to={'/signup'}>Create Person</Link></li>
              <li><Link to={'/login'}>Login</Link></li>

            </ul>
          </div>
        </nav>
        <div className="formContainer">
          <form onSubmit={this.beforeSubmit} id="myform">
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.handleFChange} />
                <div>{this.state.msg_u}</div>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handleLChange}/>
                <div>{this.state.msg_p}</div>
            </div>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleCChange}/>
                <div>{this.state.msg_n}</div>
            </div>
                <button  className="btn btn-default">Submit</button>
          </form>
        </div>
      </div>


      </div>
    );
  }
}

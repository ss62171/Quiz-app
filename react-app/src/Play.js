import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './Home.css';

export default class Play extends Component{
  constructor(){
    super();
    this.state = {
      temp : 1,
      data : [],
      arr : [],
      data1 : [],
      formData:{
        title : localStorage.getItem("to_play"),
        category:localStorage.getItem("to_play_cat")
      },
      score : 0,
      scoreboard:{
        username: localStorage.getItem("username"),
        genre : localStorage.getItem("to_play"),
        title : localStorage.getItem("to_play_cat"),
        score : 0
      }
    }
    this.submit = this.submit.bind(this)
    this.handleAChange = this.handleAChange.bind(this)

  }

  handleAChange(event){
    if(this.state.data[event.target.getAttribute('data-qno')].attempted[event.target.value-1] == 1){
    this.state.data[event.target.getAttribute('data-qno')].attempted[event.target.value-1] = 0
  }
  else {
    this.state.data[event.target.getAttribute('data-qno')].attempted[event.target.value-1] = 1

  }
  }

  async submit(event){
    event.preventDefault()
    for(let i=0;i<this.state.data.length;i++){
      let str = this.state.data[i].ans1.toString() + this.state.data[i].ans2.toString() + this.state.data[i].ans3.toString() + this.state.data[i].ans4.toString()
      let str1 = this.state.data[i].attempted[0].toString() + this.state.data[i].attempted[1].toString() + this.state.data[i].attempted[2].toString() + this.state.data[i].attempted[3].toString();
      console.log(str)
      console.log(str1)
      if(str1 === str)
      {
        this.state.score++;
      }
    }
    this.state.scoreboard.score = this.state.score
    const request = new Request('http://127.0.0.1:8080/store/',{
      method : 'POST',
      body: JSON.stringify(this.state.scoreboard)
    });
    alert('Score' + ":" + this.state.score )
    window.location = "http://localhost:3000/dashboard"
  }

  async componentDidMount(){
      const request = new Request('http://127.0.0.1:8080/subtques/',{
      method : 'POST',
      body: JSON.stringify(this.state.formData),
      });

      const response = await fetch(request);
      const status = await response.status;
      var data = await response.json();
      await this.setState({data : data})
  }


  render(){

    if(localStorage.getItem("isAuth").toString()=="false"){
      console.log("mc")
      return(<Redirect to="/login" />)
    }

    for(let i=0;i<this.state.data.length;i++){
      this.state.data[i].attempted = [0,0,0,0]
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
              <th>Ques</th>


            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                  <div>
                      <td>{item.ques}</td>
                  </div>

                  <td><input type="checkbox" data-qno={key} value={1} onClick={this.handleAChange} /></td>
                      <td>{item.opt1}</td>
                  <td><input type="checkbox" data-qno={key} value={2} onClick={this.handleAChange}/></td>
                      <td>{item.opt2}</td>
                  <td><input type="checkbox" data-qno={key} value={3} onClick={this.handleAChange}/></td>
                      <td>{item.opt3}</td>
                  <td><input type="checkbox" data-qno={key} value={4} onClick={this.handleAChange}/></td>
                      <td>{item.opt4}</td>
                  </tr>
                )
             },this)}
          </tbody>
       </table>
       <button onClick={this.submit}>Submit</button>
      </div>
      </div>
    );
  }
}

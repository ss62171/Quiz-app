import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './Edit_cat.css';

export default class Edit_cat extends Component{
  constructor(){
    super();
    this.state={
      Quedata:{
        ques : "",
        genre : localStorage.getItem("to_edit"),
        title : localStorage.getItem("to_edit_cat"),
        opt1 : "",
        opt2 : "",
        opt3 : "",
        opt4 : "",
        issingle : 0,
        ans1 : 0,
        ans2 : 0,
        ans3 : 0,
        ans4 : 0,


      },
      formData:{
        title : localStorage.getItem("to_edit"),
        category:localStorage.getItem("to_edit_cat")
      },
      data : [],
      temp : true,
      adding : false
    }
    this.opendiv = this.opendiv.bind(this);
    this.handle_ans = this.handle_ans.bind(this);
    this.addtitle = this.addtitle.bind(this);
    this.handle1Change = this.handle1Change.bind(this);
    this.handle2Change = this.handle2Change.bind(this);
    this.handle3Change = this.handle3Change.bind(this);
    this.handle4Change = this.handle4Change.bind(this);
    this.handle5Change = this.handle5Change.bind(this);
  }

  async addtitle(){
    const request = new Request('http://127.0.0.1:8080/create_ques/',{
    method : 'POST',
    body: JSON.stringify(this.state.Quedata),
    });
    const response = await fetch(request);
    const status = await response.status;
    var data = await response.json();
    this.setState({adding:false})

}

  handle1Change(event) {
    this.state.Quedata.ques = event.target.value;
  }

  handle2Change(event) {
    this.state.Quedata.opt1 = event.target.value;
  }

  handle3Change(event) {
    this.state.Quedata.opt2 = event.target.value;
  }

  handle4Change(event) {
    this.state.Quedata.opt3 = event.target.value;
  }

  handle5Change(event) {
    this.state.Quedata.opt4 = event.target.value;
  }

  async componentDidMount(){
      const request = new Request('http://127.0.0.1:8080/subtques/',{
      method : 'POST',
      body: JSON.stringify(this.state.formData),
      });

      const response = await fetch(request);
      const status = await response.status;
      var data = await response.json();
      this.setState({data : data})
  }

  opendiv(){
    if(this.state.adding == false){
    this.setState({adding:true})}
    else{
      this.setState({adding:false})

    }
  }

  async Delete(event){
    var id = event.target.value
    const request = new Request('http://127.0.0.1:8080/del_ques/' + id,{
      method : 'DELETE',
    });
    const response = await fetch(request);
    const status = await response.status;
    var data = await response.json();
    if(status == 200){
      console.log("Deleted")
    }
    window.location.reload()
    this.componentDidMount();
  }

  handle_ans(event){
  var temp = event.target.getAttribute('data-qno');

    if(temp == 1){
    if(event.target.value == 1)
    {this.state.Quedata.ans1 = 0}
    else{
     this.state.Quedata.ans1 = 1}
    }

    else if(temp == 2){
      if(event.target.value == 1)
      {this.state.Quedata.ans2 = 0}
      else{
       this.state.Quedata.ans2 = 1}
      }

    else if(temp == 3){
      if(event.target.value == 1)
      {this.state.Quedata.ans3 = 0}
      else{
       this.state.Quedata.ans3 = 1}
      }

    else{
      if(event.target.value == 1)
      {this.state.Quedata.ans4 = 0}
      else{
       this.state.Quedata.ans4 = 1}
      }

      if(this.state.Quedata.ans1 + this.state.Quedata.ans2 + this.state.Quedata.ans3 + this.state.Quedata.ans4 > 1){
        this.setState({issingle : 1})
      }
      else{
        this.setState({issingle : 0})

      }
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
              <Link className="navbar-brand" to={'/'}>React App</Link>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to={'/createquiz'}>Create Quiz</Link></li>
              <li><Link to={'/deluser'}>Delete user</Link></li>
            </ul>
          </div>
        </nav>
        <button onClick={this.opendiv}>+</button>

      </div>
      <table className="table-hover">
        <thead>
          <tr>
            <th>Ques</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>


          </tr>
        </thead>
        <tbody>{this.state.data.map(function(item, key) {
             return (
                <tr key = {key}>
                <div>
                    <td>{item.ques}</td>
                </div>
                    <td>{item.opt1}</td>
                    <td>{item.opt2}</td>
                    <td>{item.opt3}</td>
                    <td>{item.opt4}</td>
                    <td><button value={item.id} onClick={this.Delete}>Delete</button></td>

                </tr>
              )
           },this)}
        </tbody>
     </table>
     {this.state.adding &&
       <div className="formContainer">
         <form onSubmit={this.addtitle} id="myform">
         <div className="form-group">
             <label>Question</label>
             <input type="text" className="form-control" value={this.state.ques} onChange={this.handle1Change}/>
         </div>
         <div className="form-group">
             <label>Option1</label>
             <input type="text" className="form-control" value={this.state.opt1} onChange={this.handle2Change}/>
             <input type="checkbox" data-qno={1} value={this.state.Quedata.ans1} onClick={this.handle_ans}/>
         </div>
         <div className="form-group">
             <label>Option2</label>
             <input type="text" className="form-control" value={this.state.opt2} onChange={this.handle3Change}/>
             <input type="checkbox" data-qno={2} value={this.state.Quedata.ans2} onClick={this.handle_ans}/>
         </div>
         <div className="form-group">
             <label>Option3</label>
             <input type="text" className="form-control" value={this.state.opt3} onChange={this.handle4Change}/>
             <input type="checkbox" data-qno={3} value={this.state.Quedata.ans3} onClick={this.handle_ans}/>
         </div>
         <div className="form-group">
             <label>Option4</label>
             <input type="text" className="form-control" value={this.state.opt4} onChange={this.handle5Change}/>
             <input type="checkbox" data-qno={4} value={this.state.Quedata.ans4} onClick={this.handle_ans}/>
         </div>
         <button  className="btn btn-default">Add</button>
         </form>
       </div>
     }
      </div>
    );
  }
}

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import './Home.css';

class NewComponent extends Component {
  constructor(){
    super();
    this.state={
      data :[],
      genredata:{
          genre : "",
          title: ""
      },
      genre : localStorage.getItem("to_edit"),
      adding : false,
      title : "",
      submitted : false
    }
    this.opendiv = this.opendiv.bind(this);
    this.addtitle = this.addtitle.bind(this);
    this.handleFChange = this.handleFChange.bind(this);
    this.DeleteCategory = this.DeleteCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  async componentDidMount(){
    const request = new Request('http://127.0.0.1:8080/subt/' + this.state.genre);
    const response = await fetch(request);
    const status = await response.status;
    var data = await response.json();
    this.setState({data : data})
  }

  async DeleteCategory(event){
    var id = event.target.value
    const request = new Request('http://127.0.0.1:8080/del_subt/' + id,{
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


  async addtitle(event){
      this.setState({adding:true})
      this.state.genredata.genre = this.state.genre
      this.state.genredata.title = this.state.title

      const request = new Request('http://127.0.0.1:8080/add_sub/',{
        method : 'POST',
        body : JSON.stringify(this.state.genredata)
      });
      const response = await fetch(request);
      const status = await response.status;
      await console.log(status)
      if(status == 200){
      var data = await response.json();
      this.componentDidMount()
    }
      else{
        alert('Title already exists')
      }
  }

  opendiv(){
    this.setState({adding:true})
  }

  handleSubmit(event){
    event.preventDefault()
    this.state.some = event.target.value
    this.setState({submitted:true})
    localStorage.setItem("to_edit_cat",this.state.some);

  }

  handleFChange(event) {
    this.setState({title: event.target.value});
}

  render() {
    if(this.state.submitted){
      return(<Redirect to="/edit_cat" />)
    }

    if(localStorage.getItem("isAdmin").toString()=="false"){
      return(<Redirect to="/adminlog" />)
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
            <li><Link to={'/createquiz'}>Create Quiz</Link></li>
            <li><Link to={'/deluser'}>Delete user</Link></li>
            </ul>
          </div>
        </nav>

        <button onClick={this.opendiv}>+</button>
        {this.state.adding &&
          <div className="formContainer">
            <form onSubmit={this.addtitle} id="myform">
            <input type="text" value={this.state.title} onChange={this.handleFChange}/>
            <button  className="btn btn-default">Add Title</button>
            </form>
          </div>
        }
      </div>
      <div>
        <h1>{this.state.genre}</h1>
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
                      <td><button value={item.title} onClick={this.handleSubmit}>Edit</button></td>
                      <td><button value={item.id} onClick={this.DeleteCategory}>Delete Category</button></td>
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
export default NewComponent;

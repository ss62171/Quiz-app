import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Edit.css';

export default class Edit extends Component{

  render(){
    console.log(this.props.value)
    return(
      <div>
      {this.props.value}
      </div>
    );
  }
}

import React, { Component } from "react";

export default class CardBack extends Component {

  state = {
    i: 0
  }

  counter = () => {
    console.log(this.props[this.props.currentFilter])
    let current = this.state.i
    if (current===this.props[this.props.currentFilter].length-1){
      this.setState({i:0},()=>{console.log(this.state.i)})
    }
    else {
      current += 1
      this.setState({i:current},()=>{console.log(this.state.i)})
    }
  }

  handleClick = (event) => {
    console.log(event.target.className)
    if (event.target.className==="arrow"){this.counter()}
    else {this.props.switch()}
  }

  render(){
    return (
      <div onClick={this.handleClick} className="ui card">
      <h1>CardBack</h1>
      <h2>{this.props[this.props.currentFilter][this.state.i]}</h2>
      <li className="arrow">ARROW BUTTON</li>
      </div>
    )
  }
}

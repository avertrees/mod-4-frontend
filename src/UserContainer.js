import React, { Component } from "react";
import UserCard from "./UserCard"

export default class UserContainer extends Component {

  state = {
    users: []
  }

  fetchAllUsers = () => {
    fetch("http://localhost:3001/users")
    .then(resp=>resp.json())
    .then(data=>{
      this.setState({users:data})
    })
  }
  //might need to chain this to the end of the post users fetch in App to get the most RECENT info
  componentDidMount(){
    this.fetchAllUsers()
  }

  // componentDidUpdate(){
  //   this.fetchAllUsers()
  // }

  render(){
    return(
      <div>
      {this.state.users.map(user=> <UserCard currentUserId={this.props.currentUserId} user={user}/>)}
      </div>
    )
  }
}

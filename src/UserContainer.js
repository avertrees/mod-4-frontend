import React, { Component } from "react";
import UserCard from "./UserCard"

export default class UserContainer extends Component {

  state = {
    //users: [],
    filterBy: null
  }

  // fetchAllUsers = () => {
  //   fetch("http://localhost:3001/users")
  //   .then(resp=>resp.json())
  //   .then(data=>{
  //     this.setState({users:data})
  //   })
  // }
  //might need to chain this to the end of the post users fetch in App to get the most RECENT info
  // componentDidMount(){
  //   this.fetchAllUsers()
  // }

  // componentDidUpdate(){
  //   this.fetchAllUsers()
  // }

  render(){
    //console.log("user ID from props", this.props.currentUserId)
    return(
      <div>
      {this.props.allUsers.map(user=> user.spotify_id !== this.props.currentUserId? <UserCard currentUserId={this.props.currentUserId} user={user}/> : null )}
      </div>
    )
  }
}

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
      <>
      <div className="ui four column grid">
      <div><button className="ui right button floated">delete me from the app</button></div>
        <div className="row">
          {this.props.allUsers.map(user => user.spotify_id !== this.props.currentUserId ? <UserCard key={user.id} currentUserId={this.props.currentUserId} tracks={this.props.tracks} user={user} /> : null)}
        </div>
      </div>
      </>
    )
  }
}

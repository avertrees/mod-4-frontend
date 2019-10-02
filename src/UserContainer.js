import React, { Component } from "react";
import UserCard from "./UserCard"

export default class UserContainer extends Component {

  state = {
    //users: [],
    filterBy: null
  }

  deleteUser = () => {
    fetch(`http://localhost:3001/users/${this.props.railsID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
  }

  render(){
    return(
      <>
      <div className="ui four column grid">
      {/*<div><button onClick={this.deleteUser}className="ui right button floated">delete me from the app</button></div>*/}
        <div className="row">
          <div className="ui cards">
            {this.props.allUsers.map(user => user.spotify_id !== this.props.currentUserId ? <UserCard key={user.id} currentUserId={this.props.currentUserId} tracks={this.props.tracks} user={user} /> : null)}
          </div>
        </div>
      </div>
      </>
    )
  }
}

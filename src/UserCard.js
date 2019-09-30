import React, { Component } from "react";

export default class UserCard extends Component {

  //make a method to fetch to the custom route that returns stats
  state = {
    user: this.props.user,
    rails_user_id: this.props.user.id
  }


  retrieveStats = () => {
    console.log(this.props.currentUserId)
    fetch(`http://localhost:3001/users/${this.state.rails_user_id}/compare`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        compare:{current_user_spotify_id: this.props.currentUserId,
        user_card_rails_id: this.state.rails_user_id}
      })
    })

  }

  componentDidMount(){
    this.retrieveStats()
  }

  //will send current user spotify id and user card rails id to back end.

  //will get back various bits of info

  //album comparison, artist comparison, track comparison.
  //current_user_spotify_id:
  //user_card_rails_id:

  render(){
    return(
      <div>{this.props.user.name}</div>
    )
  }
}

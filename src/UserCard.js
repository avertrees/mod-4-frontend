import React, { Component } from "react";

export default class UserCard extends Component {

  //make a method to fetch to the custom route that returns stats
  state = {
    user: this.props.user,
    rails_user_id: this.props.user.id,
    shared_albums: [],
    shared_tracks: [],
    shared_artists: []
  }


  retrieveStats = () => {
    console.log("current user ID", this.props.currentUserId)
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
    .then(resp=>resp.json())
    .then(data => {
      this.setState({
        shared_albums: data.shared_albums,
        shared_tracks: data.shared_tracks,
        shared_artists: data.shared_artists
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

  renderEntity = (shared_entity) => {
    if (this.state[shared_entity].length>0){
      return this.state[shared_entity].map(entity=><li>{entity}</li>)
    }
    return null
  }

  render(){
    return(
      <div>
      <h1>{this.props.user.name}</h1>
      <h3>Number of shared albums: {this.state.shared_albums.length}</h3>
      {this.renderEntity("shared_albums")}
      <h3>Number of shared artists: {this.state.shared_artists.length}</h3>
      {this.renderEntity("shared_artists")}
      <h3>Number of shared tracks: {this.state.shared_tracks.length}</h3>
      {this.renderEntity("shared_tracks")}
      </div>
    )
  }
}

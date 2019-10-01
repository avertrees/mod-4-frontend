import React, { Component } from "react";
import CardFront from './CardFront'
import CardBack from './CardBack'

export default class UserCard extends Component {

  //make a method to fetch to the custom route that returns stats
  state = {
    user: this.props.user,
    rails_user_id: this.props.user.id,
    shared_albums: [],
    shared_tracks: [],
    shared_artists: [],
    front: true,
    filter: "shared_tracks"
  }


  retrieveStats = () => {
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
      console.log(data)
      this.setState({
        //need to change this on backend so that theres a key for image AND name in each object
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

  frontBackSwitch = () => {
    let newState = this.state.front ? false : true
    this.setState({
      front: newState
    })
  }
  //should we put the conditional in here?

  //pass in props from here to card front vs card back?

  frontOrBack = () => {
    if (this.state.front){
      return <CardFront shared_albums={this.state.shared_albums} shared_artists={this.state.shared_artists}
      shared_tracks={this.state.shared_tracks} user={this.props.user} renderEntity={this.renderEntity}
      switch={this.frontBackSwitch}/>
    } else {
      return <CardBack switch={this.frontBackSwitch} shared_albums={this.state.shared_albums} shared_artists={this.state.shared_artists}
      shared_tracks={this.state.shared_tracks} user={this.props.user} currentFilter={this.state.filter} />
    }
  }

  render(){
    return(
      <div className="ui column">
      {this.frontOrBack()}
      </div>
    )
  }
}

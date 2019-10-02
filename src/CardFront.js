import React, { Component } from "react";
// import { Card, Icon, Image } from 'semantic-ui-react'
export default class CardFront extends Component {
  render(){
    return (
      <div className="ui card" onClick={this.props.switch}>
      <h1>{this.props.user.name}</h1>
      <img className="circular--square" src={this.props.user.image_url} alt={this.props.user.name} />
      <h3>Number of shared albums: {this.props.shared_albums.length}</h3>
      {this.props.renderEntity("shared_albums")}
      <h3>Number of shared artists: {this.props.shared_artists.length}</h3>
      {this.props.renderEntity("shared_artists")}
      <h3>Number of shared tracks: {this.props.shared_tracks.length}</h3>
      {this.props.renderEntity("shared_tracks")}
       </div>
    )
  }
}

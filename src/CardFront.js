import React, { Component } from "react";
// import { Card, Icon, Image } from 'semantic-ui-react'
export default class CardFront extends Component {
  render(){
    return (
      <div className="ui card" onClick={this.props.switch}>
      <h1>{this.props.user.name}</h1>
      <img className="circular--square" src={this.props.user.image_url} alt={this.props.user.name} />
      <span>Number of shared albums: {this.props.shared_albums.length}</span>
      <span>Number of shared artists: {this.props.shared_artists.length}</span>
      <span>Number of shared tracks: {this.props.shared_tracks.length}</span>
      <span>click to flip</span>
       </div>
    )
  }
}

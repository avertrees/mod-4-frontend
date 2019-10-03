import React, { Component } from "react";
// import { Card, Icon, Image } from 'semantic-ui-react'
export default class CardFront extends Component {
  render(){
    return (
      <div className="ui card" onClick={this.props.switch}>
        <img className="image circular--square" src={this.props.user.image_url} alt={this.props.user.name} /> 
      <div className="content">
        <div className="header">{this.props.user.name} </div>
      </div>
      {/* <span>Number of shared albums: {this.props.shared_albums.length}</span>
      <span>Number of shared artists: {this.props.shared_artists.length}</span>
      <span>Number of shared tracks: {this.props.shared_tracks.length}</span> */}
      {/* <span>click to flip</span> */}
      <div className="extra content">
        <div className="ui fluid buttons">
            {this.props.shared_artists.length > 0 ? <button className="ui disabled button">Artists ({this.props.shared_artists.length}) </button> : null}
            {this.props.shared_albums.length > 0 ? <button className="ui disabled button">Albums ({this.props.shared_albums.length}) </button> : null}
            {this.props.shared_tracks.length > 0 ? <button  className="ui disabled button">Tracks ({this.props.shared_tracks.length})</button> : null}
        </div>
      </div>
      </div>
    )
  }
}

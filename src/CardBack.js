import React, { Component } from "react";

export default class CardBack extends Component {

  state = {
    i: 0,
    image_url: "",
    filter: "shared_artists"
  }

  componentDidMount() {
    this.getImage()
  }

  changeCurrentFilter = (filter) => {
    //console.log(filter)
    this.setState({
      filter: filter,
      i: 0
    }, () => this.getImage())
  }

  getImage = () => {
 //   (this.state.filter, this.props[this.state.filter][this.state.i])
    //console.log(this.props.tracks_list)
    let value = this.props[this.state.filter][this.state.i]
    if (value){
      let image = ""
      if (this.state.filter === "shared_artists"){
        image = this.findImageByArtistName(value)
      } else if (this.state.filter === "shared_albums"){
        image = this.findImageByAlbumName(value)
      } else if (this.state.filter === "shared_tracks"){
        image = this.findImageByTrackName(value)
      }

      this.setState({
        image_url: image
      })
    }

  }

  findImageByArtistName = (name) => {
    let trackObj = this.props.tracks_list.find( (track) => {
      return track.artists[0].name === name
    })
    return trackObj.album.images[0].url
  }

  findImageByAlbumName = (name) => {
    let trackObj = this.props.tracks_list.find((track) => {
      return track.album.name === name
    })
    return trackObj.album.images[0].url
  }

  findImageByTrackName = (name) => {
    let trackObj = this.props.tracks_list.find((track) => {
      return track.name === name
    })
    return trackObj.album.images[0].url
  }

  counter = () => {
    //console.log(this.props[this.state.filter])
    let current = this.state.i
    if (current===this.props[this.state.filter].length-1){
      this.setState({i:0},()=>{
        this.getImage()
      })
    }
    else {
      current += 1
      this.setState({i:current},()=>{
        this.getImage()
      })
    }
  }

  handleClick = (event) => {
    if (event.target.className==="arrow"){
      this.counter()
    } else if (event.target.className ==="ui button") {
      this.changeCurrentFilter(event.target.id)
    } else {
      this.props.switch()
    }
  }

  render(){
    return (
      <div onClick={this.handleClick} className="ui card">

        <div className="ui buttons">

          {this.props.shared_artists.length > 0 ? <button id="shared_artists" className="ui button">Artists ({this.props.shared_artists.length}) </button> : null}
          {this.props.shared_albums.length > 0 ? <button id="shared_albums" className="ui button">Albums ({this.props.shared_albums.length}) </button> : null}
          {this.props.shared_tracks.length > 0 ? <button id="shared_tracks" className="ui button">Tracks</button> : null}

        </div>

      <h1>CardBack</h1>
      {(this.props.shared_artists.length > 0 || this.props.shared_albums.length > 0 || this.props.shared_tracks.length || 0)
      ?
      <>
      <img src={this.state.image_url} height="200" widht="200" alt="album artwork" />
      <h2>{this.props[this.state.filter][this.state.i]}</h2>
      <li className="arrow">ARROW BUTTON</li>
      </>
      :
      null}

      </div>
    )
  }
}

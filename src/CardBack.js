import React, { Component } from "react";

export default class CardBack extends Component {

  state = {
    i: 0,
    image_url: ""
  }

  componentDidMount() {
    this.getImage()
  }

  getImage = () => {
 //   (this.props.currentFilter, this.props[this.props.currentFilter][this.state.i])
    //console.log(this.props.tracks_list)
    let value = this.props[this.props.currentFilter][this.state.i]
    let image = "" 
    if (this.props.currentFilter === "shared_artists"){
      console.log("shared artist", value)
      image = this.findImageByArtistName(value)
    } else if (this.props.currentFilter === "shared_albums"){
      console.log("shared album", value)
      image = this.findImageByAlbumName(value)
    } else if (this.props.currentFilter === "shared_tracks"){
      console.log("shared track", value)
      image = this.findImageByTrackName(value)
    }

    this.setState({
      image_url: image
    })
  }  

  findImageByArtistName = (name) => {
    console.log(name)
    let trackObj = this.props.tracks_list.find( (track) => {
      return track.artists[0].name === name
    })
    return trackObj.album.images[0].url
  }

  findImageByAlbumName = (name) => {
    console.log(name)
    let trackObj = this.props.tracks_list.find((track) => {
      return track.album.name === name
    })
    return trackObj.album.images[0].url
  }

  findImageByTrackName = (name) => {
    console.log(name)
    let trackObj = this.props.tracks_list.find((track) => {
      return track.name === name
    })
    return trackObj.album.images[0].url
  }

  counter = () => {
    //console.log(this.props[this.props.currentFilter])
    let current = this.state.i
    if (current===this.props[this.props.currentFilter].length-1){
      this.setState({i:0},()=>{
        console.log(this.state.i)
        this.getImage()
      })
    }
    else {
      current += 1
      this.setState({i:current},()=>{
        console.log(this.state.i)
        this.getImage()
      })
    }
  }

  handleClick = (event) => {
    console.log(event.target.className)
    if (event.target.className==="arrow"){
      this.counter()
    } else if (event.target.className ==="ui button") {
      //console.log("button", event.target.id)
      //this.getImage()
      this.props.changeCurrentFilter(event.target.id)
    } else {
      this.props.switch()
    }
  }

  render(){
    return (
      <div onClick={this.handleClick} className="ui card">
        <div className="ui buttons">
          <button id="shared_artists" className="ui button">Artists ({this.props.shared_artists.length}) </button>
          {this.props.shared_albums.length > 0 ? <button id="shared_albums" className="ui button">Albums ({this.props.shared_albums.length})</button> : null} 
          {this.props.shared_tracks.length > 0 ? <button id="shared_tracks" className="ui button">Tracks</button> : null} 
          
        </div>
      <h1>CardBack</h1>
      <img src={this.state.image_url} height="200" widht="200" alt="album artwork" />
      {/* {this.getImage(this.props.currentFilter, this.props[this.props.currentFilter][this.state.i])} */}
      <h2>{this.props[this.props.currentFilter][this.state.i]}</h2>
      <li className="arrow">ARROW BUTTON</li>
      </div>
    )
  }
}

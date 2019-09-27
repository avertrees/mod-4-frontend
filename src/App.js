import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
//import Player from "./Player";
import TracksContainer from "./TracksContainer";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms:0,
      },
      is_playing: "Paused",
      progress_ms: 0,
      short_term_tracks:[],
      long_term_tracks:[]
    };
    // this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.getShortTermTracks = this.getShortTermTracks.bind(this);
    this.getLongTermTracks = this.getLongTermTracks.bind(this);
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getShortTermTracks(_token);
      this.getLongTermTracks(_token)
      //this.getNextTop50Tracks(_token)
    }
  }

  getShortTermTracks(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        console.log("data", data);
        this.setState({
          short_term_tracks:data.items
        });
      }
    });
  }

  getLongTermTracks(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        console.log("data", data);
        this.setState({
          long_term_tracks: data.items
        });
      }
    });
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        console.log("data", data);
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
        });
      }
    });
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
            <TracksContainer short_term_tracks={this.state.short_term_tracks} long_term_tracks={this.state.long_term_tracks} />
        )}
        </header>
      </div>
    );
  }
}

export default App;

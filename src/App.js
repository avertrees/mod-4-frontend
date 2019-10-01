import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
//import Player from "./Player";
import TracksContainer from "./TracksContainer";
import logo from "./logo.svg";
import "./App.css";
import UserContainer from "./UserContainer"

class App extends Component {
  // constructor() {
    // super();
    state = {
      token: null,
      short_term_tracks:[],
      long_term_tracks:[],
      me:{},
      users:[],
      all_tracks:[]
    };
    //What is this doing????????????????????????
  //   this.getShortTermTracks = this.getShortTermTracks.bind(this);
  //   this.getLongTermTracks = this.getLongTermTracks.bind(this);
  //   this.fetchUserOnLogin = this.fetchUserOnLogin.bind(this);
  // }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      }, () => { console.log("hello") })
      this.getShortTermTracks(_token);
      this.getLongTermTracks(_token)
      this.fetchUserOnLogin(_token);
      //this.getNextTop50Tracks(_token)
      //make fetch post to backend here to input User Data???

    }
  }

  postUser = () => {
    //console.log(this.state.me)
    let image_url = ""
    if (this.state.me.images.length>0){
      image_url = this.state.me.images[0].url
    }
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: this.state.me.display_name,
        image_url: image_url,
        spotify_id: this.state.me.id
      })
    })
      .then(res => res.json())
      .then(console.log)
      .catch(err => alert(err));
  }

  postTracks = () => {
    let user_id = this.state.me.id
    this.state.all_tracks.flat().forEach(e => {
      fetch("http://localhost:3001/top100_tracks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          spotify_id: e.id,
          album_name: e.album.name,
          album_id: e.album.id,
          artist_name: e.artists[0].name,
          artist_id: e.artists[0].id,
          name: e.name,
          user_id: user_id,
        })
      })

    })

  }

  fetchUserOnLogin = (token) => {
    $.ajax({
      url: "https://api.spotify.com/v1/me",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        this.setState({
          me: data
        });
      }
    })
      .then((data) => this.postUser())
      ;
  }


  getShortTermTracks = (token) => {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        this.setState({
          short_term_tracks: data.items,
          all_tracks: [...this.state.all_tracks, data.items]
        });
      }
    });
  }

  getLongTermTracks = (token) => {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        this.setState({
          long_term_tracks: data.items,
          all_tracks: [...this.state.all_tracks, data.items]
        }, () => { this.postTracks() });
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
            <div>
            <h1>Hello</h1>
            <UserContainer currentUserId={this.state.me.id}/>
            <TracksContainer short_term_tracks={this.state.short_term_tracks} long_term_tracks={this.state.long_term_tracks} />
            </div>
        )}
        </header>
      </div>
    );
  }
}

export default App;

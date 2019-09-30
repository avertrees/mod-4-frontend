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
      long_term_tracks:[],
      all_tracks:[]
    };
    //What is this doing????????????????????????
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
      },()=>{console.log("hello")})
      this.getShortTermTracks(_token);
      this.getLongTermTracks(_token)
      this.fetchUserOnLogin(_token);
      //this.getNextTop50Tracks(_token)
      //make fetch post to backend here to input User Data??? 

    }
  }

    postUser = () => {
      fetch("http://localhost:3001/users", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify({
              name: this.state.me.display_name,
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
        console.log(user_id)
        fetch("http://localhost:3001/top100_tracks", {
          method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                spotify_id: e.id,
                user_id: user_id
            })
        })

      })

    }

    fetchUserOnLogin(token){
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
      .then((data)=>this.postUser())
      ;
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
        this.setState({
          short_term_tracks:data.items,
          all_tracks: [...this.state.all_tracks, data.items]
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
        this.setState({
          long_term_tracks: data.items,
          all_tracks: [...this.state.all_tracks, data.items]
        },()=>{this.postTracks()});
      }
    });
  }

  render() {
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

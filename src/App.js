import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
//import Player from "./Player";
//import TracksContainer from "./TracksContainer";
import logo from "./logo.svg";
import "./App.css";
import UserContainer from "./UserContainer"


class App extends Component {
    state = {
      token: null,
      short_term_tracks:[],
      long_term_tracks:[],
      me:{},
      display_name:null,
      allUsers:[],
      railsID: null,
      all_tracks:[],
      showForm: false
    };

  componentDidMount() {
    // Set token
    console.log("i am a hash", hash)
    let _token = hash.access_token;

    localStorage.token = hash.access_token
    console.log(localStorage.token)
    if (_token) {
      // Set token
      this.setState({
        token: _token
      }, () => this.fetchUserOnLogin())

      //this.fetchUserOnLogin(_token);
      //this.getNextTop50Tracks(_token)
      //make fetch post to backend here to input User Data???

    }
  }

  fetchAllUsers = () => {
    fetch("http://localhost:3001/users")
      .then(resp => resp.json())
      .then(data => {
        this.setState({ allUsers: data })
      })
  }

  fetchUserOnLogin = () => {
    $.ajax({
      url: "https://api.spotify.com/v1/me",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
      },
      success: (data) => {
        this.setState({
          me: data,
          display_name: data.display_name
        });
      }
    })
      .then((data) => this.postUser())
      ;
  }

  postUser = () => {
    //console.log(this.state.me)
    let image_url = "https://pbs.twimg.com/profile_images/1237550450/mstom_400x400.jpg"
    // let display_name = "tom"
    if (this.state.me.images.length>0){
      image_url = this.state.me.images[0].url
    }
    // if (this.state.me.display_name !== this.state.me.id) {
    //   display_name = this.state.me.display_name
    // }
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
      .then((data) => {
        console.log("ALL THE DATA", data.id)
        this.setState({railsID: data.id, display_name: data.name}, () => console.log("does this thing really work?", this.state.railsID))
        this.getShortTermTracks();
      }
      )
      .catch(err => alert(err));
  }

  getShortTermTracks = () => {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
      },
      success: (data) => {
        this.setState({
          short_term_tracks: data.items,
          all_tracks: [...this.state.all_tracks, data.items]
        }, () => this.getLongTermTracks());
      }
    });
  }

  getLongTermTracks = () => {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
      },
      success: (data) => {
        this.setState({
          long_term_tracks: data.items,
          all_tracks: [...this.state.all_tracks, data.items]
        }, () => {
           this.postTracks()
          });
      }
    });
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
          album_image: e.album.images[0].url,
          name: e.name,
          user_id: user_id,
        })
      })
      .then(res=>res.json())
      .then(()=>this.fetchAllUsers())
    })
  }

  showForm = () => {
    console.log("click")
    let newState = this.state.form ? false : true
    this.setState({form: newState})
  }

  nameOrForm = () => {
    if (this.state.form===true){
      return <form onSubmit={this.updateUser}><input id="newName"placeholder="Enter New Display Name"/><input type="submit" value="submit"/></form>
    }
    else {
      return <h3>{this.state.display_name} logged in</h3>
    }
  }

  updateUser = (event) => {
    event.preventDefault()
    let newName = document.querySelector("#newName").value
    fetch(`http://localhost:3001/users/${this.state.railsID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: newName
      })
    })
    .then(res=>res.json())
    .then(()=>{
      this.showForm()
      this.setState({display_name: newName})
    })
  }

  render() {
    //console.log(this.state)
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
            {this.nameOrForm()}
            <button className="ui button" onClick={this.showForm}>edit</button><button className="ui button">delete account</button>
            {/* <h1>Hello</h1> */}
            <UserContainer allUsers={this.state.allUsers} tracks={this.state.all_tracks} railsID={this.state.railsID} currentUserId={this.state.me.id}/>
            {/* <TracksContainer short_term_tracks={this.state.short_term_tracks} long_term_tracks={this.state.long_term_tracks} /> */}
            </div>
        )}
        </header>
      </div>
    );
  }
}

export default App;

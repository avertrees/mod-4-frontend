import React, { Component } from "react";
import Track from "./Track"
class TracksContainer extends Component {
    
    renderShortTermTracks = () => {
        return this.props.short_term_tracks.map( (track, idx) => {
            return (<li> <Track rank={idx} artist={track.artists[0].name} song={track.name} /> </li>)
        })
    }

    renderLongTermTracks = () => {
        return this.props.long_term_tracks.map( (track, idx) => {
            return (<li> <Track rank={idx} artist={track.artists[0].name} song={track.name} /> </li>)
        })
    }

    render(){
        return (
            <div>
                <div>
                    <h1>Top Short-Term Tracks</h1>
                    <ul>
                        {this.renderShortTermTracks()}
                    </ul>
                    
                </div>

                <div>
                    <h1>Top Long-Term Tracks</h1>
                    <ul>
                        {this.renderLongTermTracks()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default TracksContainer;

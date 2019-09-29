import React, { Component } from "react";

class Track extends Component {
    // album:name: "ALBUM"
    render() {
        return (
            <div>

                <p> {this.props.rank+1} Artist: {this.props.artist} Song Title: {this.props.song}</p>
                
            </div>
        );
    }
}

export default Track;
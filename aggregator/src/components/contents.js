import React from 'react';
import axios from 'axios';
import Card from "./card.js";
import Articles from "../pocket.json";


export default class Contents extends React.Component {
  state = {
    contents: [],
  }

  componentWillMount() {
    axios.get('https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyAc6H9SedjaWcOwNXDNzCqTrBx01ZT1jD8&part=snippet,id&order=date&playlistId=PLHfOkwsRHnCfbtTKsUTYyH3qKmR3v1Jkh&ForMine=true&maxResults=20'
    //   "https://www.googleapis.com/youtube/v3/playlistItems",
    // {
    //   part: "snippet",
    //   suggestions: 0,
    //   playerVars: { rel: 0, showinfo: 0 },
    //   // channelId : 'UCeCvrBBHeL_5fcuwbe3yVQQ', // You can get one from Advanced settings on YouTube
    //   type: "video",
    //   playlistId: "PLHfOkwsRHnCfbtTKsUTYyH3qKmR3v1Jkh",
    //   maxResults: 20,
    //   // q: 'katsu',
    //   forMine: true,
    //   order: "date",
    //   key: "AIzaSyAc6H9SedjaWcOwNXDNzCqTrBx01ZT1jD8"
    // },
    )
      .then(res => {
        const contents = [];
        const videos = res.data;
        console.log(res.data)
        Object.keys(videos.items).forEach(function(key) {
          contents.push(videos.items[key]);
        });
        Object.keys(Articles.list).forEach(function(key) {
          contents.push(Articles.list[key]);
        });
        this.setState({contents: contents});
      });

  }

  render() {
    const contents = this.state.contents
    return (
      <div className="container" id="results">
        { this.state.contents.length > 1 && this.state.contents.map((article, i) => <Card card={article} key={i}/>)}
      </div>
    )
  }
}
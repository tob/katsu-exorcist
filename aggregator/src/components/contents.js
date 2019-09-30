import React from "react";
import axios from "axios";
import Card from "./card.js";
import GraphicCard from "./cards/graphicCard";
import AudioCard from "./cards/audioCard";
import CandyCircles from "../sketches/CandyCircles";
import Bounce from "../sketches/Bounce";
// import Articles from "../pocket.json";

const CALENDAR_ID = process.env.REACT_APP_GOOGLE_CALENDAR_ID;
const CALENDAR_API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
const YOUTUBE_KEY = process.env.REACT_APP_YOUTUBE_KEY;
const YOUTUBE_PLAYLIST = process.env.REACT_APP_YOUTUBE_PLAYLIST;
const contents = [];
export default class Contents extends React.Component {
  state = {
    contents: []
  };

  componentWillMount() {
    // set Google variables
    const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${CALENDAR_API_KEY}`;
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_KEY}&part=snippet,id&order=date&playlistId=${YOUTUBE_PLAYLIST}&ForMine=true&maxResults=20`;

      // fetch youtube videos and calendar events
      axios.all([axios.get(youtubeUrl), axios.get(calendarUrl)]).then(
        axios.spread((youtubeRes, calendarRes) => {
          const videos = youtubeRes.data;
          const events = calendarRes.data;
          // this.addJsonsToArray(videos, events, Articles);
          this.setState({ contents: contents });
        })
      );
  }

  render() {
    const { contents } = this.state;
    return (
      <div className="container" id="results">
        {/*<GraphicCard />*/}
        {/*<AudioCard sketch={CandyCircles}/>*/}
        <AudioCard sketch={Bounce}/>
        {contents.length > 1 &&
          contents.map((article, i) => <Card card={article} key={i} />)}
      </div>
    );
  }
}

import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import { subscribeToTimer } from './api';

import Header from "./components/header.js";
import Footer from "./components/footer.js"
import Contents from "./components/contents.js";
import './styles/style.css';
import './styles/footer.css';
import './styles/cards.css';

class App extends Component {
  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp 
    }));
  }

  state = {
    timestamp: 'no timestamp yet'
  };
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <Contents />
        <Footer />
        <p>This is the timer value: {this.state.timestamp}</p>
      </div>
    );
  }
}

export default App;

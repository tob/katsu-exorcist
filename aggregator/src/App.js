import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Header from "./components/header.js";
import Contents from "./components/contents.js";
import './styles/style.css';

class App extends Component {

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <Contents />
      </div>
    );
  }
}

export default App;

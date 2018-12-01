import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Header from "./components/header.js";
import Footer from "./components/footer.js"
import Contents from "./components/contents.js";
import './styles/style.css';
import './styles/footer.css';
import './styles/cards.css';

class App extends Component {

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <Contents />
        <Footer />
      </div>
    );
  }
}

export default App;

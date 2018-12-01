import React from "react";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="title contact">
          <h1>The Katsu Exorcist</h1>
          <h2>Book a show</h2>
          <h3>Tobia +31 6 17286436</h3>
          <span>
            <a href="mailto:tobiadonati@gmail.com">email</a>
          </span>
        </div>
        <div className="hero">
          <iframe
            src="https://www.youtube.com/embed/tqbchIJT2x8?rel=0"
            title="The Katsu exorcist"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </>
    );
  }
}

export default Header;

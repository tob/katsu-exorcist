import React from "react";
import videoCard from "./cards/videoCard.js";
import articleCard from "./cards/articleCard.js";
import eventCard from "./cards/eventCard.js";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.determineCardType = this.determineCardType.bind(this);
    this.state = { ready: false, card: this.props.card };
  }

  // assign content and type to card
  determineCardType(card) {
    if (!card) {
      return { type: "no card", content: "no card", order: 0 };
    }
    if (card.snippet) {
      return videoCard(card.snippet.resourceId);
    }
    if (card.resolved_title) {
      return articleCard(card);
    }
    if (card.start) {
      return eventCard(card);
    }
    if (card.quote) {
      return { type: "quote", content: "quote", order: 1 };
    }

    return { type: "undefined", content: "some devil touched this", order: 4 };
  }

  render() {
    const pick = this.determineCardType(this.state.card);
    const content = pick.content;
    let className = `card card__${pick.type} card--${pick.order}`;

    return <div className={className}>{content}</div>;
  }
}

export default Card;

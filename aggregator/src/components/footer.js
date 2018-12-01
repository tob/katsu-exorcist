import React from "react";

export default function footer() {
  const emojis = ["☠", "♥", "ψ", "✇", "✆","㋡", "웃"];
  let icons = [];
  // choose 3 random emoji
  for (let index = 0; index < 3; index++) {
    const element = emojis[Math.floor(Math.random() * (emojis.length - 1))];
    icons.push(element);
  }

  return (
    <div className="footer">
      <h5>Made with <span className="footer__icon">{icons.map(emoji => emoji)}</span> in Amsterdam</h5>
    </div>
  );
}

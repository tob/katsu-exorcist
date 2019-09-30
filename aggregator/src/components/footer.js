import React from "react";


const randomize = (elements, quantity, target) => {
  for (let index = 0; index < quantity; index++) {
    const element = elements[Math.floor(Math.random() * (elements.length - 1))];
    target.push(element);
  }
}

export default function footer({emoji}) {
  let icons = [];
  if (!emoji) {
    randomize(["☠", "♥", "ψ", "✇", "✆","㋡", "웃"], 3, icons);
  }

  return (
    <div className="footer">
      <h5>Made with <span className="footer__icon">{emoji || icons.map(emoji => emoji)}</span> in Amsterdam</h5>
    </div>
  );
}

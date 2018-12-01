import React from "react";

export default function eventCard(event) {
  const start = event.start && new Date(event.start.dateTime);
  const date = start.toDateString();
  const today = new Date();
  // define order based on number of days from today
  const order =  start.getDate() - today.getDate() > 20 ? Math.floor(Math.random() * (4) + 1) : 0; 
  const title = event.summary;
  const location = event.description || event.location || "private event";
  const content = (
    <>
      <span className="card__date">{date}</span>
      <span className="card__title">{title}</span>
      <span className="card__date">{location}</span>
    </>
  );

  return {
    type: "event",
    order: order,
    content: content
  };
}

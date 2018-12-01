import React from "react";

export function eventCard(event) {
  const date = event.start && new Date(event.start.dateTime).toDateString();
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
    order: 0,
    content: content
  };
}

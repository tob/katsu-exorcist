import React from 'react';

export default function videoCard(video) {
  const stringSrc = `https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`;

  return {
    type: "video",
    order: Math.floor(Math.random() * (4) + 1),
    content: (
      <iframe
        className="card__video"
        title={video.Id}
        src={stringSrc}
      />
    )
  };
}

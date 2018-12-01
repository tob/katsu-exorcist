import React from 'react';

export default function videoCard(video) {
  console.log("video" + video);
  const stringSrc = `https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`;

  return {
    type: "video",
    order: 2,
    content: (
      <iframe
        className="card__video"
        title={video.Id}
        src={stringSrc}
      />
    )
  };
}

// import calendar from 'google-calendar-events';

// $(document).ready(function() {

export default async function aggregator () {
  var promise1 = Promise.resolve(fetch());
  console.log(`before promise`);
  const value = await promise1;
  console.log(`Test promise: ${value}`);
  return value
}

function randomInt(min, max) {
  return Math.floor(Math.random() * Math.floor(max)) + min;
}

//fetch youtube videos, pocket articles, events, quotes...
function fetch() {
  // google calendar stuff happening here
  $.grabCalendar().items.forEach(event => {
    createCard(event);
  });


  // youtube
  $.get(
    "https://www.googleapis.com/youtube/v3/playlistItems",
    {
      part: "snippet",
      suggestions: 0,
      playerVars: { rel: 0, showinfo: 0 },
      // channelId : 'UCeCvrBBHeL_5fcuwbe3yVQQ', // You can get one from Advanced settings on YouTube
      type: "video",
      playlistId: "PLHfOkwsRHnCfbtTKsUTYyH3qKmR3v1Jkh",
      maxResults: 20,
      // q: 'katsu',
      forMine: true,
      order: "date",
      key: "AIzaSyAc6H9SedjaWcOwNXDNzCqTrBx01ZT1jD8"
    },
    function(data) {
      $.each(data.items, function(i, item) {
        createCard(item.snippet.resourceId);
      });
      return data.responseText;
    }
  );
}

// moving contacts around
var s = $(".title");
var pos = s.position();
$(window).scroll(function() {
  var windowpos = $(window).scrollTop();
  if (windowpos >= pos.top) {
    s.addClass("large");
  } else {
    s.removeClass("large");
  }
});

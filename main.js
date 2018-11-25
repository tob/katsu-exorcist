$(document).ready(function() {
  fetch().then(function(data) {
    // populate(data) // this doesn't work because no data are ready yet.
  });
});

// Append single card to the DOM
function createCard(card) {
  const pick = determineCardType(card);
  const content = pick.content;
  let className = `card card__${pick.type}`;

  content &&
    $("#results").append(
      '<div class="' + className + '">' + content + "</div>"
    );
}

// Article html markup
function articleCard(article) {
  const title = article.resolved_title;
  if (!title) { return }
  const link = article.resolved_url;
  const source = article.domain_metadata && article.domain_metadata.name || "source";
  const image = article.top_image_url;
  return (`
    ${image ? `<img class="card__image" src="${image}" /></br>` : ''}
    <span class="card__title">${title}</span>
    </br>
    <a class="card__link" target="_blank" href="${link}">${source}</a>`);
}

// event html markup
function eventCard(event) {
  const date = event.start && new Date(event.start.dateTime).toDateString();
  const title = event.summary;
  const location = event.description || event.location || "private even";
  return `<span class="card__date">
  ${date}</span></br>
  <span class="card__title">${title}</span>
  </br>
  <span class="card__date">${location}</span>`;
}

// assign content and type to card
function determineCardType(card) {
  if (card.videoId) {
    return (
      {
        type: 'video',
        content: `<iframe class="card__video" src="https://www.youtube.com/embed/${card.videoId}?rel=0&modestbranding=1"></iframe>`
      });
  }
  if (card.resolved_title) {
    return ({type: 'article',
     content: articleCard(card),
    });
  }
  if (card.start) {
    return ({type: 'event',
     content: eventCard(card),
    });
  }
  if (card.quote) {
    return "quote";
  }

  return null;
}

// Shuffle and creates cards
function populate(data) {
  data.sort(function() {
    return 0.5 - Math.random();
  });

  if (data.length > 1) {
    data.forEach(card => {
      createCard(card);
    });
  }
}

//fetch youtube videos, pocket articles, events, quotes...
async function fetch() {
  const contents = [];

  // youtube
  var youtubes = await $.get(
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
        contents.push(item.snippet.resourceId);
      });
      return data.responseText;
    }
  );

  // google calendar stuff happening here
  $.grabCalendar().items.forEach(event => {
    contents.push(event);
  });

  // Pocket articles
  await loadJSON(function(response) {
    // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
    $.each(actual_JSON.list, function(i, item) {
      contents.push(item);
    });
  });

  // get events

  // populate DOM
  setTimeout(function() {
    populate(contents);
  }, 2000);

  return contents;
}

//Calls json and make it ready to parse
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "./pocket.json", true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
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

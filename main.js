const events = [
  {
    date: "12th December",
    title: "Van der Geld exorcism",
    link: "private event"
  },
  {
    date: "25th December",
    title: "Rosemary's baby birthday",
    link: "private event"
  },
  {
    date: "26th December",
    title: "saint Stephan's revenge mission",
    link: "private event"
  },
  {
    date: "27th December",
    title: "Black Sabbath reunion",
    link: "private event"
  },
];

$(document).ready(function() {
  fetch().then(function(data) {
    // populate(data)
  });
});

// Append card to the DOM
function createCard(card) {
  const title = card.resolved_title || card.title;
  const link = card.resolved_url;
  const date = card.date;
  const source = card.domain_metadata && card.domain_metadata.name || card.link || "source" ;
  const image = card.top_image_url;
  const titleH3 = title && `<span class="card__title">${title}</span>`;
  const video = card.videoId;
  const linkA = link
    ? `<a class="card__link" target="_blank" href="${link}">${source}</a>`
    : `<span class="card__date">${source}</span>`;
  const imageImg = image && `<img class="card__image" src="${image}" /></br>`;

  // happy path pocket article
  let content = imageImg && imageImg + titleH3 + "</br>" + linkA
  let className = "card card__flexFont";

  // event card
  if (date) {
    content = '<span class="card__date">'+ card.date +'</span>'  + "</br>" + titleH3  + "</br>" +  linkA;
    className = "card card__event"
  }

  // youtube video 
  if (video) {
    content = `<iframe class="card__video" src="https://www.youtube.com/embed/${video}?rel=0&modestbranding=1"></iframe>`;
    className = "card card__video"
  }


  content && $("#results").append('<div class="' + className + '">' + content + "</div>");
}

// Populate
function populate(data) {
  data.sort(function() {
    return 0.5 - Math.random();
  });

  if (data.length > 1) {
    data.forEach(card => {
      createCard(card);
    });
  }

  // flexFont();
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

  events.forEach(event => {
    contents.push(event);
  })

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

// flexFont = function() {
//   var divs = document.getElementsByClassName("card__flexFont");
//   for (var i = 0; i < divs.length; i++) {
//     var length = divs[i].innerHTML.length;
//     var largestSize =
//       divs[i].offsetHeight <= divs[i].offsetWidth || divs[i].offsetHeight >= 800
//         ? divs[i].offsetWidth
//         : divs[i].offsetHeight;

//     var relFontsize = (largestSize * 15) / length;
//     divs[i].style.fontSize = relFontsize >= 20 ? relFontsize + "px" : "20px";
//   }
// };

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

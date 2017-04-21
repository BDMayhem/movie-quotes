$(document).ready(function() {
  newQuote();
});

var movieTitle;

//movie quote api
function newQuote() {
  $.ajax({
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies",
    type: "GET",
    dataType: "json",
    success:
      function(a) {
        $("#quote").html(a.quote);
        $("#name").html("<p>— <span id='movie'>" + a.author + "</span></p>");
        movieTitle = a.author;
        background();
      },
    cache: false,
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "d1ZlukmLzimsh8gzDClZ88DUD6CIp18YFHGjsnqQ4ObGnkJIrq")
    }   
  })
}

function background(){  
  var baseURL = "https://image.tmdb.org/t/p/original";

  //The Movie Database API settings, search for movie title
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key=fd9de4bd981523c174869e0050b94df9&query=" + movieTitle,
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
//set background image based on movie title search
  $.ajax(settings).done(function (response) {
    var bgURL = baseURL + response.results["0"].backdrop_path;
    var body = $("body");
    $("body").css("background-image", "url(" + bgURL + ")");
  });
}

//press the button to get a new quote
$('#quote-button').on('click', function() {
  newQuote();
});

//press the button to tweet the quote
$('#tweet-button').on('click', function() {
  var textContent = $('#quote').text().trim();
  textContent += " " + $('#name').text().trim();
  if (textContent.length > 140) {
    var tweet = textContent.substring(0, 137);
    tweet += "...";
  } else {
    tweet = textContent;
  };
  window.open("https://www.twitter.com/intent/tweet?text=" + tweet);
});

//stop focus on button after you click it
$(".btn").mouseup(function(){
  this.blur();
})
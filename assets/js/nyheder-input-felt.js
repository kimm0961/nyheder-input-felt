// Global variabler

var wsurl;

//URL/adresse til webservicen i variabel
wsurl =
  "https://newsapi.org/v2/everything?qInTitle=cookies&language=en&apiKey=0e1d7048365d48f18e26a1535c969ddc"; // Søgeord hentes fra inputfeltet

// Det der skal ske når siden loader
window.onload = function() {
  // Lyt efter "keyup" i inputfeltet - for så skal der søges (kalde funktionen som henter data)

  document.querySelector("#inpNyhed").addEventListener("keyup", function() {
    // Hent value fra input-feltet - altså der der skal søges på
    var soegeord = document.querySelector("#inpNyhed").value;

    // Lav nu webservice-url MED søgeord på

    wsurl =
      "https://newsapi.org/v2/everything?qInTitle=" +
      soegeord +
      "&language=en&apiKey=0e1d7048365d48f18e26a1535c969ddc";

    // Når der søges: Kald (igen) funktionen som søger data
    kaldWebservice();
  });

  // Når siden loader: Kald funktionen som kalder webservicen (request) og modtager data (response)
  // kaldWebservice();
};

// Funktion til at kalde webservicen
kaldWebservice();

function kaldWebservice() {
  // Fetch metoden
  fetch(wsurl, {
    method: "GET" // get/hent data
  })
    .then(function(data) {
      return data.json();
    })
    .then(function(jsondata) {
      lavDatalist(jsondata);
      console.log(jsondata);
    })
    .catch(function(error) {
      console.log("Noget gik galt: " + error);
    });
}

function lavDatalist(nyheddata) {
  var nyhedtitel = "";

  for (var x in nyheddata.articles) {
    nyhedtitel +=
      "<div class='col-4 pb-5'>" +
      "<div class='card'>" +
      "<img src='" +
      nyheddata.articles[x].urlToImage +
      "' class='card-img-top'/>" +
      "<div class='card-body'>" +
      "<h5 class='card-title'>" +
      nyheddata.articles[x].title +
      "</h5>" +
      "<em>" +
      nyheddata.articles[x].author +
      "</em>" +
      "<p class='card-text'>" +
      nyheddata.articles[x].description +
      "</p>" +
      "<button type='button' class='btn btn-info'>" +
      "Læs mere" +
      "</button>" +
      "</div>" +
      "</div>" +
      "</div>";
  }
  // Udskriv i html
  document.querySelector(".card-deck").innerHTML = nyhedtitel;
}

// "<div class='"card"'>" +
// "<img src='" + nyheddata.articles[x].urlToImage + "' class='"card-img-top"'/>" +
//   "<div class='"card-body"'>" +
//   "<h5 class='"card-title"'>" + nyheddata.articles[x].title + "</h5>"
//   + "<em>" + nyheddata.articles[x].author + "</em>" + "<p class='"card-text"'>" + nyheddata.articles[x].description + "</p>"
//   + "</div>" + "</div>";

{
  /* <div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div> 

// nyhedtitel +=  "<img src='" + nyheddata.articles[x].urlToImage + "'/>" + "<h2>" + nyheddata.articles[x].title + "</h2>" + "<em>" + nyheddata.articles[x].author + "</em>" + "<p>" + nyheddata.articles[x].description + "</p>"; */
}

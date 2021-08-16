const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "856b26ea";
const APP_KEY = "1dc3d844bd3d38ef0352616a21c3f14d";
var button = document.getElementById("addadrink");
const recipeCards = document.getElementById("recipeCards");
const drinkContainer = document.getElementById("drinkContainer");
const previousRecipeSearches = document.getElementById("previousRecipeSearches");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});
async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=3`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
    <div class="card" style="width: 20rem;">
      <img src="${
        result.recipe.image
      }" class="card-img-top recipeCardsImg" alt="">
      <div class="card-body">
          <h1 class="card-title">${result.recipe.label}</h1>
          <a class= "btn btn-success" href="${
            result.recipe.url
          }" target="_blank" >View Recipe</a>
        </div>
        <p class="card-text textStyling">Calories: ${result.recipe.calories.toFixed(
          2
        )}</p>
      </div>
    `;
  });
  console.log(recipeCards);
  console.log(generatedHTML);
  recipeCards.innerHTML = generatedHTML;
}

function addadrink() {
  // grab the element ID - remove ()
  var drinkAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  fetch(drinkAPI)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      console.log(data);
      displayCocktail(data);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function displayCocktail(data) {
  drinkContainer.innerHTML = "";
  let cocktail = data.drinks[0];
  // let cocktailDiv = document.getElementById("cocktail");
  let cocktailName = cocktail.strDrink;

  let newCocktailDiv = document.createElement("div");
  newCocktailDiv.classList.add(["card", "cocktailCard"]);

  let cocktailImg = document.createElement("img");
  cocktailImg.src = cocktail.strDrinkThumb;
  cocktailImg.classList.add(["card-img-top", "drinksCardsImg"]);

  let heading = document.createElement("h1");
  heading.innerText = cocktailName;
  heading.classList.add(["card-title"]);

  newCocktailDiv.appendChild(cocktailImg);
  newCocktailDiv.appendChild(heading);

  drinkContainer.appendChild(newCocktailDiv);

  // cocktailDiv.appendChild(cocktailImg);
}
button.addEventListener("click", addadrink);


let previousSearches = JSON.parse(localStorage.getItem(“searchResults”)) || [];
// Save a Search
function saveSearch (searchTerm) {
  if (previousSearches.indexOf(searchTerm) == -1) {
    previousSearches.unshift(searchTerm);
    if (previousSearches.length > 3) {
      previousSearchess.pop();
    }
    localStorage.setItem(“searchResults”, JSON.stringify(previousSearches));
  }
showPreviousSearches();
}
// Display search - interface/UI
function showPreviousSearches() {
  console.info(previousSearches);


function generateRecipeHTML(previousSearches) {
  let generatedRecipeHTML = "";
  results.map(() => {
    generatedRecipeHTML += `
    <div class="card" style="width: 20rem;">
      <img src="${
        result.recipe.image
      }" class="card-img-top recipeCardsImg" alt="">
      <div class="card-body">
          <h1 class="card-title">${result.recipe.label}</h1>
          <a class= "btn btn-success" href="${
            result.recipe.url
          }" target="_blank" >View Recipe</a>
        </div>
        <p class="card-text textStyling">Calories: ${result.recipe.calories.toFixed(
          2
        )}</p>
      </div>
    `;
  });
  console.log(recipeCards);
  console.log(generatedHTML);
  recipeCards.innerHTML = generatedHTML;


}
showPreviousSearches();
// // fires when it loads - need to link
// End - Local Storage Feature



// Local Storage Feature
// var previousSearches = [];
// if (previousSearches[previousSearches]) {
//   const history = JSON.parse(localStorage.getItem("searchResults"));
// }
// if (previousSearches.indexOf(search) == -1) {
//   previousSearches.unshift(search);
//   if (previousSearches.length > 3) {
//     previousSearches.pop();
//   }
//   localStorage.setItem("searchResults", JSON.stringify(previousSearches));
// }
// function drawpreviousSearches() {
//   if (previousSearches.length) {
//     var html = previousSearchesTemplate({ search: previousSearches });
//     $("#previousSearches").html(html);
//   }
// }
// $(document).on("click", ".pastSearchLink", function (e) {
//   e.preventDefault();
//   var search = $(this).text();
//   doSearch(search);
// });
// // fires when it loads - need to link
// localStorage.setItem("searchResults", JSON.stringify(previousSearches));
// // End - Local Storage Feature

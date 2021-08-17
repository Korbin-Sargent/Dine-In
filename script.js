const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
const APP_ID = "856b26ea";
const APP_KEY = "1dc3d844bd3d38ef0352616a21c3f14d";
var button = document.getElementById("addadrink");
const recipeCards = document.getElementById("recipeCards");
const drinkContainer = document.getElementById("drinkContainer");
const previousRecipeSearches = document.getElementById(
  "previousRecipeSearches"
);
let searchInput = document.getElementById("searchInput");

previousRecipeSearches.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.matches(".searchButton")) {
    let searchTextValue = e.target.dataset.value;
    console.log(searchTextValue);
    searchInput.value = searchTextValue;
    fetchAPI(searchTextValue);
  }
});

// let previousSearches = JSON.parse(localStorage.getItem(“Test1”)) || [];

searchForm.addEventListener("submit", (e) => {
  let searchQuery = e.target.querySelector("input").value;
  e.preventDefault();
  fetchAPI(searchQuery);
  // saveSearch(searchQuery);
});
async function fetchAPI(searchValue) {
  const baseURL = `https://api.edamam.com/search?q=${searchValue}&app_id=${APP_ID}&app_key=${APP_KEY}&to=3`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
  saveSearch(searchValue);
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

const previousSearches =
  JSON.parse(localStorage.getItem("searchResults")) || [];
console.log(previousSearches);
// Save a Search
function saveSearch(searchQuery) {
  console.log(previousSearches);
  // console.log(searchQuery);
  if (previousSearches.indexOf(searchQuery) == -1) {
    previousSearches.unshift(searchQuery);
    if (previousSearches.length > 3) {
      previousSearches.pop();
    }
    localStorage.setItem("searchResults", JSON.stringify(previousSearches));
  }
  showPreviousSearches(previousSearches);
}
// Display search - interface/UI
function showPreviousSearches(previousSearchesData) {
  let generatedRecipeHTML = "";
  // console.log(previousSearches);
  previousSearchesData.map((previousSearch) => {
    console.log(previousSearch);
    generatedRecipeHTML += `
          <div class="btn-group-vertical">
          <button type="button" class="btn btn-secondary searchButton" data-value = "${previousSearch}">${previousSearch}</button>
          </div>`;

    //       <h1 class="card-title">${result.recipe.label}</h1>

    //       result.recipe.url
    //     }" target="_blank" >View Recipe</a>
    //   </div>
    //   <p class="card-text textStyling">Calories: ${result.recipe.calories.toFixed(
    //     2
    //   )}</p>
    // </div>
  });
  // console.log(previousSearches);
  // console.log(generatedRecipeHTML);
  previousRecipeSearches.innerHTML = generatedRecipeHTML;
}
// showPreviousSearches();
// fires when it loads - need to link
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

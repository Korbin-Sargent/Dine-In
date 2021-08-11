let searchButton = document.querySelector("#search");

// Add an event listener to the button that runs the function sendApiRequest when it is clicked
searchButton.addEventListener("click", () => {
  console.log("buton pressed");
  sendApiRequest();
});

// An asynchronous function to fetch data from API
async function sendApiRequest() {
  let APP_ID = "f5ce3119";
  let APP_KEY = "8070b4534587b181333e25bd3b8eb54b";
  let response = await fetch(
    "https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=f5ce3119&app_key=8070b4534587b181333e25bd3b8eb54b&imageSize=REGULAR&random=true&field=uri&field=label&field=image&field=source&field=url&field=ingredientLines&field=ingredients"
  );
  console.log(response);
  let data = await response.json();
  console.log(data);
  useApiData(data);
}

// Function that does something with the data received from the API.  The name of the function should be customized to whatever you are doing
function useApiData(element) {
  let menuItem = "";
  for (let i = 0; i < 10; i++) {
    menuItem =
      menuItem +
      `
      <div class="card" style="width: 18rem;">
      <img src="${element.hits[i].recipe.image}" class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="card-title">${element.hits[i].recipe.label}</h5>
          <p class="card-text">${element.hits[i].recipe.source}</p>
          <a href="${element.hits[i].recipe.source}" class="btn btn-primary">Go somewhere</a>
      </div>
  </div>
  `;
  }
  document.querySelector(".container-fluid").innerHTML = menuItem;
}

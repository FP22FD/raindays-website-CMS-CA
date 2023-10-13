const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

let data = undefined;

async function displayJacket(id) {
  const url = "https://api.noroff.dev/api/v1/rainy-days/" + id;

  const response = await fetch(url);
  data = await response.json();
  console.log("data", data);

  const section = document.querySelector("#product-details");

  section.querySelector("#title").innerHTML = data.title;
  section.querySelector("#price").innerHTML = data.price;
  section.querySelector("#description").innerHTML = data.description;
  section.querySelector("img").src = data.image;
}

displayJacket(id);

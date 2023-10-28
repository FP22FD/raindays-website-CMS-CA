import { settings } from "./settings.js";
import { displaySpinner, displayError } from "./shared.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

let data = undefined;

const baseUrl = `${settings.wp_baseurl}/wp-json/wc/v3/products/${id}?consumer_key=${settings.woo.consumer_key}&consumer_secret=${settings.woo.consumer_secret}`;

// ---------------------------------------------------------------------

async function displayJacket(id) {
  try {
    document.querySelector(".product").style.visibility = "hidden";
    displaySpinner(true);

    const response = await fetch(baseUrl);
    data = await response.json();

    const section = document.querySelector("#product-details");

    section.querySelector("#title").innerHTML = data.name;
    section.querySelector("#price").innerHTML = data.price;
    section.querySelector("#description").innerHTML = data.description;
    section.querySelector("img").src = data.images[0].src;
    section.querySelector(".item5").innerHTML = data.sku;
  } catch (e) {
    displayError(true);
    document.querySelector(".product").style.display = "none";
  } finally {
    displaySpinner(false);
    document.querySelector(".product").style.visibility = "visible";
  }
}

displayJacket(id);

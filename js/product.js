// --------------popup---------------
import { updatePopupBag } from "./cart.js";

let bag = JSON.parse(localStorage.getItem("bag"));
if (bag === null) {
  bag = [];
}

updatePopupBag(bag);

// ---------------------------

// let x = localStorage.getItem("favorites");
// let favorites = JSON.parse(x);

let favorites = JSON.parse(localStorage.getItem("favorites"));

//--------section product details---------------------//

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
// console.log(id);

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

//--------secction products---------------------------//

// referenza globale per poter utilizzare i prodotti nelle varie funzioni
let products = [];

async function displayJackets() {
  const url = "https://api.noroff.dev/api/v1/rainy-days";

  const response = await fetch(url);
  const data = await response.json();
  console.log("data", data);

  data.sort(function (a, b) {
    const sortOrder = a.title.localeCompare(b.title);
    return sortOrder;
  });

  products = data;

  updateProducts(data);
}

function updateProducts(data) {
  const products = document.querySelector("#products");
  products.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const template = document.querySelector("#product");

    const product = template.content.cloneNode(true);

    product.querySelector("h4").innerText = item.title;
    product.querySelector("span").innerText = item.price;
    product.querySelector("img").alt = item.title;
    product.querySelector("img").src = item.image;

    const links = product.querySelectorAll("a");
    for (let ia = 0; ia < links.length; ia++) {
      const link = links[ia];

      link.href = "product.html?id=" + item.id;
    }
    // product.querySelector("a").href = "product.html?id=" + item.id;

    const favoriteIcon = product.querySelector("i.fa-heart");
    if (favorites.includes(item.id)) {
      favoriteIcon.style.color = "red";
      favoriteIcon.classList.add("fa-solid");
    } else {
      favoriteIcon.classList.add("fa-regular");
    }

    product.querySelector("i.fa-heart").addEventListener("click", function () {
      console.log(item.id);

      if (favorites.includes(item.id) === false) {
        favorites.push(item.id);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        updateProducts(data);
      } else {
        favorites = favorites.filter((favoriteId) => favoriteId !== item.id);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        updateProducts(data);
      }
    });

    products.appendChild(product);
  }
}

displayJackets();

document.querySelector("#btnAddToBag").addEventListener("click", function () {
  const inBag = bag.find((x) => x.id === id);
  if (inBag === undefined) {
    // non trovato, aggiungilo
    bag.push({ id: id, qty: 1, image: data.image, title: data.title, price: data.price });
  } else {
    // trovato, modifica la qty
    inBag.qty = inBag.qty + 1;
  }

  localStorage.setItem("bag", JSON.stringify(bag));

  // quando abbiamo finito...
  // equivale a <a href="bag.html">...</a>
  window.location.href = "bag.html";
});

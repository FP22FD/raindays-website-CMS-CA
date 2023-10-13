import { updatePopupBag } from "./cart.js";

let x = localStorage.getItem("favorites");
let favorites = JSON.parse(x);

if (favorites === null) {
  favorites = [];
}

async function displayJackets() {
  const url = "https://api.noroff.dev/api/v1/rainy-days";

  const response = await fetch(url);
  const data = await response.json();
  //   console.log("data", data);

  // attenzione: "sort" modifica l'array direttamente, non ne fa una copia.

  // vogliamo ordinare i dati con qualcosa di "sensato"
  // https://stackoverflow.com/a/51169
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
  // data.sort((a, b) => a.title.localeCompare(b.title));

  // equivale a
  data.sort(function (a, b) {
    /*
        > 0 => sort a after b, e.g. [b, a]
        < 0 => sort a before b, e.g. [a, b]
        === 0 => keep original order of a and b
        */

    // The localeCompare() method of String values returns a number indicating whether this string comes before, or after, or is the same as the given string in sort order.
    // A negative number if referenceStr occurs before compareString; positive if the referenceStr occurs after compareString; 0 if they are equivalent.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    const sortOrder = a.title.localeCompare(b.title);
    return sortOrder;
  });

  //   data.sort(function (a, b) {
  //     if (a.price === b.price) {
  //       return 0;
  //     }
  //     if (a.price > b.price) {
  //       return +1;
  //     }
  //     if (a.price < b.price) {
  //       return -1;
  //     }
  //   });

  updateProducts(data);
}

function updateProducts(data) {
  // trovo il contenitore "padre" con flex wrap
  const products = document.querySelector("#products");
  products.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    // trova il template "prodotto" da utilizzare
    const template = document.querySelector("#product");

    // come fare a farne una copia => nota il .content e il cloneNode(true)
    // https://www.w3schools.com/tags/tag_template.asp
    const product = template.content.cloneNode(true);

    // qui adesso modifichi i vari pezzi del template con i dati del singolo prodotto ricevuto dalle api
    product.querySelector("h4").innerText = item.title;
    // product.querySelector("h4").a = product;

    product.querySelector("span").innerText = item.price;

    product.querySelector("img").alt = item.title;
    product.querySelector("img").src = item.image;
    // product.querySelector("img").href = "product.html?id=" + item.id;

    const links = product.querySelectorAll("a");
    for (let ia = 0; ia < links.length; ia++) {
      const link = links[ia];

      link.href = "product.html?id=" + item.id;
    }

    // product.querySelectorAll("a").forEach((link) => (link.href = "product.html?id=" + item.id));

    const favoriteIcon = product.querySelector("i.fa-heart");
    if (favorites.includes(item.id)) {
      favoriteIcon.style.color = "red";
      //   el.classList.remove("fa-regular");
      favoriteIcon.classList.add("fa-solid");
    } else {
      //   const el = product.querySelector("i.fa-heart");
      favoriteIcon.classList.add("fa-regular");
    }

    product.querySelector("i.fa-heart").addEventListener("click", function () {
      //   console.log(item.id);

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

    // ora lo prendi e lo appendi agli altri
    products.appendChild(product);
  }
}

displayJackets();

//  <----------TEMPLATE bag popup-------->

let getBag = localStorage.getItem("bag");
let bag = JSON.parse(getBag);
if (bag === null) {
  bag = [];
}

updatePopupBag(bag);

/*
[
    {
        "id": "07a7655a-7927-421b-ba6a-b6742d5a75b8",
        "title": "Rainy Days Thunderbolt Jacket",
        "description": "The Women's Rainy Days Thunderbolt jacket is a sleek and stylish waterproof jacket perfect for any outdoor adventure.",
        "gender": "Female",
        "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL"
        ],
        "baseColor": "Black",
        "price": 139.99,
        "discountedPrice": 139.99,
        "onSale": false,
        "image": "https://static.cloud.noroff.dev/public/rainy-days/9-thunderbolt-jacket.jpg",
        "tags": [
            "jacket",
            "womens"
        ],
        "favorite": false
    },
    {
        "id": "298d6c5f-5445-4581-9ff5-be921f4ce37c",
        "title": "Rainy Days Habita Jacket",
        "description": "The Women's Rainy Days Habita jacket is a relaxed fit with breathable material that is a packable answer to uncertain weather.",
        "gender": "Female",
        "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL"
        ],
        "baseColor": "Black",
        "price": 129.99,
        "discountedPrice": 129.99,
        "onSale": false,
        "image": "https://static.cloud.noroff.dev/public/rainy-days/3-habita-jacket.jpg",
        "tags": [
            "jacket",
            "womens"
        ],
        "favorite": true
    },
    {
        "id": "6e5ae9e6-2033-4c63-82b9-5b58226425f4",
        "title": "Rainy Days VitaForce Jacket",
        "description": "The Women's Rainy Days VitaForce jacket is a breathable and sustainable waterproof jacket for hiking.",
        "gender": "Female",
        "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL"
        ],
        "baseColor": "Green",
        "price": 124.99,
        "discountedPrice": 124.99,
        "onSale": false,
        "image": "https://static.cloud.noroff.dev/public/rainy-days/6-vitaforce-jacket.jpg",
        "tags": [
            "jacket",
            "womens"
        ],
        "favorite": true
    },
    {
        "id": "97e77845-a485-4301-827f-51b673d4230f",
        "title": "Rainy Days M83 Jacket",
        "description": "The Women's Rainy Days M83 jacket delivers waterproof, breathable protection from head to waist. Perfect for the adventure seekers.",
        "gender": "Female",
        "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL"
        ],
        "baseColor": "Black",
        "price": 109.99,
        "discountedPrice": 99.99,
        "onSale": true,
        "image": "https://static.cloud.noroff.dev/public/rainy-days/1-m83-jacket.jpg",
        "tags": [
            "jacket",
            "womens"
        ],
        "favorite": true
    },
    {
        "id": "987cabbf-b41e-4353-8bf2-3fbfbbf0e7d5",
        "title": "Rainy Days Silverbreeze Jacket",
        "description": "The Women's Rainy Days Silverbreeze jacket is the ultimate waterproof rain jacket for those stormy weather conditions.",
        "gender": "Female",
        "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL"
        ],
        "baseColor": "Gray",
        "price": 139.99,
        "discountedPrice": 114.99,
        "onSale": true,
        "image": "https://static.cloud.noroff.dev/public/rainy-days/4-silverbreeze-jacket.jpg",
        "tags": [
            "jacket",
            "womens"
        ],
        "favorite": true
    },
    {
        "id": "b01f4f5f-7cb6-489a-b58e-849db1d40187",
        "title": "Rainy Days Rock Creek Jacket",
        "description": "The Women's Rainy Days Rock Creek jacket is a stylish and comfortable rain jacket perfect for city wear.",
        "gender": "Female",
        "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL"
        ],
        "baseColor": "Blue",
        "price": 149.99,
        "discountedPrice": 139.99,
        "onSale": true,
        "image": "https://static.cloud.noroff.dev/public/rainy-days/7-rock-creek-jacket.jpg",
        "tags": [
            "jacket",
            "womens"
        ],
        "favorite": false
    },
    {
        "id": "b4eaa52e-2efe-4075-9772-e0c6d7ba04bb",
        "title": "Rainy Days Venture Jacket",
        "description": "The Women's Rainy Days Venture jacket is a lightweight and packable rain jacket that is perfect for travel.",
        "gender": "Female",
        "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL"
        ],
        "baseColor": "Purple",
        "price": 99.99,
        "discountedPrice": 89.99,
        "onSale": true,
        "image": "https://static.cloud.noroff.dev/public/rainy-days/10-venture-jacket.jpg",
        "tags": [
            "jacket",
            "womens"
        ],
        "favorite": false
    },
    {
        "id": "b8b528fc-6c60-41f6-a5a9-9a8b27a9482a",
        "title": "Rainy Days Akra Jacket",
        "description": "The Women's Rainy Days Akra jacket is bound to be your new go-to water-repellent rain jacket.",
        "gender": "Female",
        "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL"
        ],
        "baseColor": "Red",
        "price": 129.99,
        "discountedPrice": 119.99,
        "onSale": true,
        "image": "https://static.cloud.noroff.dev/public/rainy-days/0-akra-jacket.jpg",
        "tags": [
            "jacket",
            "womens"
        ],
        "favorite": true
    },
    {
        "id": "c54dc861-c62b-4fe7-9a12-17868c25b847",
        "title": "Rainy Days Gelventure Jacket",
        "description": "The Women's Rainy Days Gelventure jacket is the easy answer to all your commuting needs, whether in the city or forest.",
        "gender": "Female",
        "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL"
        ],
        "baseColor": "Red",
        "price": 179.99,
        "discountedPrice": 169.99,
        "onSale": true,
        "image": "https://static.cloud.noroff.dev/public/rainy-days/2-gelventure-jacket.jpg",
        "tags": [
            "jacket",
            "womens"
        ],
        "favorite": true
    },
    {
        "id": "d2e44336-7c12-4a41-bf06-133399da5bd9",
        "title": "Rainy Days Puddle Jumper Jacket",
        "description": "The Women's Rainy Days Puddle Jumper jacket is a stylish and practical jacket for those rainy days.",
        "gender": "Female",
        "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL"
        ],
        "baseColor": "Yellow",
        "price": 149.99,
        "discountedPrice": 139.99,
        "onSale": true,
        "image": "https://static.cloud.noroff.dev/public/rainy-days/11-puddle-jumper-jacket.jpg",
        "tags": [
            "jacket",
            "womens"
        ],
        "favorite": false
    },
    {
        "id": "f396ebf1-357d-4181-b061-9a0468792efe",
        "title": "Rainy Days TrailBlaze Jacket",
        "description": "The Women's Rainy Days TrailBlaze jacket is a durable and waterproof jacket that is perfect for hiking and other outdoor activities.",
        "gender": "Female",
        "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL"
        ],
        "baseColor": "Green",
        "price": 179.99,
        "discountedPrice": 179.99,
        "onSale": false,
        "image": "https://static.cloud.noroff.dev/public/rainy-days/8-trailblaze-jacket.jpg",
        "tags": [
            "jacket",
            "womens"
        ],
        "favorite": false
    },
    {
        "id": "ff94a6eb-524b-4a56-b326-92fd13ee0918",
        "title": "Rainy Days XX Jacket",
        "description": "The Women's Rainy Days XX jacket is a lightweight, packable jacket for those unexpected adventures.",
        "gender": "Female",
        "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL"
        ],
        "baseColor": "Black",
        "price": 109.99,
        "discountedPrice": 109.99,
        "onSale": false,
        "image": "https://static.cloud.noroff.dev/public/rainy-days/5-xx-jacket.jpg",
        "tags": [
            "jacket",
            "womens"
        ],
        "favorite": true
    }
]
*/

async function displayJackets() {
  const url = "https://api.noroff.dev/api/v1/rainy-days";

  const response = await fetch(url);
  const data = await response.json();

  data.sort(function (a, b) {
    const sortOrder = a.title.localeCompare(b.title);
    return sortOrder;
  });

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

    products.appendChild(product);
  }
}

displayJackets();

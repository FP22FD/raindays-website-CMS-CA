export function getCartTotal(cart) {
  let total = 0;

  //cicla e calcula il prezzo
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    // prendi il suo id
    const productId = item.id;
    // moltiplica il suo prezzo al totale x la qty voluta
    const price = item.price * item.qty;

    // aggiungi il suo prezzo al totale
    total = total + price;
    console.log(total);
  }
  return total;
}

export function updatePopupBag(cart) {
  const popup = document.querySelector("#popup-products");
  popup.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    // trova il template "prodotto" da utilizzare
    const getTemplate1 = document.querySelector("#template1");
    const popupTemplate1 = getTemplate1.content.cloneNode(true);

    popupTemplate1.querySelector("#bag-img").src = item.image;
    popupTemplate1.querySelector("h2").innerHTML = item.title;
    popupTemplate1.querySelector("#price").innerHTML = item.price;
    popupTemplate1.querySelector("#qty").value = item.qty;

    popup.appendChild(popupTemplate1);
  }

  const template2 = document.querySelector("#template2");
  const popupTemplate2 = template2.content.cloneNode(true);
  popupTemplate2.querySelector("#final-price").innerHTML = getCartTotal(cart).toFixed(2);

  popup.appendChild(popupTemplate2);

  document.querySelector("#icon-bag-pil span").innerHTML = cart.length;
}

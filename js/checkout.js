import { getCartTotal } from "./cart.js";

//verifica se ci sono prodotti in bag local stora, se non c'e mettere carrello vuoto
let bag = JSON.parse(localStorage.getItem("bag"));
if (bag === null) {
  bag = [];
}

// function getTotal() {
//   let total = 0;

//   //calcula il totale
//   for (let i = 0; i < bag.length; i++) {
//     const item = bag[i];
//     const productId = item.id;
//     const price = item.price * item.qty;
//     total = total + price;
//     console.log(total);
//   }
//   return total;
// }

//svuota la pagina html
const products = document.querySelector("#products");
products.innerHTML = "";

//prendi i prodotti della bag storage uno alla vuota
for (let i = 0; i < bag.length; i++) {
  const item = bag[i];
  //   console.log(i);

  const template1 = document.querySelector("#template1");

  const section1 = template1.content.cloneNode(true);

  section1.querySelector("img").src = item.image;
  section1.querySelector("h1").innerHTML = item.title;
  section1.querySelector("#price").innerHTML = item.price;
  section1.querySelector("#number").innerHTML = item.qty;

  products.appendChild(section1);
}

// //prendi il tremplate e calcula il prezzo totale

const template2 = document.querySelector("#template2");
const section2 = template2.content.cloneNode(true);
section2.querySelector("#final-price").innerHTML = getCartTotal(bag).toFixed(2);
products.appendChild(section2);

//aggiungere l'evento al botini pay e pulisce bag storage

const btnPay = document.querySelector("#btnPay");
btnPay.addEventListener("click", () => {
  console.log("event pay");
  // localStorage.removeItem("bag", JSON.stringify(bag));
  bag = [];
  localStorage.setItem("bag", JSON.stringify(bag));
  // localStorage.setItem("bag", "[]");

  window.location.href = "checkout-success.html";

  // let bag = JSON.parse(localStorage.getItem("bag"));
  // // questo si può semplificare con
  // // let bag = JSON.parse(localStorage.getItem("bag")) || [];
  // if (bag === null) {
  //   bag = [];
  // }
});

// document.querySelector("#btnPay").addEventListener("click", function () {
//   // localStorage.removeItem("bag", JSON.stringify(bag));
//   // window.location.href = "checkout-success.html";
// });

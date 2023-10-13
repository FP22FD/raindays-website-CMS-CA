import { getCartTotal } from "./cart.js";

// function getTotal() {
//   let total = 0;

//   //cicla e calcula il prezzo
//   for (let i = 0; i < bag.length; i++) {
//     const item = bag[i];

//     // prendi il suo id
//     const productId = item.id;
//     // moltiplica il suo prezzo al totale x la qty voluta
//     const price = item.price * item.qty;

//     // aggiungi il suo prezzo al totale
//     total = total + price;
//     console.log(total);
//   }
//   return total;
// }

let bag = JSON.parse(localStorage.getItem("bag"));
// let bag = JSON.parse(localStorage.getItem("bag")) || [];
if (bag === null) {
  bag = [];
}

// pulisce bag
function updateBag() {
  const products = document.querySelector("#main");
  products.innerHTML = "";
  //mensaggio da vedere quando bag vuota
  if (bag.length === 0) {
    document.querySelector("#emptybag").style.display = "block";
  } else {
    document.querySelector("#emptybag").style.display = "none";
  }
  //cicla per ogni prodotto in bag e clona
  for (let i = 0; i < bag.length; i++) {
    const item = bag[i];

    //     // trova il template "prodotto" da utilizzare
    const template1 = document.querySelector("#template1");
    const template2 = document.querySelector("#template2");

    //     // come fare a farne una copia => nota il .content e il cloneNode(true)
    //     // https://www.w3schools.com/tags/tag_template.asp
    const section1 = template1.content.cloneNode(true);
    const section2 = template2.content.cloneNode(true);

    //     // qui adesso modifichi i vari pezzi del template con i dati del singolo prodotto nel bag

    section1.querySelector("img").src = item.image;

    section2.querySelector("h1").innerHTML = item.title;
    section2.querySelector("#price").innerHTML = item.price;
    section2.querySelector("input").value = item.qty;

    section2.querySelector("input").addEventListener("change", (event) => {
      console.log("event input", event.target.value, item.id);
      const prod = bag.find((x) => x.id === item.id);
      prod.qty = event.target.value;
      // item.qty = event.target.value;
      localStorage.setItem("bag", JSON.stringify(bag));
      updateBag();
    });

    //function remove item from cart
    const btnRemove = section2.querySelector("#btnRemove");
    btnRemove.addEventListener("click", () => {
      // closure
      console.log("event remove" + item.id);
      // bag = bag.filter((pr) => pr.id !== item.id);
      bag = bag.filter(function (pr) {
        return pr.id !== item.id;
      });
      localStorage.setItem("bag", JSON.stringify(bag));
      updateBag();
    });

    const links = section1.querySelectorAll("a");
    for (let ia = 0; ia < links.length; ia++) {
      const link = links[ia];
      link.href = "product.html?id=" + item.id;
    }

    //     // ora lo prendi e lo appendi agli altri
    products.appendChild(section1);
    products.appendChild(section2);
  }

  // aggiunge il btn pay
  const template3 = document.querySelector("#template3");
  const section3 = template3.content.cloneNode(true);

  //svuota bag bag dopo che clicco nel btn pay
  const btnPay = section3.querySelector("#btnPay");
  btnPay.addEventListener("click", () => {
    console.log("event pay");
    btnPay.href = "checkout.html?id=" + item.id;
  });

  //   // adesso calcolo il totale
  section3.querySelector("#final-price").innerHTML = getCartTotal(bag).toFixed(2);
  products.appendChild(section3);
}

updateBag();

// updatePopupBag(bag);

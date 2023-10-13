import { updatePopupBag } from "./cart.js";

let getBag = localStorage.getItem("bag");
let bag = JSON.parse(getBag);
if (bag === null) {
  bag = [];
}

updatePopupBag(bag);

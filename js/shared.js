export function displaySpinner(visible) {
  const loading = document.querySelector("#loader");
  if (visible === true) {
    loading.style.display = "block";
    // document.querySelector("#filters").style.display = "none";
  } else {
    loading.style.display = "none";
    // document.querySelector("#filters").style.display = "flex";
  }
}

// -------------------------------------------------------------

export function displayError(visible) {
  const loading = document.querySelector("#error");
  if (visible === true) {
    loading.style.display = "block";
  } else {
    loading.style.display = "none";
  }
}

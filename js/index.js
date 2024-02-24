// Generate seats
function generateSeats() {
  const seatsRows = document.querySelectorAll(".seats-row");
  let id = 1;

  seatsRows.forEach((seatsRow) => {
    seatsRow.innerHTML = " ";
    for (let i = 0; i < 8; i++) {
      seatsRow.innerHTML += `<div id="${id}" class="seat n-a"></div>`;
      id++;
    }
  });
  seatsRandomize();
  addEventsForSeats();
}

function seatsRandomize() {
  const allSeats = document.querySelectorAll(".seats-row .seat");
  allSeats.forEach((seat) => {
    seat.classList.remove("occupied");
    seat.classList.add("n-a");
    if (Math.random() < 0.2) {
      seat.classList.remove("n-a");
      seat.classList.add("occupied");
    }
  });
}

function addEventsForSeats() {
  const allSeats = document.querySelectorAll(".seats-row .seat");
  allSeats.forEach((seat) =>
    seat.addEventListener("click", () => {
      if (seat.classList.contains("n-a")) {
        seat.classList.remove("n-a");
        seat.classList.add("selected");
        updateText();
      } else if (seat.classList.contains("selected")) {
        seat.classList.add("n-a");
        seat.classList.remove("selected");
        updateText();
      }
    })
  );
}

// Film selector
function initFilms(filmsList) {
  const filmsListSelector = document.querySelector(".movie-picker-menu");

  filmsListSelector.innerHTML = " ";

  filmsList.forEach((film) => {
    filmsListSelector.innerHTML += `<option value="${film.price}">${film.name}($${film.price})</option>`;
  });

  filmsListSelector.addEventListener("change", () => {
    generateSeats();
    updateText();
  });
}

function updateText() {
  const seatsNumber =
    document.querySelectorAll(".seats-row .selected").length || 0;
  const seatsPrice = document.querySelector(".movie-picker-menu").value;
  const seatsNumberLabel = document.querySelector(".seats_number");
  const seatsPriceLabel = document.querySelector(".seats_price");
  seatsNumberLabel.innerHTML = String(seatsNumber);
  seatsPriceLabel.innerHTML = String(seatsNumber * seatsPrice);
}

// Buy button
function initButton() {
  const button = document.querySelector(".buy-button");
  const selectedSeats = document.querySelectorAll(".seats-row .selected");

  button.addEventListener("click", () => {
    const allSeats = document.querySelectorAll(".seats-row .seat");
    allSeats.forEach((seat) => {
      if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        seat.classList.add("occupied");
      }
      updateText();
    });
  });
}

// Initialization
generateSeats();
initButton();

const filmsList = [
  { price: 10, name: "Avengers: Endgame" },
  { price: 8, name: "Inception" },
  { price: 12, name: "The Shawshank Redemption" },
  { price: 9, name: "The Dark Knight" },
  { price: 11, name: "Interstellar" },
];
initFilms(filmsList);

var usersList = [];
var playgroundsList = [];
var reservationsList = [];

let cardsContainer = document.querySelector("#cardsContainer");
let row = document.querySelector("#rowData");
let searchbtn = document.querySelector("#searchbtn");

// document.querySelector("#searchbtn").addEventListener("click", () => { ... })

document.querySelector("#searchInput").addEventListener("input", handleSearchAndFilter);

let data;
let https = new XMLHttpRequest();
https.onreadystatechange = function() {
  if (this.status == 200 && this.readyState == 4) {
    data = JSON.parse(this.responseText);
    usersList = data.users;
    playgroundsList = data.playgrounds;
    reservationsList = data.reservations;
    controlFilter();
    displayPlaygroundsList(playgroundsList);
  }
};

https.open("GET", "../assests/data.json");
https.send();

function displayPlaygroundsList(currentPlaygrounds) {
  row.innerHTML = "";
  cardsContainer.innerHTML = "";

  currentPlaygrounds.forEach(pg => {
    let type = `${pg.numberOfPlayers / 2} A Side`;
    let card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="../assests/${pg.imageUrl}" alt="${pg.name}">
      <div class="card-content">
        <h3>${pg.name}</h3>
        <p class="about">${pg.about}</p>
        <p class="location">${pg.city}</p>
        <p class="type">${type}</p>
        <button class="details-btn">View Details</button>
      </div>
    `;

    card.querySelector(".details-btn").addEventListener("click", () => {
      getPlaygroundDetails(pg.id);
    });

    cardsContainer.appendChild(card);
  });
}

function getPlaygroundDetails(id) {
  let playground = data.playgrounds.find(pg => pg.id == id);
  displayPlaygroundDetails(playground);
}

function displayPlaygroundDetails(pg) {
  cardsContainer.innerHTML = "";
  document.querySelector(".filters").style.display = "none";

  let temp = `
    <div>
      <img src="../assests/${pg.imageUrl}" alt="${pg.name}">
      <h2>${pg.name}</h2>
    </div>
    <div class="info">
      <h3>About:</h3>
      <p>${pg.about}</p>
      <p><strong>Number of Players:</strong> ${pg.numberOfPlayers}</p>

      <h3>Rules:</h3>
      <ul>
        <li>Respect time slots</li>
        <li>No food or drinks</li>
        <li>Wear proper shoes</li>
      </ul>

      <h3>Location:</h3>
      <p>${pg.city}</p>
      <h4>Location Info:</h4>
      <p>${pg.address}</p>

      <h3>Amenities:</h3>
      <ul>
        <li>Lighting</li>
        <li>Changing Room</li>
        <li>Toilets</li>
        <li>Parking</li>
      </ul>

      <div class="price-booking-row">
        <p class="price">Price: ${pg.price}</p>

        <select id="available-hours">
          <option value="" disabled selected>Available Hours</option>
        </select>

        <button class="book-btn">Book</button>
      </div>
    </div>
  `;

  row.innerHTML = temp;

  controlAvailableHours(pg);
  document.querySelector(".book-btn").addEventListener("click", function() {
    let selectedHour = document.getElementById("available-hours").value;
    if (selectedHour) {
      bookPlayground(pg.id, [parseInt(selectedHour)]);
      displayBookings();
    } else {
      alert("Please select an available hour before booking!");
    }
  });
}

function controlAvailableHours(playground) {
  let select = document.getElementById("available-hours");
  select.innerHTML = `<option value="" disabled selected>Choose Hour</option>`;

  for (let hour = 0; hour <= 24; hour++) {
    let option = document.createElement("option");
    option.value = hour;

    let displayHour;
    if (hour === 0) displayHour = "12 AM";
    else if (hour < 12) displayHour = `${hour} AM`;
    else if (hour === 12) displayHour = "12 PM";
    else displayHour = `${hour - 12} PM`;

    option.text = displayHour;

    if (playground.reservedHours.includes(hour)) {
      option.disabled = true;
    }

    select.appendChild(option);
  }

  let bookBtn = document.querySelector(".book-btn");
  bookBtn.disabled = true;
  select.addEventListener("change", function () {
    bookBtn.disabled = !select.value;
  });
}

function bookPlayground(id, hours) {
  var playground = playgroundsList.find(ele => ele.id == id);

  hours.forEach(hour => {
    playground.reservedHours.push(hour);
  });

  var reservation = {
    "reservationId": reservationsList.length + 1,
    "userId": localStorage.getItem("userId"),
    "playgroundId": id,
    "reservedHours": hours,
  };

  reservationsList.push(reservation);
}

function displayBookings() {
  row.innerHTML = "";
  cardsContainer.innerHTML = "";

  let title = document.createElement("h2");
title.textContent = "My Bookings";
title.classList.add("bookings-title");
cardsContainer.appendChild(title);

  if (reservationsList.length === 0) {
    const noBookingsMessage = document.createElement("div");
    noBookingsMessage.classList.add("no-booking");
    noBookingsMessage.textContent = "No bookings yet!";
    noBookingsMessage.classList.add("no-bookings"); 
    cardsContainer.appendChild(noBookingsMessage);
    return;
  }

  reservationsList.forEach(reservation => {
    let playground = playgroundsList.find(pg => pg.id == reservation.playgroundId);

    let bookingCard = document.createElement("div");
    bookingCard.classList.add("booking-card");

    bookingCard.innerHTML = `
      <h3>${playground.name}</h3>
      <p><strong>Location:</strong> ${playground.city}</p>
      <p><strong>Reserved Hour(s):</strong> ${reservation.reservedHours.join(", ")}:00</p>
    `;

    cardsContainer.appendChild(bookingCard);
  });
}

function search(query) {
  if (query !== "") {
    const cityResult = cityFilter(query);
    const nameResult = nameFilter(query);
    const merged = cityResult.concat(nameResult);
    const map = new Map();
    merged.forEach(function (playground) {
      map.set(playground.id, playground);
    });
    return Array.from(map.values());
  } else {
    return playgroundsList; 
  }
}

function cityFilter(cityName) {
  return playgroundsList.filter(function(playground) {
    return playground.city.toLowerCase().includes(cityName.toLowerCase());
  });
}

function nameFilter(name) {
  return playgroundsList.filter(function(playground) {
    return playground.name.toLowerCase().includes(name.toLowerCase());
  });
}

function controlFilter() {
  let cities = ["Cairo", "Fayoum", "Giza"];
  let cityFilter = document.getElementById("cityFilter");

  cities.forEach(city => {
    let option = document.createElement("option");
    option.value = city.toLowerCase();
    option.text = city;
    cityFilter.appendChild(option);
  });
}

function handleSearchAndFilter() {
  const searchValue = document.getElementById("searchInput").value.trim().toLowerCase();
  const selectedCity = document.getElementById("cityFilter").value.toLowerCase();

  let filteredPlaygrounds = search(searchValue);

  if (selectedCity) {
    filteredPlaygrounds = filteredPlaygrounds.filter(pg =>
      pg.city.toLowerCase() === selectedCity
    );
  }

  displayPlaygroundsList(filteredPlaygrounds);
}

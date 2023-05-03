const apikey = "6f722a5e8f1542ff8b487429788f1941";
const gameUrl = "https://api.rawg.io/api/games?key=" + apikey;

const cardsPerPage = 9;
let currentPage = 1;
const cards = [];

// Make API call to get games
fetch(gameUrl)
  .then((response) => response.json())
  .then((data) => {
    const games = data.results;
    console.log(games);
    // Function to display cards for a given page number
    const displayCards = (page) => {
      const startIndex = (page - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;

      // Loop through games and create cards for the current page
      for (let i = startIndex; i < endIndex && i < games.length; i++) {
        const game = games[i];
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";
        card.innerHTML = `
          <img class="card-img-top" src="${game.background_image}" alt="${game.name} cover image">
          <div class="card-body">
            <h5 class="card-title">${game.name}</h5>
          </div>
        `;

        card.setAttribute("data-release-date", game.released);

        // Add click event listener to card
        card.addEventListener("click", () => {
          const gameSlug = game.slug;
          window.location.href = `detail.html?slug=${gameSlug}`;
        });

        cards.push(card);
      }

      // Add new cards to the cards container
      const cardsContainer = document.querySelector(".cards-container");
      cards.slice(startIndex, endIndex).forEach((card) => {
        cardsContainer.appendChild(card);
      });
    };

    // Add click event listeners to platform filter dropdown items
    const platformDropdown = document.querySelector("#platformsDropdown");
    const platformDropdownItems =
      platformDropdown.querySelectorAll(".dropdown-item");
    platformDropdownItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        const platform = event.target.dataset.platform
          ? parseInt(event.target.dataset.platform)
          : null;
        platformDropdown.dataset.platform = platform;
        platformDropdown.querySelector(
          ".dropdown-toggle"
        ).innerHTML = `Platform : ${event.target.innerHTML}`;
        currentPage = 1;
        displayCards(currentPage, platform);
      });
    });

    // Display the initial set of cards
    displayCards(currentPage);

    // Add click event listener to "View More" button
    const viewMoreBtn = document.querySelector(".view-more-btn");
    viewMoreBtn.addEventListener("click", () => {
      currentPage++;
      displayCards(currentPage);
    });
  })
  .catch((error) => console.log(error));

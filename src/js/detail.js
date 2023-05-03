const apikey = "6f722a5e8f1542ff8b487429788f1941";
const gameDetailUrl = "https://api.rawg.io/api/games/";

// Récupérer l'identifiant du jeu à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const gameSlug = urlParams.get("slug");

// Faire un appel à l'API RAWG pour récupérer les détails du jeu
fetch(`${gameDetailUrl}${gameSlug}?key=${apikey}`)
  .then((response) => response.json())
  .then((data) => {
    const game = data;

    // Récupérer l'élément img
    const gameCoverContainer = document.querySelector(".game-cover-container");
    const gameCoverImage = document.querySelector("#game-cover-image");

    // Créer un élément <a> pour le bouton externe
    const gameLink = document.createElement("a");
    gameLink.setAttribute("href", game.website);
    gameLink.setAttribute("target", "_blank");

    // Ajouter le bouton externe à la container
    gameCoverContainer.appendChild(gameLink);

    // Modifier l'attribut "alt" de l'image
    gameCoverImage.setAttribute("alt", `${game.name} cover image`);

    // Ajouter l'URL de l'image à l'attribut "src" de l'image
    gameCoverImage.setAttribute("src", game.background_image);

    // Ajouter un événement click sur le bouton "Check website"
    const checkWebsiteButton = document.querySelector("#check-website-button");
    checkWebsiteButton.addEventListener("click", () => {
      window.open(game.website, "_blank");
    });

    // Récupérer l'élément h1
    const gameTitle = document.querySelector(".game-title");

    // Modifier le contenu de l'élément h1 avec les informations du jeu
    gameTitle.innerHTML = `${game.name}, ${game.rating}/5 - ${game.ratings_count} votes`;
    gameTitle.insertAdjacentHTML("afterend", `<p>${game.description}</p>`);
    gameTitle.insertAdjacentHTML(
      "afterend",
      `<p><strong>Developer:</strong> ${game.developers[0].name}</p>`
    );
    gameTitle.insertAdjacentHTML(
      "afterend",
      `<p><strong>Release Date:</strong> ${game.released}</p>`
    );
    gameTitle.insertAdjacentHTML(
      "afterend",
      `<p><strong>Genre:</strong> ${game.genres
        .map((genre) => genre.name)
        .join(", ")}</p>`
    );
    gameTitle.insertAdjacentHTML(
      "afterend",
      `<p><strong>Tags:</strong> ${game.tags
        .map((tag) => tag.name)
        .join(", ")}</p>`
    );
  })
  .catch((error) => console.log(error));

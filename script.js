// ── PROVIDED STARTER CODE — do not modify ──────────────────
async function fetchData() {
  try {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    const response   = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data          = await response.json();
    const pokemonSprite = data.sprites.front_default;
    const imgElement    = document.getElementById("pokemonSprite");

    imgElement.src           = pokemonSprite;
    imgElement.style.display = "block";
  } catch (error) {
    console.error(error);
  }
}
// ───────────────────────────────────────────────────────────

function handleSearch() {
    // Cleanup
    document.getElementById("pokemonSprite").style.display = "none";
    document.getElementById("errorMessage").innerText = "";

    // Validation
    const NAME = document.forms["search"]["pokemonName"].value;
    const ERROR = document.getElementById("errorMessage");
    const REGEX = /^[a-zA-Z-]+$/;
    if (NAME == "") {
        ERROR.innerText = "Please enter a name.";
        return false;
    } else if (NAME.length > 30) {
        ERROR.innerText = "The provided name is too long.";
        return false;
    } else if (!REGEX.test(NAME) && !NAME.toLowerCase() == "Porygon2") { // Hardcoded exception included for Porygon2
        ERROR.innerText = "The provided name contains invalid characters.";
        return false;
    }

    // If everything is good, do the fetch
    let INPUT = document.getElementById("pokemonName").value.toLowerCase();
    console.log("Attempting to fetch: " + INPUT);
    fetchData(INPUT.value);
}
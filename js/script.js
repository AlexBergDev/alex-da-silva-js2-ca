import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
import welcomeMessage from "./ui/welcomeMessage.js"
import renderArticles from "./ui/renderArticles.js";
import searchTitle from "./ui/searchTitle.js";

const articleUrl = baseUrl + "articles";

createMenu();
welcomeMessage();

(async function () {
    const container = document.querySelector(".data")

    try {
        const response = await fetch(articleUrl);
        const json = await response.json();

        renderArticles(json, container);
        searchTitle(json, container);
    } catch (error) {
        console.log(error);
        displayMessage("alert-danger", error, container);
    }
})();
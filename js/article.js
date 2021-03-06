import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";

createMenu();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
    document.location.href = "/";
}

const articleUrl = baseUrl + "articles/" + id;

(async function () {
    try {
        const response = await fetch(articleUrl);
        const article = await response.json();

        document.title = `JavaScript 2 | CA | ${article.title}`;

        const container = document.querySelector(".article-container");

        container.innerHTML = `<h1 class="display-5 font-weight-normal my-2 py-2 border-bottom">${article.title}</h1>
                            <p class="lead font-weight-normal">${article.summary}</p>
                            <p class="fw-bold fst-italic">${article.author}</p>`;
    } catch (error) {
        displayMessage("alert-warning", error, ".article-container");
    }
})();
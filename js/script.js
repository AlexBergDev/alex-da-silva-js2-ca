import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
import welcomeMessage from "./ui/welcomeMessage.js"

const articlesUrl = baseUrl + "articles";

createMenu();
welcomeMessage();

(async function () {
    const container = document.querySelector(".data");

    try {
        const response = await fetch(articlesUrl);
        const json = await response.json();

        container.innerHTML = "";

        json.forEach(function (article) {
            container.innerHTML += `<div class="col-md-6 col-lg-3">
                                        <div class="card">
                                            <div class="card-body">
                                                <h5 class="card-title">${article.title}</h5>
                                                <p class="card-text">${article.summary}</p>
                                                <p class="card-text">${article.author}</p>
                                                <a href="article.html?id=${article.id}" class="btn btn-primary">Read</a>
                                                <i class="far fa-bookmark"></i>
                                            </div>
                                        </div>
                                    </div>`;
        });
    } catch (error) {
        displayMessage("alert-danger", error, ".data");
    }
})();
import { baseUrl } from "./settings/api.js";
import createMenu from "./components/createMenu.js";
import displayMessage from "./components/displayMessage.js";
import redirectUnauthorized from "./components/redirectUnauthorized.js";

redirectUnauthorized();
createMenu();

const articleUrl = baseUrl + "articles";

(async function () {
    const container = document.querySelector("tbody");
    const loading = document.querySelector(".loading");

    try {
        const response = await fetch(articleUrl);
        const json = await response.json();

        loading.innerHTML = "";
        container.innerHTML = "";

        json.forEach(function (article) {
            container.innerHTML += `<tr>
                                        <th scope="row">${article.id}</th>
                                        <td>${article.title}</td>
                                        <td>${article.summary}</td>
                                        <td>${article.author}</td>
                                        <td><a href="edit.html?id=${article.id}"><i class="nav-link fs-5 fas fa-pen"></i></a></td>
                                    </tr>`;
        });
    } catch (error) {
        displayMessage("alert-danger", error, "tbody");
    }
})();
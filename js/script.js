import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
import welcomeMessage from "./ui/welcomeMessage.js"
import { getBookmarks } from "./utils/storage.js";
import bookmarkClick from "./components/bookmarkClick.js";


const articleUrl = baseUrl + "articles";

const bookmarks = getBookmarks();

createMenu();
welcomeMessage();

export async function createArticles() {
    const container = document.querySelector(".data")

    try {
        const response = await fetch(articleUrl);
        const json = await response.json();

        container.innerHTML = "";

        if (json.length === 0) {
            displayMessage("alert-info", "No articles found", ".data");
        }
            
        json.forEach(function (article) {

            let bookmarkClass = "far";

            const doesObjectExist = bookmarks.find(function (fav) {

            return parseInt(fav.id) === article.id;
        });

        if (doesObjectExist) {
            bookmarkClass = "fa";
        }

            container.innerHTML += `<div class="col-md-6 col-lg-3 my-3">
                                        <div class="card shadow-sm border-0 rounded-3">
                                            <div class="card-body">
                                                <h5 class="card-title text-truncate">${article.title}</h5>
                                                <p class="card-text text-truncate">${article.summary}</p>
                                                <p class="card-text">${article.author}</p>
                                                <a href="article.html?id=${article.id}" class="btn btn-primary">Read</a>
                                                <i class="nav-link fs-4 float-end ${bookmarkClass} fa-bookmark" data-id="${article.id}" data-title="${article.title}" data-summary="${article.summary}" data-author="${article.author}"></i>
                                            </div>
                                        </div>
                                    </div>`;
    
        const bookmarkButton = document.querySelectorAll(".card i");

            bookmarkButton.forEach((button) => {
                button.addEventListener("click", bookmarkClick);
            });
        });

        searchTitle(json, container);

    } catch (error) {
        displayMessage("alert-danger", error, ".data");
    }
}

createArticles();

function searchTitle(json, targetElement) {

    const searchTitle = document.querySelector("input#title");

    function searchFunction() {
        const field = event.target.dataset.field;
        const searchValue = event.target.value.trim().toLowerCase();

        const filteredData = json.filter(function (item) {
            if (item[field].toLowerCase().startsWith(searchValue)) {
                return true;
            }
        });

        console.log(searchValue)
        console.log()

        createArticles(filteredData, targetElement);
    }

    searchTitle.addEventListener("keyup", searchFunction);
}
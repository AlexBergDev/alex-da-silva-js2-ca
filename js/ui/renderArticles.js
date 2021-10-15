import { EMPTY_ARTICLES } from "../constants/messages.js"
import displayMessage from "../components/displayMessage.js";
import bookmarkClick from "../components/bookmarkClick.js";
import { getBookmarks } from "../utils/storage.js";

const bookmarks = getBookmarks();

export default function renderArticles(json, container) {

    container.innerHTML = "";

    if (json.length === 0) {
        displayMessage("alert-info", EMPTY_ARTICLES, ".data");
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
}
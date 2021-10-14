import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
import { getBookmarks } from "./utils/storage.js";
import bookmarkClick from "./components/bookmarkClick.js";

createMenu();

const bookmarks = getBookmarks();

const container = document.querySelector(".data");

container.innerHTML = "";

if (bookmarks.length === 0) {
    displayMessage("alert-info", "No bookmarks yet", ".data");
}

for (let i = 0; i < bookmarks.length; i++) {

        let bookmarkClass = "fa";

        const doesObjectExist = bookmarks.find(function (fav) {

        return parseInt(fav.id) === bookmarks[i].id;
    });

    if (doesObjectExist) {
        bookmarkClass = "far";
    }
    
    container.innerHTML += `<div class="col-md-6 col-lg-3 my-3">
                                        <div class="card shadow-sm border-0 rounded-3">
                                            <div class="card-body">
                                                <h5 class="card-title text-truncate">${bookmarks[i].title}</h5>
                                                <p class="card-text text-truncate">${bookmarks[i].summary}</p>
                                                <p class="card-text">${bookmarks[i].author}</p>
                                                <a href="article.html?id=${bookmarks[i].id}" class="btn btn-primary">Read</a>
                                                <i class="nav-link fs-4 float-end ${bookmarkClass} fa-bookmark" data-id="${bookmarks[i].id}" data-title="${bookmarks[i].title}" data-summary="${bookmarks[i].summary}" data-author="${bookmarks[i].author}"></i>
                                            </div>
                                        </div>
                                    </div>`;

    const bookmarkButton = document.querySelectorAll(".card i");

    bookmarkButton.forEach((button) => {
        button.addEventListener("click", bookmarkClick);
    });
};
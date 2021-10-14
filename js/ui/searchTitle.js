import renderArticles from "./renderArticles.js";

export default function searchTitle(json, container) {

    const searchTitle = document.querySelector("input#title");

    function searchFunction() {
        const field = event.target.dataset.field;
        const searchValue = event.target.value.trim().toLowerCase();

        const filteredData = json.filter(function (item) {
            if (item[field].toLowerCase().startsWith(searchValue)) {
                return true;
            }
        });

        renderArticles(filteredData, container);
    }

    searchTitle.addEventListener("keyup", searchFunction);
}
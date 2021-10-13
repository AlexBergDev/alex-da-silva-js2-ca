import createMenu from "./components/createMenu.js";
import redirectUnauthorized from "./components/redirectUnauthorized.js";
import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./components/deleteButton.js";

const token = getToken();

redirectUnauthorized();
createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
    document.location.href = "/";
}

const articleUrl = baseUrl + "articles/" + id;

const form = document.querySelector("form");
const idInput = document.querySelector("#article-id");
const title = document.querySelector("#article-title");
const summary = document.querySelector("#article-summary");
const author = document.querySelector("#article-author");
const message = document.querySelector(".message-container");

(async function () {
    try {
        const response = await fetch(articleUrl);
        const details = await response.json();

        title.value = details.title;
        summary.value = details.summary;
        author.value = details.author;
        idInput.value = details.id;

        deleteButton(details.id);
    } catch (error) {
        console.log(error);
    }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const summaryValue = summary.value.trim();
    const authorValue = author.value.trim();
    const idValue = idInput.value;

    if (titleValue.length === 0 || summaryValue.length === 0 || authorValue.length === 0) {
        return displayMessage("alert-warning", "Please fill out all the inputs", ".message-container");
    }

    updateProduct(titleValue, summaryValue, authorValue, idValue);
}

async function updateProduct(title, summary, author, id) {
    const url = baseUrl + "articles/" + id;
    const data = JSON.stringify({ title: title, summary: summary, author: author });

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.updated_at) {
            displayMessage("alert-success", "Changes successfully saved", ".message-container");
        }

        if (json.error) {
            displayMessage("alert-danger", json.message, ".message-container");
        }
    } catch (error) {
        console.log(error);
    }
}
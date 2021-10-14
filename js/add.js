import { EMPTY_INPUT_VALUE, ARTICLE_PUBLISHED, STANDARD_ERROR } from "./settings/messages.js"
import createMenu from "./components/createMenu.js";
import redirectUnauthorized from "./components/redirectUnauthorized.js";
import displayMessage from "./components/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import { getToken } from "./utils/storage.js";

const token = getToken();

redirectUnauthorized();
createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#article-title");
const summary = document.querySelector("#article-summary");
const author = document.querySelector("#article-author");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const summaryValue = summary.value.trim();
    const authorValue = author.value.trim();

    if (titleValue.length === 0 || summaryValue.length === 0 || authorValue.length === 0) {
        return displayMessage("alert-warning", EMPTY_INPUT_VALUE, ".message-container");
    }

    addProduct(titleValue, summaryValue, authorValue);
}

async function addProduct(title, summary, author) {
    const url = baseUrl + "articles";

    const data = JSON.stringify({ title: title, summary: summary, author: author });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.created_at) {
            displayMessage("alert-success", ARTICLE_PUBLISHED, ".message-container");
            form.reset();
        }

        if (json.error) {
            displayMessage("alert-danger", json.message, ".message-container");
        }

    } catch (error) {

        displayMessage("alert-danger", STANDARD_ERROR, ".message-container");
    }
}
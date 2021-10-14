import { INVALID_LOGIN_VALUE, WRONG_LOGIN_VALUE } from "./settings/messages.js"
import displayMessage from "./components/displayMessage.js";
import { getToken } from "./utils/storage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./components/createMenu.js";

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

const token = getToken();

if (token) {
    location.href = "/";
}

createMenu();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue.length === 0 || passwordValue.length === 0) {
        return displayMessage("alert-warning", INVALID_LOGIN_VALUE, ".message-container");
    }

    executeLogin(usernameValue, passwordValue);
}

async function executeLogin(username, password) {
    const url = baseUrl + "auth/local";

    const data = JSON.stringify({ identifier: username, password: password });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.user) {

            saveToken(json.jwt);
            saveUser(json.user);

           location.href = "/index.html";
        }

        if (json.error) {
            displayMessage("alert-danger", WRONG_LOGIN_VALUE, ".message-container");
        }
    } catch (error) {
        displayMessage("alert-danger", error, ".message-container");
    }
}
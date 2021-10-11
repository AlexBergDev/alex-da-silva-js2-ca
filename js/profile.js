import createMenu from "./components/createMenu.js";
import { getToken } from "./utils/storage.js";
import { getUsername } from "./utils/storage.js";

const token = getToken();

if (!token) {
    location.href = "/";
}

createMenu();

function createWelcome() {
    const container = document.querySelector("h1");

    const username = getUsername();

    container.innerHTML = `<h1 class="display-4 font-weight-normal text-capitalize">Welcome, ${username}!</h1>`;
}

createWelcome();
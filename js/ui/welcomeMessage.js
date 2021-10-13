import { getUsername } from "../utils/storage.js";
import { getToken } from "../utils/storage.js";

const token = getToken();

export default function welcomeMessage() {
    const title = document.querySelector("h1");
    const paragraph = document.querySelector("p");
    const button = document.querySelector(".btn-header")

    const username = getUsername();

    if (token) {
        title.innerHTML = `<h1 class="display-4 font-weight-normal text-capitalize">Welcome, ${username}!</h1>`;
        paragraph.innerHTML = `<p class="lead font-weight-normal">This text is only visible to logged in users.</p>`;
        button.innerHTML = `<a class="btn btn-outline-warning" href="admin.html">Edit Articles</a>`;
    }
}
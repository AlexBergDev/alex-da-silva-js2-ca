import { getUsername } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
    const { pathname } = document.location;

    const container = document.querySelector(".navigation");

    const username = getUsername();

    let authLink = `<a class="btn btn-success ${pathname === "/login.html" ? "active" : ""}" href="login.html">Login</a>`;

    if (username) {
        authLink = `<div class="mt-1 mx-3 text-muted">Logged in: <strong class="text-dark text-capitalize">${username}</strong></div>
                    <div class="row">
                        <a class="col-sm btn btn-warning ${pathname === "/profile.html" ? "active" : ""}" href="profile.html">Profile</a>
                        <button class="col-sm btn btn-danger" id="logout">Logout</button>
                    </div>`;
    }

    container.innerHTML = `<nav class="navbar navbar-expand-sm navbar-light bg-light">
                            <div class="container">
                                <a class="navbar-brand" href="/">JS2 | M2</a>
                                <button class="navbar-toggler border-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    </ul>
                                    <div class="d-flex">
                                        ${authLink}
                                    </div>
                                </div>
                            </div>
                            </nav>`;

    logoutButton();
}

                
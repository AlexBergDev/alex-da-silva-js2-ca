import { getUsername } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
    const { pathname } = document.location;

    const container = document.querySelector(".navigation");

    const username = getUsername();

    let authLink = `<div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link ${pathname === "/" ? "active" : ""}" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${pathname === "/bookmarks.html" ? "active" : ""}" href="bookmarks.html">Bookmarks</a>
                            </li>
                        </ul>
                        <div class="d-flex">
                            <a class="btn btn-success ${pathname === "/login.html" ? "active-btn" : ""}" href="login.html">Login</a>
                        </div>
                    </div>`;

    if (username) {
        authLink = `<div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link ${pathname === "/" ? "active" : ""}" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${pathname === "/bookmarks.html" ? "active" : ""}" href="bookmarks.html">Bookmarks</a>
                            </li>
                        </ul>
                        <div class="d-flex">
                            <div class="mt-1 mx-3 text-muted">Logged in: <strong class="text-dark text-capitalize">${username}</strong></div>
                                            <div class="row">
                                                <a class="col-sm btn btn-warning ${pathname === "/admin.html" ? "active-btn" : ""}" href="admin.html">Admin</a>
                                                <button class="col-sm btn btn-danger" id="logout">Logout</button>
                                            </div>
                            </div>
                        </div>`;
    }

    container.innerHTML = `<nav class="navbar navbar-expand-sm navbar-light bg-light">
                            <div class="container">
                                <a class="navbar-brand" href="/">JS2 | CA</a>
                                <button class="navbar-toggler border-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                ${authLink}
                            </div>
                            </nav>`;

    logoutButton();
}
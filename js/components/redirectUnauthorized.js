import { getToken } from "../utils/storage.js";

const token = getToken();

export default function redirectUnauthorized() {

    if (!token) {
        location.href = "/";
    }
}
import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";

export default function deleteButton(id) {
    const container = document.querySelector(".delete-container");

    container.innerHTML = `<button type="button" class="btn btn-danger d-grid gap-2 col-5 mx-auto delete">Delete</button>`;

    const button = document.querySelector("button.delete");

    button.onclick = async function () {

        const doDelete = confirm("Are you sure? You won't be able to recover the article.");

        if (doDelete) {
            const url = baseUrl + "articles/" + id;

            const token = getToken();

            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                await fetch(url, options);

                location.href = "/admin.html";
            } catch (error) {
                console.log(error);
            }
        }
    };
}
document.addEventListener("DOMContentLoaded", () => {
    const mapButton = document.getElementById("toggle-map");
    const galleryButton = document.getElementById("toggle-gallery");
    const mapDropdown = document.getElementById("map-dropdown");
    const galleryDropdown = document.getElementById("gallery-dropdown");

    mapButton.addEventListener("click", () => {
        mapDropdown.classList.toggle("show");

        if (galleryDropdown.classList.contains("show")) {
            galleryDropdown.classList.remove("show");
        }
    });

    galleryButton.addEventListener("click", () => {
        galleryDropdown.classList.toggle("show");

        if (mapDropdown.classList.contains("show")) {
            mapDropdown.classList.remove("show");
        }
    });
});

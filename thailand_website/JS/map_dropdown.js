document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".dropdown-toggle");
    const dropdownContent = document.querySelector(".dropdown-content");

    toggleButton.addEventListener("click", function () {
        dropdownContent.classList.toggle("show");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.querySelector("#auto-exit-checkbox");
    const autoExitTimeContainer = document.querySelector("#auto-exit-time-container");
    const selectElement = document.querySelector("#auto-exit-time-select");

    if (checkbox && autoExitTimeContainer && selectElement) {
        checkbox.addEventListener("change", function () {
            autoExitTimeContainer.classList.toggle("deaktive", !this.checked);
            selectElement.toggleAttribute("disabled", !this.checked);
        });
    }
});

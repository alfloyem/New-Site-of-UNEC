document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-bar input");
    const searchButton = document.querySelector(".search-bar button");
    const helpItems = document.querySelectorAll(".help-item");
    const detailsBlocks = document.querySelectorAll(".help-categories details");

    function handleSearch() {
        const query = searchInput.value.trim().toLowerCase();

        helpItems.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            if (itemText.indexOf(query) > -1) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });

        detailsBlocks.forEach(detail => {
            const items = detail.querySelectorAll(".help-item");
            let allHidden = true;
            items.forEach(item => {
                if (item.style.display !== "none") {
                    allHidden = false;
                }
            });
            detail.style.display = allHidden ? "none" : "";
        });
    }

    searchButton.addEventListener("click", handleSearch);
    searchInput.addEventListener("input", handleSearch);
});

// This script dynamically generates a pagination component and provides a way to export the function for external use.

document.addEventListener("DOMContentLoaded", function () {
  const totalPages = 10; // Total number of pages
  let currentPage = 1; // Current active page

  // Function to create the pagination buttons
  function createPagination(totalPages, currentPage) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ""; // Clear any existing pagination buttons

    // Helper function to create a button element
    const createButton = (text, page, active = false, disabled = false) => {
      const button = document.createElement("button");
      button.classList.add("pagination-button");
      if (active) button.classList.add("active");
      if (disabled) button.disabled = true;
      button.innerText = text;
      button.setAttribute("data-page", page);
      return button;
    };

    // Create and append the "first" and "previous" buttons
    paginationContainer.appendChild(
      createButton("«", 1, false, currentPage === 1)
    );
    paginationContainer.appendChild(
      createButton("‹", currentPage - 1, false, currentPage === 1)
    );

    // Create and append the numbered buttons with ellipses if necessary
    if (currentPage > 2) paginationContainer.appendChild(createButton(1, 1));
    if (currentPage > 3)
      paginationContainer.appendChild(createButton("...", "dots", false, true));

    // Loop to create buttons around the current page
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 0 && i <= totalPages) {
        paginationContainer.appendChild(createButton(i, i, i === currentPage));
      }
    }

    // Create and append ellipses and the last page button if necessary
    if (currentPage < totalPages - 2)
      paginationContainer.appendChild(createButton("...", "dots", false, true));
    if (currentPage < totalPages - 1)
      paginationContainer.appendChild(createButton(totalPages, totalPages));

    // Create and append the "next" and "last" buttons
    paginationContainer.appendChild(
      createButton("›", currentPage + 1, false, currentPage === totalPages)
    );
    paginationContainer.appendChild(
      createButton("»", totalPages, false, currentPage === totalPages)
    );

    // Add click event listeners to all pagination buttons
    document.querySelectorAll(".pagination-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const page = e.target.getAttribute("data-page");
        if (page === "dots") return; // Do nothing if the button is an ellipsis
        currentPage = parseInt(page); // Update the current page
        createPagination(totalPages, currentPage); // Recreate the pagination buttons
      });
    });
  }

  // Initial call to create the pagination when the DOM is loaded
  createPagination(totalPages, currentPage);
});

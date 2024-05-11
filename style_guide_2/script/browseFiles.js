export const improveInputFiles = (panel) => {
  // Select all input elements of type file inside elements with class 'input-files'
  const inputFiles = panel.querySelectorAll('.input-files input[type="file"]');

  // Iterate over each input element
  inputFiles.forEach((inputFile) => {
    // Add change event listener to each input element
    inputFile.addEventListener('change', (event) => {
      // Get the selected files from the event target
      const { files } = event.target;

      // Check if files were selected
      if (files.length > 0) {
        // Get the name of the first selected file
        const fileName = files[0].name;

        // Find the element with class 'file-chosen' within the parent of the input element
        const fileChosen =
          inputFile.parentElement.querySelector('.file-chosen');

        // Check if the 'file-chosen' element exists
        if (fileChosen) {
          // Set the text content of the 'file-chosen' element to the selected file name
          fileChosen.textContent = fileName;

          // Code to save the selected file somewhere else can be added here

          // Log a message indicating the selected file name
          console.log(`Selected file: ${fileName}`);
        }
      }
    });
  });
};

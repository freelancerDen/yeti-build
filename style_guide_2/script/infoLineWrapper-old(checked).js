// // Wait for the entire page to load before executing the script
// window.addEventListener('load', () => {
//   // Define the function to initialize the info line
//   const initInfoLine = (values) => {
//     // Find the parent element with the class 'stretch-panel-info-line-wrapper'
//     const parentElement = document.querySelector('.stretch-panel-info-line-wrapper');
//     // Check if the parent element exists
//     if (!parentElement) {
//       return; // Exit the function if the parent element is not found
//     }

//     // Find all elements with the class 'info-line-box_data' within the parent element
//     const dataFields = parentElement.querySelectorAll('.info-line-box_data');

//     // Check if the values parameter is an array and has the same length as the number of data fields
//     if (!Array.isArray(values) || values.length !== dataFields.length) {
//       // Log an error message to the console if the values are incorrect
//       console.error('Invalid values or number of elements');
//       return; // Exit the function if the values are incorrect
//     }

//     // If values is empty, fill it with zeros
//     if (!values.length) {
//       values = [0, 0, 0];
//     }

//     // Loop through each data field element
//     dataFields.forEach((dataField, index) => {
//       // Get the value corresponding to the current index or use 0 if it doesn't exist
//       const value = values[index] || 0;
//       // Set the text content of the data field element to the value
//       dataField.textContent = value;

//       // Check if the value is negative
//       if (value < 0) {
//         // Add the class 'text__color_red-info' to the data field element
//         dataField.classList.add('text__color_red-info');
//         // Remove the class 'text__color_dark-blue' from the data field element
//         dataField.classList.remove('text__color_dark-blue');

//         // Find the corresponding text element with the class 'info-line-box_text'
//         const textElement = dataField.parentElement.querySelector('.info-line-box_text');
//         // Check if the text element exists
//         if (textElement) {
//           // Add the class 'text__color_red-info' to the text element
//           textElement.classList.add('text__color_red-info');
//           // Remove the class 'text__color_dark-blue' from the text element
//           textElement.classList.remove('text__color_dark-blue');
//         }
//       }
//     });
//   };

//   // Example values
//   const values = [2.5, -1, -1250];

//   // Initialize the info line with the example values
//   initInfoLine(values);
// });

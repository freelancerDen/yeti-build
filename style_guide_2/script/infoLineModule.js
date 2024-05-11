// Export the initInfoLine function
export const initInfoLine = (panel, value1 = 0, value2 = 0, value3 = 0) => {
  // Find the parent element with the class 'stretch-panel-info-line-wrapper'
  const parentElement = panel.querySelector('.stretch-panel-info-line-wrapper');
  // Check if the parent element exists
  if (!parentElement) {
    console.error('Parent element not found');
    return;
  }

  // Find all elements with the class 'info-line-box_data' within the parent element
  const dataFields = parentElement.querySelectorAll('.info-line-box_data');

  // Check if the number of data fields is 3
  if (dataFields.length !== 3) {
    console.error('Invalid number of data fields');
    return;
  }

  // Loop through each data field
  dataFields.forEach((dataField, index) => {
    let value;
    // Determine the value based on the index
    switch (index) {
      case 0:
        value = value1;
        break;
      case 1:
        value = value2;
        break;
      case 2:
        value = value3;
        break;
      default:
        value = 0;
    }

    // Set the text content of the data field to the value
    dataField.textContent = value;

    // Check if the value is negative
    if (value < 0) {
      // Add the class 'text__color_red-info' to the data field
      dataField.classList.add('text__color_red-info');
      // Remove the class 'text__color_dark-blue' from the data field
      dataField.classList.remove('text__color_dark-blue');

      // Find the corresponding text element with the class 'info-line-box_text'
      const textElement = dataField.parentElement.querySelector(
        '.info-line-box_text',
      );
      // Check if the text element exists
      if (textElement) {
        // Add the class 'text__color_red-info' to the text element
        textElement.classList.add('text__color_red-info');
        // Remove the class 'text__color_dark-blue' from the text element
        textElement.classList.remove('text__color_dark-blue');
      }
    }
  });
};

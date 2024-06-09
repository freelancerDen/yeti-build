// Constants for various statuses
export const Working = 'working'; // Represents the status "Working"
export const NotStarted = 'notstarted'; // Represents the status "Not Started"
export const Activated = 'activated'; // Represents the status "Activated"
export const Paused = 'paused'; // Represents the status "Paused"
export const NegativePnl = 'negativepnl'; // Represents the status "Negative P&L"

// Function to display status information based on the provided status
export const displayStatusIndicator = (panel, status = NotStarted) => {
  // Select all elements with the class 'indicator_wrapper' to display status information
  const statusContainers = panel.querySelectorAll('.indicator_wrapper');

  // Options for different statuses
  const options = {
    working: {
      container: 'status-indicator_green', // CSS class for the container representing the "working" status
      dataName: 'working', // Data attribute name for the "working" status
      dataStatus: 'working', // Data attribute value for the "working" status
    },
    notstarted: {
      container: 'status-indicator_white', // CSS class for the container representing the "notstarted" status
      dataName: 'notstarted', // Data attribute name for the "notstarted" status
      dataStatus: 'notstarted', // Data attribute value for the "notstarted" status
    },
    activated: {
      container: 'status-indicator_yellow', // CSS class for the container representing the "activated" status
      dataName: 'activated', // Data attribute name for the "activated" status
      dataStatus: 'activated', // Data attribute value for the "activated" status
    },
    paused: {
      container: 'status-indicator_grey', // CSS class for the container representing the "paused" status
      dataName: 'paused', // Data attribute name for the "paused" status
      dataStatus: 'paused', // Data attribute value for the "paused" status
    },
    negativepnl: {
      container: 'status-indicator_red', // CSS class for the container representing the "negativepnl" status
      dataName: 'negativepnl', // Data attribute name for the "negativepnl" status
      dataStatus: 'negativepnl', // Data attribute value for the "negativepnl" status
    },
  };

  // Loop through each status container to update its HTML based on the provided status
  statusContainers.forEach((container) => {
    // Check if the provided status has a corresponding option
    if (options.hasOwnProperty(status)) {
      // Extract relevant information from the options for the provided status
      const {
        container: statusContainer,
        dataName,
        dataStatus,
      } = options[status];
      // Update the HTML content of the status container with the provided status information
      container.innerHTML = `
        <div class="indicator-wrap me-3" data-status="${dataStatus}" data-name="${dataName}">
          <div class="status-indicator status-indicator_normal ${statusContainer}"></div>
        </div>
      `;
    } else {
      // Log an error message if the provided status is not defined in the options
      console.error(`Status '${status}' is not defined.`);
    }
  });
};

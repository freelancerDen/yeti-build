const getColorFromGradient = (percentage) => {
  // Array of threshold values
  const thresholds = [25, 50];
  // Array of colors for each gradient
  const colors = [
    [[234, 242, 245], [205, 223, 231]],
    [[231, 168, 133], [213, 52, 74]],
  ];

  let color;

  // Iterating through threshold values
  for (let i = 0; i < thresholds.length; i++) {
    // Checking if the current percentage is less than or equal to the current threshold value
    if (percentage <= thresholds[i]) {
      const startColor = colors[i][0];
      const endColor = colors[i][1];
      const ratio = i === 0 ? percentage / thresholds[i] : (percentage - thresholds[i - 1]) / (thresholds[i] - thresholds[i - 1]);
      // Interpolating colors based on percentage
      color = startColor.map((channel, index) => Math.round(channel + ratio * (endColor[index] - channel)));
      // Returning the interpolated color as an RGB string
      return `rgb(${color.join(",")})`;
    }
  }

  // Returning default color if percentage exceeds all thresholds
  return 'rgb(213, 52, 74)';
};

const setColorAndHeight = (percent = 0) => {
  // Selecting DOM elements
  const logoBackground = document.querySelector('.logo-svg__background');
  const logoPercentage = document.querySelector('#logoPercentage');

  // Checking for valid elements and input percentage value
  if (!logoBackground || !logoPercentage || typeof percent !== 'number' || percent < 0 || percent > 100) {
    return;
  }

  // Calculating height based on percentage
  const height = percent < 10 ? `calc(10% + 5px)` : `${percent}%`;
  // Getting color from gradient based on percentage
  const color = getColorFromGradient(percent);

  // Setting background color and height of logo
  logoBackground.style.backgroundColor = color;
  logoBackground.style.height = height;

  // Setting font size for logoPercentage if percentage is 100
  if (percent === 100) {
    logoPercentage.style.fontSize = '12px';
  } else {
    logoPercentage.style.fontSize = ''; // Reset font size if percentage is not 100
  }

  logoPercentage.textContent = percent;
};

// Example usage
setColorAndHeight(99);

// these are toggle switch variables (only for tablet and mobile)
let isLogsShown = false;
let isConfigOptionsShown = false;

const onClickLogsToggle = (overRideValue = isLogsShown) => {
  isLogsShown = overRideValue;
  if (isLogsShown) {
    // code for hiding logs panel
    isLogsShown = false;
    document.getElementById("logger-panel").style.display = "none";
  } else {
    // code for showing logs panel
    isLogsShown = true;
    document.getElementById("logger-panel").style.display = "block";
  }
};

const onClickOptionsToggle = (overRideValue = isConfigOptionsShown) => {
  isConfigOptionsShown = overRideValue;
  if (isConfigOptionsShown) {
    // code for hiding options panel
    isConfigOptionsShown = false;
    document.getElementById("visualizer-config-panel").style.display = "none";
  } else {
    // code for showing options panel
    isConfigOptionsShown = true;
    document.getElementById("visualizer-config-panel").style.display = "block";
  }
};

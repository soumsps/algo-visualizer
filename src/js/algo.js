/**
 * ALGORITHM IMPLEMENTATIONS
 */
const linearSearch = async (arr = arrayData, searchFor = searchedItem) => {
  console.log("<---- Linear Search Visualization Started ---->");
  // error handling
  // error checking for searched Item
  if (isNaN(searchedItem)) {
    errorDiv.style.display = "inline";
    errorDiv.innerHTML = "Searched Item is not a number.";
    return 0;
  }
};

const binarySearch = async () => {
  console.log("<---- Binary Search Visualization Started ---->");

  // error handling
  // error checking for searched Item
  if (isNaN(searchedItem)) {
    errorDiv.style.display = "inline";
    errorDiv.innerHTML = "Searched Item is not a number.";
    return 0;
  }
};

const selectionSort = async () => {
  console.log("<---- Selection Sort Visualization Started ---->");
};

const bubbleSort = async () => {
  console.log("<---- Bubble Sort Visualization Started ---->");
};

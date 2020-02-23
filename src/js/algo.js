/**
 * ALGORITHM IMPLEMENTATIONS
 */
const linearSearch = async (arr = arrayData, elmToFind = searchedItem) => {
  console.log("<---- Linear Search Visualization Started ---->");
  // -1 means item not found
  let foundAt = -1;
  // error checking for searched Item
  if (isNaN(searchedItem)) {
    errorDiv.style.display = "inline";
    errorDiv.innerHTML = "Searched Item is not a number.";
    return 0;
  }

  // Linear search logic
  for (let i = 0; i < arr.length; i++) {
    await linearSearchCurrentIndex(i);
    console.log("searching at index: ", i);
    if (arr[i] === elmToFind) {
      foundAt = i;
      break;
    }
  }

  // result display
  if (foundAt != -1) {
    console.log("Searched Item found at index:", foundAt);
  } else {
    console.log("Searched Item not found!");
  }
};

const linearSearchCurrentIndex = index => {
  return new Promise(async (resolve, reject) => {
    let indexDiv = document.getElementById(`index-${index}`).childNodes[1];
    indexDiv.style.background = "red";
    await sleep(1000);
    indexDiv.style.background = "#494949";
    resolve(true);
  });
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

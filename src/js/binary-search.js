/**
 * BINARY SEARCH ALGORITHM IMPLEMENTATION
 */
const binarySearch = async (arr = arrayData, elmToFind = searchedItem) => {
  console.log("<---- Binary Search Visualization Started ---->");
  // -1 means item not found
  let foundAt = -1;
  // error handling
  // error checking for searched Item
  if (isNaN(searchedItem)) {
    errorDiv.style.display = "inline";
    errorDiv.innerHTML = "Searched Item is not a number.";
    return 0;
  }

  setSearchResult("Searching...");
  logger("BINARY SEARCH STARTED", "yellow", 700);

  // Binary search logic

  let lowIndex = 0;
  await binarySearchIndexMarker(lowIndex, "green");
  let highIndex = arr.length - 1;
  await binarySearchIndexMarker(highIndex, "blue");
  let midIndex = -1;
  let iterationCount = 0;

  while (lowIndex <= highIndex) {
    midIndex = Math.floor((lowIndex + highIndex) / 2);
    logger(`Iteration ${iterationCount++}`);
    logger(`lowIndex ${lowIndex}`, "yellow");
    logger(`highIndex ${highIndex}`, "yellow");
    logger(`midIndex ${midIndex}`, "yellow");
    await binarySearchIndexMarker(midIndex, "orange");
    logger(`Searching ${elmToFind} at index ${midIndex}`);
    await binarySearchCurrentIndex(midIndex);
    if (arr[midIndex] == elmToFind) {
      foundAt = midIndex;
      break;
    } else if (arr[midIndex] < elmToFind) {
      await binarySearchIndexResetMarker(lowIndex);
      lowIndex = midIndex + 1;
      await binarySearchIndexMarker(lowIndex, "green");
    } else {
      await binarySearchIndexResetMarker(highIndex);
      highIndex = midIndex - 1;
      await binarySearchIndexMarker(highIndex, "blue");
    }

    await binarySearchIndexResetMarker(midIndex);
  }
  await binarySearchIndexResetMarker(lowIndex);
  await binarySearchIndexResetMarker(highIndex);

  // result display
  if (foundAt != -1) {
    console.log("Searched Item found at index:", foundAt);
    setSearchResult(`Found at index ${foundAt}`);
    logger(`Searched item found at index ${foundAt}`, "green");
  } else {
    console.log("Searched Item not found!");
    setSearchResult(`Not found`);
    logger(`Searched item not found`, "red");
  }
};

const binarySearchCurrentIndex = index => {
  return new Promise(async (resolve, reject) => {
    let indexDiv = document.getElementById(`index-${index}`).childNodes[1];
    indexDiv.style.background = "red";
    await sleep(1000);
    indexDiv.style.background = "#494949";
    resolve(true);
  });
};

const binarySearchIndexMarker = (index, color) => {
  return new Promise(async (resolve, reject) => {
    let indexDiv = document.getElementById(`index-${index}`).childNodes[1];
    indexDiv.style.background = color;
    await sleep(1000);
    resolve(true);
  });
};

const binarySearchIndexResetMarker = index => {
  return new Promise((resolve, reject) => {
    let indexDiv = document.getElementById(`index-${index}`).childNodes[1];
    indexDiv.style.background = "#494949";
    resolve(true);
  });
};

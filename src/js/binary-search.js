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
  await binarySearchIndexMarker(lowIndex, "low");
  let highIndex = arr.length - 1;
  await binarySearchIndexMarker(highIndex, "high");
  let midIndex = -1;
  let iterationCount = 0;

  while (lowIndex <= highIndex) {
    midIndex = Math.floor((lowIndex + highIndex) / 2);
    logger(`Iteration ${iterationCount++}`);
    logger(`lowIndex ${lowIndex}`, "yellow");
    logger(`midIndex ${midIndex}`, "yellow");
    logger(`highIndex ${highIndex}`, "yellow");

    await binarySearchIndexMarker(midIndex, "mid");
    logger(`Searching ${elmToFind} at index ${midIndex}`);
    await binarySearchCurrentIndex(midIndex);
    if (arr[midIndex] == elmToFind) {
      foundAt = midIndex;
      break;
    } else if (arr[midIndex] < elmToFind) {
      await binarySearchIndexResetMarker(lowIndex);
      lowIndex = midIndex + 1;
      await binarySearchIndexMarker(lowIndex, "low");
    } else {
      await binarySearchIndexResetMarker(highIndex);
      highIndex = midIndex - 1;
      await binarySearchIndexMarker(highIndex, "high");
    }

    await binarySearchIndexResetMarker(midIndex);
  }
  await binarySearchIndexResetMarker(lowIndex);
  await binarySearchIndexResetMarker(highIndex);

  // result display
  if (foundAt != -1) {
    console.log("Searched Item found at index:", foundAt);
    setSearchResult(`Found at index ${foundAt}`);
    binarySearchFoundAtIndex(foundAt);
    logger(`Searched item found at index ${foundAt}`, "greenyellow");
  } else {
    console.log("Searched Item not found!");
    setSearchResult(`Not found`);
    logger(`Searched item not found`, "red");
  }
};

const binarySearchCurrentIndex = index => {
  return new Promise(async (resolve, reject) => {
    let indexDiv = document.getElementById(`index-${index}`).childNodes[1];
    indexDiv.style.backgroundColor = colorData[algoSelected]["currIndexColor"]["bgColor"];
    indexDiv.style.borderColor = colorData[algoSelected]["currIndexColor"]["bgColor"];
    indexDiv.style.color = colorData[algoSelected]["currIndexColor"]["fontColor"];
    await sleep(1000);
    indexDiv.style.backgroundColor = colorData["defaultColor"]["index"]["bgColor"];
    indexDiv.style.borderColor = colorData["defaultColor"]["index"]["borderColor"];
    indexDiv.style.color = colorData["defaultColor"]["index"]["fontColor"];
    resolve(true);
  });
};

/**
 * possible value of indexType : low, mid, high
 */
const binarySearchIndexMarker = (index, indexType) => {
  return new Promise(async (resolve, reject) => {
    let indexDiv = document.getElementById(`index-${index}`).childNodes[0];
    if (indexType === "low") {
      indexDiv.style.backgroundColor =
        colorData[algoSelected]["lowIndexColor"]["bgColor"];
      indexDiv.style.color = colorData[algoSelected]["lowIndexColor"]["fontColor"];
    } else if (indexType === "mid") {
      indexDiv.style.backgroundColor =
        colorData[algoSelected]["midIndexColor"]["bgColor"];
      indexDiv.style.color = colorData[algoSelected]["midIndexColor"]["fontColor"];
    } else if (indexType === "high") {
      indexDiv.style.backgroundColor =
        colorData[algoSelected]["highIndexColor"]["bgColor"];
      indexDiv.style.color = colorData[algoSelected]["highIndexColor"]["fontColor"];
    }

    await sleep(1000);
    resolve(true);
  });
};

const binarySearchIndexResetMarker = index => {
  return new Promise((resolve, reject) => {
    let indexDiv = document.getElementById(`index-${index}`).childNodes[0];
    indexDiv.style.background = colorData["defaultColor"]["value"]["bgColor"];
    indexDiv.style.color = colorData["defaultColor"]["value"]["fontColor"];
    resolve(true);
  });
};

const binarySearchFoundAtIndex = ind => {
  return new Promise((resolve, reject) => {
    let indexDiv = document.getElementById(`index-${ind}`).childNodes[0];
    indexDiv.style.backgroundColor =
      colorData[algoSelected]["foundAtValueColor"]["bgColor"];
    //indexDiv.style.borderColor = colorData[algoSelected]["foundAtValueColor"]["bgColor"];
    resolve(true);
  });
};

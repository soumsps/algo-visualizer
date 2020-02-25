/**
 * LINEAR SEARCH ALGORITHM IMPLEMENTATION
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

  setSearchResult("Searching...");
  logger("LINEAR SEARCH STARTED", "yellow", 700);

  // Linear search logic
  for (let i = 0; i < arr.length; i++) {
    logger(`Searching ${elmToFind} at index ${i}`);
    await linearSearchCurrentIndex(i);
    if (arr[i] === elmToFind) {
      foundAt = i;
      break;
    }
  }

  // result display
  if (foundAt != -1) {
    setSearchResult(`Found at index ${foundAt}`);
    linearSearchFoundAtIndex(foundAt);
    logger(`Searched item found at index ${foundAt}`, "greenyellow");
  } else {
    setSearchResult(`Not found`);
    logger(`Searched item not found`, "red");
  }
};

const linearSearchCurrentIndex = index => {
  return new Promise(async (resolve, reject) => {
    let indexDiv = document.getElementById(`index-${index}`).childNodes[1];
    indexDiv.style.backgroundColor = colorData[algoSelected]["currIndexColor"]["bgColor"];
    indexDiv.style.borderColor = colorData[algoSelected]["currIndexColor"]["bgColor"];
    indexDiv.style.color = colorData[algoSelected]["currIndexColor"]["fontColor"];
    await sleep(500);
    indexDiv.style.backgroundColor = colorData["defaultColor"]["index"]["bgColor"];
    indexDiv.style.borderColor = colorData["defaultColor"]["index"]["borderColor"];
    indexDiv.style.color = colorData["defaultColor"]["index"]["fontColor"];
    resolve(true);
  });
};

const linearSearchFoundAtIndex = ind => {
  return new Promise((resolve, reject) => {
    let indexDiv = document.getElementById(`index-${ind}`).childNodes[0];
    indexDiv.style.backgroundColor =
      colorData[algoSelected]["foundAtValueColor"]["bgColor"];
    //indexDiv.style.borderColor = colorData[algoSelected]["foundAtValueColor"]["bgColor"];
    resolve(true);
  });
};

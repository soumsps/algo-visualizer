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
    console.log("searching at index: ", i);
    if (arr[i] === elmToFind) {
      foundAt = i;
      break;
    }
  }

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

const linearSearchCurrentIndex = index => {
  return new Promise(async (resolve, reject) => {
    let indexDiv = document.getElementById(`index-${index}`).childNodes[1];
    indexDiv.style.background = "red";
    await sleep(500);
    indexDiv.style.background = "#494949";
    resolve(true);
  });
};

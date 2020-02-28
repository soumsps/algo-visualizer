// default configuration
let algoSelected = "id_1";
let dataSetSize = "15";
const maxDataSetSize = 200;
let searchedItem = "7";
let visualizerRunning = false;
// used for speed control play pause toggle
let isPlayingAnimation = true;
let speedFactor = 1;
let arrayData = [];

let animationBoxDiv = document.getElementById("animation-box");
let errorDiv = document.getElementById("error-div");

// Algorithms IDs

const algoData = {
  id_1: { name: "Linear Search", isSorted: false, isSearchItemReq: true },
  id_2: { name: "Binary Search", isSorted: true, isSearchItemReq: true },
  id_3: { name: "Selection Sort", isSorted: false, isSearchItemReq: false },
  id_4: { name: "Bubble Sort", isSorted: false, isSearchItemReq: false }
};

const colorData = {
  defaultColor: {
    index: { bgColor: "#6c6969", borderColor: "#6c6969", fontColor: "#fff" },
    value: { bgColor: "none", borderColor: "#a8a8a8", fontColor: "#000" }
  },
  id_1: {
    name: "Linear Search",
    currIndexColor: { descTxt: "Current index", bgColor: "#f44336", fontColor: "#fff" },
    foundAtValueColor: { descTxt: "Found Item", bgColor: "#d6e260", fontColor: "#000" }
  },
  id_2: {
    name: "Binary Search",
    currIndexColor: { descTxt: "Current index", bgColor: "#f44336", fontColor: "#fff" },
    lowIndexColor: { descTxt: "Low index", bgColor: "#4caf50", fontColor: "#fff" },
    midIndexColor: { descTxt: "Middle index", bgColor: "#ffeb3b", fontColor: "#000" },
    highIndexColor: { descTxt: "High index", bgColor: "#03a9f4", fontColor: "#fff" },
    foundAtValueColor: { descTxt: "Found Item", bgColor: "#d6e260", fontColor: "#000" }
  }
};

window.onload = () => {
  loadDefaultConfig();
  setAVStatusDiv();
};

/**
 * Purpose of this function is to load default values and
 * to set default configuration, and generate random data array
 */
const loadDefaultConfig = async () => {
  console.log("loading default config");

  // All implemented algorithms as array form
  const keys = Object.keys(algoData);
  console.log("all algo IDs that have been implemented: ", keys);

  for (let i = 0; i < keys.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("id", keys[i]);
    option.setAttribute("value", keys[i]);
    option.innerHTML = algoData[keys[i]].name;
    document.getElementById("algo-selector").appendChild(option);
  }

  // setting default config on frontend side also
  document.getElementById(algoSelected).setAttribute("selected", true);
  document.getElementById("data-set-size").setAttribute("value", dataSetSize);
  document.getElementById("searched-item").setAttribute("value", searchedItem);

  document.getElementById("curr-speed").innerHTML = `Current speed: ${speedFactor}x`;

  // Initializing new random arrayData of size  equal to dataSetSize
  await randomArrayDataGen(dataSetSize);

  // generating new set of array elements on frontend
  await generateArrayElementsFrontend();
};

/**
 * To generate new random array
 */
const randomArrayDataGen = async (count, sort = algoData[algoSelected].isSorted) => {
  logger(`Generating data array of size ${dataSetSize}`, "#ff5722");
  // resettting old array
  arrayData.length = 0;

  for (let i = 0; i < count; i++) {
    // andom number between -100 to 400
    if (Math.random() > 0.5) {
      arrayData.push(Math.floor(Math.random() * 400));
    } else {
      arrayData.push(Math.floor(Math.random() * 100 * -1));
    }
  }
  // Check if we need to sort arrayData
  // Like in case of Binary search we need sorted array
  if (sort) {
    arrayData.sort((a, b) => a - b);
  }

  await sleep(500);
  logger(`Generated`, "greenyellow");
  await sleep(50);
  console.log("arrayData: ", arrayData);
};

/**
 * helper function to generate array items on frontend
 */
const generateArrayElementsFrontend = async () => {
  logger(`Populating array data on screen.`, "#ff5722");
  resetAnimationBox();

  for (let i = 0; i < arrayData.length; i++) {
    let itemGroup = document.createElement("div");
    let itemValue = document.createElement("div");
    let itemIndex = document.createElement("div");

    itemGroup.setAttribute("class", "item-group");
    itemGroup.setAttribute("id", `index-${i}`);

    itemValue.setAttribute("class", "item-value");
    itemValue.innerHTML = arrayData[i];

    itemIndex.setAttribute("class", "item-index");
    itemIndex.innerHTML = i;

    itemGroup.appendChild(itemValue);
    itemGroup.appendChild(itemIndex);
    animationBoxDiv.appendChild(itemGroup);

    if (i < 400) {
      await sleep(10);
    }
  }

  await sleep(500);
  logger(`Populated items on screen.`, "greenyellow");
  await sleep(200);
};

/**
 * This function is called when user changes currently selected algorithm
 */
const algoChange = async () => {
  if (visualizerRunning) {
    logger(`Visualizer busy, changes will not take effect.`, "#ff5722");
    return 0;
  }
  console.log("algo changed");
  algoSelected = document.getElementById("algo-selector").value;
  // logging changes
  logger(`${algoData[algoSelected].name} Algorithm selected`, "greenyellow");

  if (algoData[algoSelected].isSearchItemReq) {
    // enable search field
    document.getElementById("searched-item").disabled = false;
  } else {
    // disable search field
    document.getElementById("searched-item").disabled = true;
  }

  // Resetting all Error message on frontend
  resetErrorMsg();
  console.log("New Algo selected: ", algoSelected);
  setAVStatusDiv();
  await dataSetSizeChange();
};

const dataSetSizeChange = async () => {
  if (visualizerRunning) {
    logger(`Visualizer busy, Can't generate right now`, "#ff5722");
    return 0;
  }
  console.log("data set changed Clicked");
  dataSetSize = parseInt(document.getElementById("data-set-size").value);

  if (dataSetSize > maxDataSetSize) {
    logger(`Sorry that size was too big.<br>`, "red");
    dataSetSize = maxDataSetSize;
    document.getElementById("data-set-size").value = maxDataSetSize;
  }

  logger(`Data Set Size: ${dataSetSize}`, "greenyellow");
  // Resetting all Error message on frontend
  resetErrorMsg();

  // error checking
  // if  data set size entered is less than 0 then it will be error
  if (dataSetSize < 1 || isNaN(dataSetSize)) {
    errorDiv.style.display = "inline";
    errorDiv.innerHTML = "Data Set size is not appropriate";
    resetAnimationBox();
    return 0;
  }

  await randomArrayDataGen(dataSetSize);
  // generating new set of array elements on frontend
  await generateArrayElementsFrontend();
};

const setSearchedItem = () => {
  searchedItem = parseInt(document.getElementById("searched-item").value);
  console.log("searchedItem: ", searchedItem);
};

const visualizeNow = async () => {
  console.log("Visualize now clicked");
  if (visualizerRunning) {
    logger(`Visualizer busy, Please wait.`, "#ff5722");
    return 0;
  }
  // Resetting all Error message on frontend
  resetErrorMsg();
  // setting user searched item to our global variable
  setSearchedItem();
  setAVStatusDiv();
  await resetHighlightedDivs();

  if (screen.width <= 601) {
    console.log("screen width:", screen.width);
    onClickOptionsToggle(true);
  }

  visualizerRunning = true;

  if (algoSelected === "id_1") {
    await linearSearch();
  } else if (algoSelected === "id_2") {
    await binarySearch();
  } else if (algoSelected === "id_3") {
    await selectionSort();
  } else if (algoSelected === "id_4") {
    await bubbleSort();
  }

  visualizerRunning = false;
};

/**
 * This is used to reset any type type of ongoing animation
 * This kind of interfernce can happen if user suddenly change configuration
 */
const resetAnimationBox = () => {
  animationBoxDiv.innerHTML = "";
};

/**
 * This helper function will reset error msg thrown earlier on frontend
 */
const resetErrorMsg = () => {
  errorDiv.style.display = "none";
};

/**
 * helper function to reset current algo status on frontend
 */
const resetAVStatusDiv = () => {
  document.getElementById("av-status").innerHTML = "";
};

const setAVStatusDiv = () => {
  resetAVStatusDiv();
  // parent
  let avStatusDiv = document.getElementById("av-status");

  // child that will be appended
  let algoName = document.createElement("div");

  algoName.setAttribute("class", "avs-text");
  algoName.setAttribute("id", "avs-name");
  algoName.innerHTML = `Algorithm : ${algoData[algoSelected].name}`;
  avStatusDiv.appendChild(algoName);
  if (algoData[algoSelected].isSearchItemReq) {
    let searchedFor = document.createElement("div");
    let searchRes = document.createElement("div");

    searchedFor.setAttribute("class", "avs-text");
    searchedFor.setAttribute("id", "avs-searched-item");
    searchedFor.innerHTML = `Search for : ${searchedItem}`;
    avStatusDiv.appendChild(searchedFor);

    searchRes.setAttribute("class", "avs-text");
    searchRes.setAttribute("id", "avs-search-result");
    searchRes.innerHTML = "Search Result: Not executed";
    avStatusDiv.appendChild(searchRes);
  }
};

const setSearchResult = msg => {
  let searchRes = document.getElementById("avs-search-result");
  searchRes.innerHTML = `Search Result: ${msg}`;
};

/**
 * Helper function to enable logging on frontend
 */
const logger = (msg, color = "white", fontWeight = 500) => {
  // parent-log node
  let logContentDiv = document.getElementById("lp-el-content");

  // child that will be appended
  let logMsg = document.createElement("span");

  logMsg.setAttribute("class", "lp-el-text");
  logMsg.style.color = color;
  logMsg.style.fontWeight = fontWeight;
  logMsg.innerHTML = msg;
  logContentDiv.appendChild(logMsg);

  // autoscroll
  logContentDiv.scrollTo(0, logContentDiv.scrollHeight);
};

/**
 * Helper function to delete all logs generated by user
 */
const clearLogs = () => {
  let logContentDiv = document.getElementById("lp-el-content");
  logContentDiv.innerHTML = "";
};

/**
 * helper function to reset log content area
 */
const resetLoggerContent = () => {
  document.getElementById("lp-el-content").innerHTML = "";
};

/**
 *  sleep function implementation
 * default value = 200ms
 */
const sleep = async (time = 200) => {
  if (!isPlayingAnimation) {
    logger("Visualizer Paused", "red");
    await playPauseSleep();
    logger("Visualizer Resumed", "greenyellow");
  }
  return new Promise(resolve => setTimeout(() => resolve(true), time / speedFactor));
};

const playPauseSleep = () => {
  return new Promise(resolve =>
    setInterval(() => {
      if (isPlayingAnimation) {
        resolve(true);
      }
    }, 500)
  );
};

/**
 * Helper function to reset any color set by any algorithm
 * that executed previously
 */
const resetHighlightedDivs = (arr = arrayData) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      let valueDiv = document.getElementById(`index-${i}`).childNodes[0];
      valueDiv.style.background = colorData["defaultColor"]["value"]["bgColor"];
      valueDiv.style.borderColor = colorData["defaultColor"]["value"]["borderColor"];
      valueDiv.style.color = colorData["defaultColor"]["value"]["fontColor"];

      let indexDiv = document.getElementById(`index-${i}`).childNodes[1];
      indexDiv.style.background = colorData["defaultColor"]["index"]["bgColor"];
      indexDiv.style.borderColor = colorData["defaultColor"]["index"]["borderColor"];
      indexDiv.style.color = colorData["defaultColor"]["index"]["fontColor"];
    }

    resolve(true);
  });
};

/**
 * animation speed increment controller function
 */
const incSpeed = (max = 10) => {
  if (speedFactor < max) {
    speedFactor++;
    logger(`Animation speed increased`, "greenyellow");
  } else {
    logger(`Animation speed can't be increased`, "red");
  }

  document.getElementById("curr-speed").innerHTML = `Current speed: ${speedFactor}x`;
};

/**
 * animation speed decrement controller function
 */
const decSpeed = (min = 1) => {
  if (speedFactor > min) {
    speedFactor--;
    logger(`Animation speed decreased`, "greenyellow");
  } else {
    logger(`Animation speed can't be decreased`, "red");
  }

  document.getElementById("curr-speed").innerHTML = `Current speed: ${speedFactor}x`;
};

/**
 * play pause toggler function
 */
const animationPlayPauseToggle = () => {
  // visualizer not running so no need to play/pause functionality
  //so no change will occur
  if (!visualizerRunning) {
    return 0;
  }

  if (isPlayingAnimation) {
    //animation is already playing
    // code for pausing it
    isPlayingAnimation = false;
    document.getElementById("spd-play-pause").innerHTML = `<i class="fa fa-play"></i>`;
  } else {
    // code for playing animation again
    isPlayingAnimation = true;
    document.getElementById("spd-play-pause").innerHTML = `<i class="fa fa-pause"></i>`;
  }
};

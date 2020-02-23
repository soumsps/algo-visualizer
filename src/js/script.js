// default configuration
let algoSelected = "id_1";
let dataSetSize = "15";
let searchedItem = "7";
let visualizerRunning = false;
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

window.onload = () => {
  loadDefaultConfig();
  setAVStatusDiv();
};

/**
 * Purpose of this function is to load default values and
 * to set default configuration, and generate random data array
 */
const loadDefaultConfig = () => {
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
  randomArrayDataGen(dataSetSize);
};

/**
 * To generate new random array
 */
const randomArrayDataGen = async (count, sort = algoData[algoSelected].isSorted) => {
  // resettting old array
  arrayData.length = 0;
  resetAnimationBox();

  for (let i = 0; i < count; i++) {
    // andom number between -100 to 100
    if (Math.random() > 0.5) {
      arrayData.push(Math.floor(Math.random() * 100));
    } else {
      arrayData.push(Math.floor(Math.random() * 100 * -1));
    }
  }
  // Check if we need to sort arrayData
  // Like in case of Binary search we need sorted array
  if (sort) {
    arrayData.sort((a, b) => a - b);
  }

  console.log("arrayData: ", arrayData);

  // generating new set of array elements on frontend
  generateArrayElementsFrontend();
};

const generateArrayElementsFrontend = () => {
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
  }
};

/**
 * This function is called when user changes currently selected algorithm
 */
const algoChange = () => {
  console.log("algo changed");

  algoSelected = document.getElementById("algo-selector").value;

  // logging changes
  logger(`${algoData[algoSelected].name} Algorithm selected`, "greenyellow");

  if (visualizerRunning) {
    return 0;
  }
  // Resetting all Error message on frontend
  resetErrorMsg();

  randomArrayDataGen(dataSetSize);
  console.log("New Algo selected: ", algoSelected);

  setAVStatusDiv();
};

const dataSetSizeChange = () => {
  console.log("data set changed Clicked");

  dataSetSize = parseInt(document.getElementById("data-set-size").value);

  // logging changes
  logger(`Data Set Size: ${dataSetSize}`, "greenyellow");

  if (visualizerRunning) {
    return 0;
  }

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

  randomArrayDataGen(dataSetSize);
};

const setSearchedItem = () => {
  searchedItem = parseInt(document.getElementById("searched-item").value);
  console.log("searchedItem: ", searchedItem);
};

const visualizeNow = async () => {
  console.log("Visualize now clicked");
  if (visualizerRunning) {
    logger(`System Busy, Please wait.`, "#ff5722");
    return 0;
  }

  if (dataSetSize != arrayData.length) {
    // means there is some problem
    // so  just creating new array
    randomArrayDataGen(dataSetSize);
  }

  // Resetting all Error message on frontend
  resetErrorMsg();

  // setting user searched item to our global variable
  setSearchedItem();

  setAVStatusDiv();

  visualizerRunning = true;

  if (algoSelected === "id_1") {
    await linearSearch();
  }

  if (algoSelected === "id_2") {
    await binarySearch();
  }

  if (algoSelected === "id_3") {
    await selectionSort();
  }

  if (algoSelected === "id_4") {
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
 * helper function to reset log content area
 */
const resetLoggerContent = () => {
  document.getElementById("lp-el-content").innerHTML = "";
};

/**
 *  sleep function implementation
 * default value = 200ms
 */
const sleep = (time = 200) => {
  return new Promise(resolve => setTimeout(() => resolve(true), time / speedFactor));
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

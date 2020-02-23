// default configuration
let algoSelected = "id_1";
let dataSetSize = "15";
let searchedItem = "";
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
  // Resetting all Error message on frontend
  resetErrorMsg();
  algoSelected = document.getElementById("algo-selector").value;

  randomArrayDataGen(dataSetSize);
  console.log("New Algo selected: ", algoSelected);
};

const dataSetSizeChange = () => {
  console.log("data set changed Clicked");
  // Resetting all Error message on frontend
  resetErrorMsg();

  dataSetSize = parseInt(document.getElementById("data-set-size").value);

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
  // Resetting all Error message on frontend
  resetErrorMsg();

  resetAVStatusDiv();

  // setting user searched item to our global variable
  setSearchedItem();

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
  // parent
  let avStatusDiv = document.getElementById("av-status");

  // child that will be appended
  let algoName = document.createElement("div");

  algoName.setAttribute("class", "avs-text");
  algoName.setAttribute("id", "avs-name");
  algoName.innerHTML = `Algorithm : ${algoData[algoSelected].name}`;
  avStatusDiv.appendChild(algoName);

  let searchedItem = document.createElement("div");
  let searchResult = document.createElement("div");
};

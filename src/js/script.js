// default configuration
let algoSelected = "id_1";
let dataSetSize = 15;
let searchedItem = 6;
let arrayData = [];
let animationBoxDiv = document.getElementById("animation-box");

// Algorithms IDs

const algoData = {
  id_1: { name: "Linear Search", isSorted: false },
  id_2: { name: "Binary Search", isSorted: true },
  id_3: { name: "Selection Sort", isSorted: false },
  id_4: { name: "Bubble Sort", isSorted: false }
};

window.onload = () => {
  loadDefaultConfig();
};

/**
 * Purpose of this function is to load default values and
 * to set default configuration, and generate random data array
 */
const loadDefaultConfig = () => {
  console.log("loading default config");

  // All implemented algorithms
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
const randomArrayDataGen = (count, sort = algoData[algoSelected].isSorted) => {
  // resettting old array
  arrayData.length = 0;
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
  resetAnimationBox();
  // generating new set of array elements on frontend
  generateArrayElementsFrontend();
};

const generateArrayElementsFrontend = () => {
  for (let i = 0; i < arrayData.length; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "elements");
    div.setAttribute("id", `index-${i}`);
    div.innerHTML = arrayData[i];
    animationBoxDiv.appendChild(div);
  }
};

/**
 * This function is called when user changes currently selected algorithm
 */
const algoChange = () => {
  console.log("algo changed");
  let newAlgoSelected = document.getElementById("algo-selector").value;

  if (newAlgoSelected != algoSelected) {
    algoSelected = newAlgoSelected;
    randomArrayDataGen(dataSetSize);
    console.log("New Algo selected: ", algoSelected);
  } else {
    console.log("No change in algo selection: ", algoSelected);
  }
};

const dataSetSizeChange = () => {
  console.log("data set changed Clicked");
  let newDataSetSize = parseInt(document.getElementById("data-set-size").value);

  // error checking
  // if  data set size entered is less than 0 then it will be error
  if (newDataSetSize > 0 && newDataSetSize != dataSetSize) {
    dataSetSize = newDataSetSize;
    console.log("New changed data set size: ", dataSetSize);
    randomArrayDataGen(dataSetSize);
  } else {
    console.log("Data set size not changed");
  }
};

const visualizeNow = () => {
  console.log("Visualize now clicked");
};

const setSearchedItem = () => {
  searchedItem = document.getElementById("searched-item").value;
};

// this is used to reset any type type of ongoing animation
// this kind of interfernce can happen if user suddenly change configuration
const resetAnimationBox = () => {
  animationBoxDiv.innerHTML = "";
};

/**
 * BUBBLE SORT ALGORITHM IMPLEMENTATION
 */

const bubbleSort = async (arr = arrayData) => {
  console.log("<---- Bubble Sort Visualization Started ---->");

  // bubble sort logic here
  logger("BUBBLE SORT STARTED", "yellow", 700);

  for (let i = 0; i < arr.length; i++) {
    logger(`Iteration ${i}`, "red");
    for (let j = 0; j < arr.length - 1; j++) {
      logger(`Comparing values at index ${j} and ${j + 1}`);
      await bubbleSortCurrentIndex(j, j + 1);
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        logger(`Swapping values ${arr[j]} and ${arr[j + 1]}`);
        await bubbleSortItemSwapper(j, j + 1);
      }
    }
  }

  logger(`Bubble sort completed its execution`, "greenyellow", 700);
};

const bubbleSortCurrentIndex = (a, b) => {
  return new Promise(async (resolve, reject) => {
    let indexDiv1 = document.getElementById(`index-${a}`).childNodes[1];
    let indexDiv2 = document.getElementById(`index-${b}`).childNodes[1];
    indexDiv1.style.background = "red";
    indexDiv2.style.background = "red";
    await sleep(500);
    indexDiv1.style.background = "#494949";
    indexDiv2.style.background = "#494949";
    resolve(true);
  });
};

const bubbleSortItemSwapper = (i, j) => {
  return new Promise(async (resolve, reject) => {
    let item1 = document.getElementById(`index-${i}`).childNodes[0];
    let item2 = document.getElementById(`index-${j}`).childNodes[0];

    item1.style.background = "#ff9800";
    item2.style.background = "#ff9800";
    await sleep(1000);
    // swapping values
    let temp = item2.innerHTML;
    item2.innerHTML = item1.innerHTML;
    item1.innerHTML = temp;

    item1.style.background = "#cddc39";
    item2.style.background = "#cddc39";
    await sleep(300);
    item1.style.background = "none";
    item2.style.background = "none";

    //await sleep(200);
    resolve(true);
  });
};

/**
 * SELECTION SORT ALGORITHM IMPLEMENTATION
 */

const selectionSort = async (arr = arrayData) => {
  console.log("<---- Selection Sort Visualization Started ---->");

  logger("SELECTION SORT STARTED", "yellow", 700);
  // selection sort logic

  for (let i = 0; i < arr.length; i++) {
    let min = i;
    await selectionSortMinIndexMarker(min);
    logger(`Assuming minimum at index ${min}`);

    for (let j = i + 1; j < arr.length; j++) {
      await selectionSortCurrentIndex(j);
      if (arr[min] > arr[j]) {
        await selectionSortMinIndexResetMarker(min);
        min = j;
        await selectionSortMinIndexMarker(min);
        logger(`Found new minimum at index ${min}`);
      }
    }
    if (min !== i) {
      let tmp = arr[i];
      arr[i] = arr[min];
      arr[min] = tmp;
      logger(`Swapping ${arr[min]} and ${arr[i]}`);
      await selectionSortItemSwapper(i, min);
    } else {
      // just doing to animate behaviour in frontend
      logger(`No need to swap, index ${i} is having minimum value already`);
      await selectionSortItemSwapper(i, i);
    }

    await selectionSortMinIndexResetMarker(min);
  }
  logger(`Selection sort completed`, "greenyellow", 700);
};

const selectionSortCurrentIndex = index => {
  return new Promise(async (resolve, reject) => {
    let indexDiv = document.getElementById(`index-${index}`).childNodes[1];
    indexDiv.style.background = "red";
    await sleep(200);
    indexDiv.style.background = "#494949";
    resolve(true);
  });
};

const selectionSortMinIndexMarker = index => {
  return new Promise(async (resolve, reject) => {
    let indexDiv = document.getElementById(`index-${index}`).childNodes[1];
    indexDiv.style.background = "green";
    await sleep(200);
    resolve(true);
  });
};

const selectionSortMinIndexResetMarker = index => {
  return new Promise((resolve, reject) => {
    let indexDiv = document.getElementById(`index-${index}`).childNodes[1];
    indexDiv.style.background = "#494949";
    resolve(true);
  });
};

const selectionSortItemSwapper = (i, min) => {
  return new Promise(async (resolve, reject) => {
    let item1 = document.getElementById(`index-${i}`).childNodes[0];
    let item2 = document.getElementById(`index-${min}`).childNodes[0];

    if (i != min) {
      item1.style.background = "#ff9800";
      item2.style.background = "#ff9800";
      await sleep(1300);
      item2.style.background = "none";
    }

    let temp = item2.innerHTML;
    item2.innerHTML = item1.innerHTML;
    item1.innerHTML = temp;

    item1.style.background = "#cddc39";

    await sleep(200);
    resolve(true);
  });
};

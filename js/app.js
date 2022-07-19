/* 
======================================== MESSAGE FROM DEV =======================================

Hello stranger! This is a message from Koladele Olaitan (publikphigor).

It took me days to make this code work. I could easily just see a tutorial about it on the internet but I've been learning the core of JavaScript (from Jonas Schmedtmann) and I want to flex my muscles. This might be a small app to make but I must confess it was a challenge. (Actually more of a maths challenge than JavaScript).

At the time of this commenting (July 19, 2022 - 04:00AM WAT), the maths is not mathing and I'm a bit frustrated. If you happen to use this tool when everything works, then you should also learn to never give up (because I almost did).

Feel free to fork the repo, copy the code and do whatever you want with it. I'll be so proud if someone finds my code worthy of copying. lol


If you read until this point, I love you!

======================================== END OF MESSAGE =======================================
*/

// Aspect ratios, hr and wr stands for height ratio (16/9) and width ratio (9/16) respectively

const ratio1 = {
  name: "4K Ultra HD",
  hr: 1.777,
  wr: 0.563,
};

const ratio2 = {
  name: "Full HD",
  hr: 1.777,
  wr: 0.563,
};

const ratio3 = {
  name: "HD Ready",
  hr: 1.777,
  wr: 0.563,
};

const ratio4 = {
  name: "WUXGA",
  hr: 1.6,
  wr: 0.625,
};

const ratio5 = {
  name: "UWQHD",
  hr: 2.388,
  wr: 0.419,
};

const ratio6 = {
  name: "Anamorphic",
  hr: 2.39,
  wr: 0.418,
};

const ratio7 = {
  name: "NTSC/PAL",
  hr: 1.333,
  wr: 0.75,
};

const ratios = [ratio1, ratio2, ratio3, ratio4, ratio5, ratio6, ratio7];

// select all aspect ratio buttons
const asBtn = document.querySelectorAll(".as-btn");

// store number of selected aspect ratio
let selAspectRatio;
let wr = 1.777;
let hr = 0.563;

// change color of button when clicked
function selARBtn(e) {
  asBtn.forEach((btn) => {
    btn.classList.remove("active");
  });

  e.target.classList.add("active");
  selAspectRatio = e.path[0].attributes[1].nodeValue - 1;
  wr = ratios[selAspectRatio].wr;
  hr = ratios[selAspectRatio].hr;
}

asBtn.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    selARBtn(e);
    selInputVal();

    calcDimensions(wCm, hCm, dCm, wIn, hIn, dIn, wr, hr);

    // call display-values function
    displayValues();
  })
);

// select all input fields and calculate-button
const calcBtn = document.querySelector(".calc-btn");
let [dCm, dIn, wCm, wIn, hCm, hIn] = "";
function selInputVal() {
  dCm = Number(document.querySelector("#diagonal-cm").value);
  dIn = Number(document.querySelector("#diagonal-inches").value);
  wCm = Number(document.querySelector("#width-cm").value);
  wIn = Number(document.querySelector("#width-inches").value);
  hCm = Number(document.querySelector("#height-cm").value);
  hIn = Number(document.querySelector("#height-inches").value);
}

// get other dimensions from the supplied dimensions
let widthCm;
let widthInch;
let heightCm;
let heightInch;
let diagonalCm;
let diagonalInch;
let arrCmValues = [];
let arrInchValues = [];

function calcDimensions(wCm, hCm, dCm, wIn, hIn, dIn, wr, hr) {
  // if height is passed in cm/inch, calculate width and diagonal in cm/inch
  if (hCm) {
    dCm = Math.sqrt((hCm * wr) ** 2 + hCm ** 2);
    widthCm = Number(Math.sqrt(dCm ** 2 - hCm ** 2).toFixed(1));
    diagonalCm = Number(dCm.toFixed(1));
    heightCm = Number(hCm.toFixed(1));
  }

  if (hIn) {
    dIn = Math.sqrt((hIn * wr) ** 2 + hIn ** 2);
    widthInch = Number(Math.sqrt(dIn ** 2 - hIn ** 2).toFixed(1));
    diagonalInch = Number(dIn.toFixed(1));
    heightInch = Number(hIn.toFixed(1));
  }

  // if width is passed in cm/inch, calculate height and diagonal in cm/inch
  if (wCm) {
    dCm = Math.sqrt((wCm * wr) ** 2 + wCm ** 2);
    heightCm = Number(Math.sqrt(dCm ** 2 - wCm ** 2).toFixed(1));
    diagonalCm = Number(dCm.toFixed(1));
    widthCm = Number(wCm.toFixed(1));
  }

  if (wIn) {
    dIn = Math.sqrt((wIn * wr) ** 2 + wIn ** 2);
    heightIn = Number(Math.sqrt(dIn ** 2 - wIn ** 2).toFixed(1));
    diagonalInch = Number(dIn.toFixed(1));
  }

  // if diagonal is passed in cm/inch, calculate height and width in cm/inch
  if (dCm) {
    hCm = dCm / Math.sqrt(wr ** 2 + 1);
    wCm = Math.sqrt(dCm ** 2 - hCm ** 2);
    heightCm = Number(hCm.toFixed(1));
    widthCm = Number(wCm.toFixed(1));
    diagonalCm = Number(dCm.toFixed(1));
  }

  if (dIn) {
    hIn = dIn / Math.sqrt(wr ** 2 + 1);
    wIn = Math.sqrt(dIn ** 2 - hIn ** 2);
    heightInch = Number(hIn.toFixed(1));
    widthInch = Number(wIn.toFixed(1));
    diagonalInch = Number(dIn.toFixed(1));
  }

  // add all values to their respective arrays
  arrCmValues.splice(0, 0, diagonalCm, widthCm, heightCm);
  arrInchValues.splice(0, 0, diagonalInch, widthInch, heightInch);

  // call conversion depending on the unit supplied
  if (wCm || hCm || dCm) {
    convertToInch(arrCmValues);
  }

  if (wIn || hIn || dIn) {
    convertToCm(arrInchValues);
  }
}

// cm to inches and vice versa
function convertToInch(arr) {
  const newInchesValues = arr.map((cm) => {
    return Number(cm / (2.54).toFixed(1));
  });
  [diagonalInch, widthInch, heightInch] = [...newInchesValues];
}

function convertToCm(arr) {
  const newCmValues = arr.map((inch) => {
    return Number(inch * (0.394).toFixed(1));
  });
  [diagonalCm, widthCm, heightCm] = [...newCmValues];
}

// display-values function
function displayValues() {
  dCm = document.querySelector("#diagonal-cm").value = diagonalCm;
  dIn = document.querySelector("#diagonal-inches").value = diagonalInch;
  wCm = document.querySelector("#width-cm").value = widthCm;
  wIn = document.querySelector("#width-inches").value = widthInch;
  hCm = document.querySelector("#height-cm").value = heightCm;
  hIn = document.querySelector("#height-inches").value = heightInch;
}

// call calculate function on button click
calcBtn.addEventListener("click", function () {
  selInputVal();

  calcDimensions(wCm, hCm, dCm, wIn, hIn, dIn, wr, hr);

  // call display-values function
  displayValues();
});

/*

btnLinks = document.querySelectorAll(".brz-a.brz-container-link");
btnLinks.forEach((link) => {
  if (
    link.href.trim() === "https://626nightmarket.cococart.co" ||
    link.href.trim() === "https://626nightmarket.cococart.co/"
  ) {
    link.closest("brz-row__container.brz-css-hluqc").classList.add("d-none");
  } else {
    link.closest("brz-row__container.brz-css-hluqc").classList.remove("d-none");
  }
});


*/

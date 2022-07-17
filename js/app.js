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

// change color of button when clicked
function changeBtnColor(e) {
  asBtn.forEach((btn) => {
    btn.classList.remove("active");
  });

  e.target.classList.add("active");
  selAspectRatio = e.path[0].attributes[1].nodeValue - 1;
}

asBtn.forEach((btn) => btn.addEventListener("click", changeBtnColor));

// get other dimensions from the supplied dimensions
const width = function calcWidth(h, hr) {
  if (h) {
    d = Math.sqrt((h * hr) ** 2 + h ** 2);
    return Math.sqrt(d ** 2 - h ** 2);
  }
};

const height = function calcHeight(w, wr) {
  if (w) {
    d = Math.sqrt((w * wr) ** 2 + w ** 2);
    return Math.sqrt(d ** 2 - w ** 2);
  }
};

const diagonal = function calcDiagonal(w, h, wr, hr) {
  if (h && hr) {
    return Math.sqrt((h * hr) ** 2 + h ** 2);
  } else if (w && wr) {
    return Math.sqrt((w * wr) ** 2 + w ** 2);
  } else console.log(`works`);
};

function calcDimensions(w, h, d) {}

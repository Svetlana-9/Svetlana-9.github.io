const inputValue = document.getElementById("value");

inputValue.onchange = function () {
  const inputValue = document.getElementById("value");
  const degree = (360 / 100) * inputValue.value;
  const layer1 = document.querySelector(".layer1");
  const layer2 = document.querySelector(".layer2");

  if (degree < 180) {
    layer1.style.backgroundColor = "rgb(235, 230, 230)";
    layer1.style.zIndex = "0";
    layer2.style.zIndex = "1";
    layer2.style.transform = "rotate(" + degree + "deg)";
  } else if (degree >= 180 && degree <= 360) {
    layer1.style.backgroundColor = "rgb(28, 80, 236)";
    layer1.style.zIndex = "0";
    layer2.style.zIndex = "3";
    layer2.style.transform = "rotate(" + degree + "deg)";
  } else {
    layer1.style.backgroundColor = "rgb(28, 80, 236)";
    layer1.style.zIndex = "4";
  }
};

const checkHide = document.getElementById("switchHide");

checkHide.onchange = function () {
  const checkHide = document.getElementById("switchHide");
  const progress = document.querySelector(".progress");

  if (checkHide.checked === true) {
    progress.style.visibility = "hidden";
  } else {
    progress.style.visibility = "visible";
  }
};

const getValue = () => {
  return document.getElementById("value").value;
};

const setValue = (value) => {
  document.getElementById("value").value = value;
  document.getElementById("value").dispatchEvent(new Event("change"));
};

const changeAnimate = () => {
  document.getElementById("switchAnimate").click();
};

const changeHide = () => {
  document.getElementById("switchHide").click();
};


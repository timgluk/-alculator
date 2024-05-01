"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelector(".buttons-wrap");
  const buttonsNumbers = [...document.querySelectorAll("[data-number]")];
  const buttonsMethods = [...document.querySelectorAll("[data-method]")];
  const display = document.querySelector(".display");
  display.value = 0;

  let numberA = "";
  let numberB = "";
  let sign = "";

  function clean() {
    display.value = 0;
    numberA = "";
    numberB = "";
  }

  function backspace() {
    numberA = numberA.slice(0, -1);
  }

  function toggle() {
    if (display.value === "0") return;
    if (numberA[0] === "-") {
      numberA = numberA.slice(1);
    } else {
      numberA = "-" + numberA;
    }
  }

  buttons.addEventListener("click", function (event) {
    const et = event.target;
    const keyNumber = et.dataset.number; 
    const keyMethod = et.dataset.method;
    if (et.tagName != "BUTTON") return;
    if (keyNumber) {
      if (keyNumber === "dot" && numberA.includes(".")) return;
      numberA += String(et.innerText);
      display.value = numberA === "" ? 0 : numberA;
      // console.log(keyNumber)
    } else if (keyMethod) {
      numberB = String(et.innerText);
      if (
        keyMethod === "divide" ||
        keyMethod === "multiply" ||
        keyMethod === "subtract" ||
        keyMethod === "add"
      ) {
        display.value = numberB;
      }
    }

    switch (keyMethod) {
      case "clean":
        console.log("clean");
        clean();
        break;
      case "backspace":
        console.log("backspace");
        backspace();
        display.value = numberA === "" ? 0 : numberA;
        break;
      case "toggle":
        console.log("toggle");
        toggle();
        display.value = numberA === "" ? 0 : numberA;
        break;
    }

    // display.value = numberA === "" ? 0 : numberA;

    console.log(numberA, numberB);
    // console.log(event.target.tag)
  });
});

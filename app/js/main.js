"use strict";

const buttons = document.querySelector(".buttons");
const buttonsNumbers = [...document.querySelectorAll("[data-number]")];
const buttonsMethods = [...document.querySelectorAll("[data-method]")];
const display = document.querySelector(".display");

display.value = 0; // вывод на экран

let numberA = "";
let numberB = "";
let sign = ""; // символ
let equals = false; // нажата ли равно

function clean() {
  display.value = "0";
  numberA = "";
  numberB = "";
  sign = "";
  equals = false;
}

buttons.addEventListener("click", function (event) {
  const et = event.target;
  const keyNumber = et.dataset.number; // нажата цифра или точка "."
  const keyMethod = et.dataset.method; // нажата кнопка с действием

  if (et.tagName != "BUTTON") return; // проверка на нажатие кнопки

  /* не более одной точки */
  if (keyNumber === "dot" && display.value.includes(".")) return;

  if (keyNumber) {
    if (numberB === "" && sign === "") {
      numberA += String(et.innerText);
      display.value = numberA === "" ? "0" : numberA;
    } else if (numberA !== "" && numberB !== "" && equals) {
      numberB = String(et.innerText);
      equals = false;
      display.value = numberB === "" ? "0" : numberB;
    } else {
      numberB += String(et.innerText);
      display.value = numberB === "" ? "0" : numberB;
    }
  }

  if (keyMethod === "subtract" || keyMethod === "add") {
    sign = String(et.innerText);
    display.value = sign;
  } else if (keyMethod === "divide") {
    sign = "/";
    display.value = String(et.innerText);
  } else if (keyMethod === "multiply") {
    sign = "*";
    display.value = String(et.innerText);
  }

  if (keyMethod === "equals") {
    equals = true;
    switch (sign) {
      case "/":
        numberA = +numberA / +numberB;
        break;
      case "*":
        numberA = +numberA * +numberB;
        break;
      case "+":
        numberA = +numberA + +numberB;
        break;
      case "-":
        numberA = +numberA - +numberB;
        break;
    }
    display.value = numberA;
  }

  switch (keyMethod) {
    case "clean":
      clean();
      break;
    case "backspace":
      if (display.value === numberA && numberB === "") {
        numberA = display.value.slice(0, -1);
        if (numberA === "-") numberA = "";
        display.value = numberA === "" ? 0 : numberA;
      }
      if (display.value === numberB) {
        numberB = display.value.slice(0, -1);
        if (numberB === "-") numberB = "";
        display.value = numberB === "" ? 0 : numberB;
      }
      break;
    case "toggle":
      if (display.value === "0") break;
      if (display.value === sign) break;

      if (
        display.value === numberA &&
        numberB === "" &&
        display.value[0] === "-"
      ) {
        numberA = display.value.slice(1);
        display.value = numberA === "" ? 0 : numberA;
        break;
      } else if (
        display.value === numberA &&
        numberB === "" &&
        display.value[0] !== "-"
      ) {
        numberA = "-" + display.value;
        display.value = numberA === "" ? 0 : numberA;
        break;
      } else if (display.value === numberB && display.value[0] === "-") {
        numberB = display.value.slice(1);
        display.value = numberB === "" ? 0 : numberB;
        break;
      } else {
        numberB = "-" + display.value;
        display.value = numberB === "" ? 0 : numberB;
        break;
      }
    case "percent":
      if (numberA !== "" && numberB === "" && sign === "") {
        display.value = +numberA / 100;
        numberA = display.value;
      } else if (numberA !== "" && numberB !== "" && sign !== "") {
        display.value = +numberA * (+numberB / 100);
        numberB = display.value;
      }
      break;
  }
});

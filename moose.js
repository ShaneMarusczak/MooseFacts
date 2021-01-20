"use strict";
(() => {
  let currentCardIndex = 0;
  const [flipCard] = document.getElementsByClassName("flip-card");
  const [innerFlipCard] = document.getElementsByClassName("flip-card-inner");

  const order = [];

  const randomIntFromInterval = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  function setCardData() {
    [document.getElementById("term").innerText] = window.studyData()[
      order[currentCardIndex]
    ];
    [, document.getElementById("definition").src] = window.studyData()[
      order[currentCardIndex]
    ];
  }

  function generateOrder() {
    if (order.length != window.studyData().length) {
      let nextNumber = randomIntFromInterval(0, window.studyData().length - 1);
      while (order.includes(nextNumber)) {
        nextNumber = randomIntFromInterval(0, window.studyData().length - 1);
      }
      order.push(nextNumber);
      generateOrder();
    }
  }

  function nextCard() {
    if (currentCardIndex < window.studyData().length - 1) {
      currentCardIndex++;
      setCardData();
    }
  }

  function previousCard() {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      setCardData();
    }
  }

  (() => {
    flipCard.addEventListener("click", () => {
      if (innerFlipCard.classList.contains("flip-card-flip")) {
        innerFlipCard.classList.remove("flip-card-flip");
      } else {
        innerFlipCard.classList.add("flip-card-flip");
      }
    });
    generateOrder();
    setCardData();
    document.getElementById("forwardCat").addEventListener("click", nextCard);
    document.getElementById("backCat").addEventListener("click", previousCard);
  })();
})();

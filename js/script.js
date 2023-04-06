const rusWord = document.querySelector("#rus"),
  engWord = document.querySelector("#eng"),
  saveWord = document.querySelector("#saveWord"),
  listWords = document.querySelector("#listWords"),
  inputs = document.querySelectorAll(".field__input"),
  warning = document.querySelector('.words__warning');

let words, btnDelete;
localStorage.length < 1
  ? (words = [])
  : (words = JSON.parse(localStorage.getItem("words")));

function CreateWord(russian, english) {
  this.russian = russian;
  this.english = english;
}

const addWordInList = (index) => {
  listWords.innerHTML += `
    <div class="listWords__line">
        <div class="listWords__line-first">${words[index].russian}</div>
        <div class="listWords__line-second">${words[index].english}</div>
        <div class="listWords__line-third"><button class="btnDelete">&#10006</button></div>
    </div>
    `;
};

words.forEach((el, i) => {
  addWordInList(i);
});

saveWord.addEventListener("click", function () {
  if (
    rusWord.value.length == 0 ||
    !isNaN(rusWord.value) ||
    engWord.value.length == 0 ||
    !isNaN(engWord.value)
  ) {
    for (let key of inputs) {
        warning.classList.add('open');
    }
  } else {
    for (let key of inputs) {
      warning.classList.remove('open');
      words.push(new CreateWord(rusWord.value, engWord.value));
      localStorage.setItem("words", JSON.stringify(words));
      // addWordInList(words.length - 1);
      rusWord.value = null;
      engWord.value = null;
    }
  }
});

const deleteWord = (e) => {
  const rowIndex = e.target.parentNode.parentNode.rowIndex;
  e.target.parentNode.parentNode.remove();
  words.splice(rowIndex), 1;
  localStorage.removeItem("words");
  localStorage.setItem("words", JSON.stringify(words));
};

const addEventDelete = () => {
  if (words.length > 0) {
    btnDelete = document.querySelectorAll(".btnDelete");
    for (btn of btnDelete) {
      btn.addEventListener("click", (e) => {
        deleteWord(e);
      });
    }
  }
};

addEventDelete();

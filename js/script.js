const btnShow = document.querySelectorAll(".js-show"),
  containers = document.querySelectorAll(".container"),
  rusWord = document.querySelector("#rus"),
  engWord = document.querySelector("#eng"),
  voiceWord = document.querySelector("#voice"),
  saveWord = document.querySelector("#saveWord"),
  listWords = document.querySelector("#listWords"),
  necessarilyInput = document.querySelectorAll(".necessarily"),
  warning = document.querySelector(".words__warning"),
  list = document.querySelector("#list");

let words, btnDelete;

// По клику на кнопки появляется словарик и поле ввода новых слов
for (show of btnShow) {
  show.addEventListener("click", () => {
    containers.forEach((container) => container.classList.add("open"));
  });
}

// Отрисовка слов в словаре слов
// Сохраненных ранее
localStorage.length < 1
  ? (words = [])
  : (words = JSON.parse(localStorage.getItem("words")));

// Сохраненных сейчас
const addWordInList = (index) => {
  if (words[index].voice == null) {
    listWords.innerHTML += `
    <div class="listWords__line">
        <div class="listWords__block">${words[index].russian}</div>
        <div class="listWords__block">${words[index].english}</div>
        <div class="listWords__block"></div>
        <div class="listWords__block listWords__block-delete"><button class="btnDelete">&#10006</button></div>
    </div>
    `;
  } else {
  listWords.innerHTML += `
    <div class="listWords__line">
        <div class="listWords__block">${words[index].russian}</div>
        <div class="listWords__block">${words[index].english}</div>
        <div class="listWords__block">${words[index].voice}</div>
        <div class="listWords__block listWords__block-delete"><button class="btnDelete">&#10006</button></div>
    </div>
    `;
  }
};

words.forEach((el, i) => {
  addWordInList(i);
});

// Добавление слов
function CreateWord(russian, english, voice = null) {
  this.russian = russian;
  this.english = english;
  this.voice = voice;
}

saveWord.addEventListener("click", function () {
  if (
    rusWord.value.length == 0 ||
    !isNaN(rusWord.value) ||
    engWord.value.length == 0 ||
    !isNaN(engWord.value)
  ) {
    for (inp of necessarilyInput) {
      warning.classList.add("open");
      inp.classList.add('color');
    }
  } else {
    for (inp of necessarilyInput) {
      warning.classList.remove("open");
      inp.classList.remove('color');
      words.push(new CreateWord(rusWord.value, engWord.value, voice.value));
      localStorage.setItem("words", JSON.stringify(words));
      addWordInList(words.length - 1);
      rusWord.value = null;
      engWord.value = null;
      voice.value = null;
    }
  }
});

// Удаление из словаря
const deleteWord = (e) => {
  e.target.closest('.listWords__line').remove();
  // words.splice(rowIndex, 1);
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

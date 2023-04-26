const btnShow = document.querySelectorAll(".js-show"),
  containers = document.querySelectorAll(".container"),
  rusWord = document.querySelector("#rus"),
  engWord = document.querySelector("#eng"),
  voiceWord = document.querySelector("#voice"),
  saveWord = document.querySelector("#saveWord"),
  listWords = document.querySelector("#listWords"),
  table = document.querySelector("tbody"),
  necessarilyInput = document.querySelectorAll(".necessarily"),
  warning = document.querySelector(".words__warning"),
  list = document.querySelector("#list");

let words, btnDelete;

// По клику на кнопки появляется словарик и аккордеон
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
    table.innerHTML += `
    <tr>
        <td>${words[index].russian}</td>
        <td>${words[index].english}</td>
        <td></td>
        <td class="listWords__block-delete"><button class="btnDelete">&#10006</button></td>
    </tr>
    `;
  } else {
    table.innerHTML += `
    <tr>
        <td>${words[index].russian}</td>
        <td>${words[index].english}</td>
        <td>${words[index].voice}</td>
        <td class="listWords__block-delete"><button class="btnDelete">&#10006</button></td>
    </tr>
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
      inp.classList.add("color");
    }
  } else {
    for (inp of necessarilyInput) {
      warning.classList.remove("open");
      inp.classList.remove("color");
    }
      words.push(new CreateWord(rusWord.value, engWord.value, voice.value));
      localStorage.setItem("words", JSON.stringify(words));
      addWordInList(words.length - 1);
      rusWord.value = null;
      engWord.value = null;
      voice.value = null;
  }
});

// Удаление из словаря
const deleteWord = (e) => {
  const rowIndex = e.target.closest("tr").rowIndex;
  e.target.closest("tr").remove();
  words.splice(rowIndex, 1);
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

// Аккордеон
function onToggle(event) {
  if (event.target.open) {
    document.querySelectorAll(".accordion > details[open]").forEach((elem) => {
      if (elem === event.target) {
        return;
      }
      elem.open = false;
    });
  }
}

document
  .querySelectorAll(".accordion > details")
  .forEach((el) => el.addEventListener("toggle", onToggle));

// Попап
const question = document.querySelector("#question"),
  popup = document.querySelector("#popup");

window.addEventListener("click", function(e) {
  if (e.target == question) {
  popup.classList.add("open");
  }
  if (e.target.closest('.closeNotify')) {
    question.classList.add("hidden");
  }
});
popup.addEventListener("click", function (e) {
  e.preventDefault();
  let info = popup.querySelector("#info"),
    email = popup.querySelector("#email").value;
  if (e.target == popup || e.target.closest(".close")) {
    popup.classList.remove("open");
  }
  if (e.target.closest(".js-form-send") && email != "") {
    info.classList.add('visibly');
    info.textContent = "Вы подписаны на рассылку.";
  }
  if (e.target.closest(".js-form-send") && email == "") {
    info.classList.add('visibly');
    info.textContent = "Поле e-mail не заполнено или заполнено некорректно.";
  }
});

window.addEventListener("keydown", function (e) {
  if (e.keyCode === 27) {
    popup.classList.remove("open");
  }
});

import { renderComments } from "./render.js";
import { postComments } from "./api.js";
import { getFetchPromise } from "./main.js";

const inputNameEl = document.getElementById('inputName');
const textCommentEl = document.getElementById('textComment');
const addFormButtonEl = document.getElementById('addFormButton');
const deleteButtonEl = document.getElementById('delete-button');

// обработчик кнопки написать комментарий
export function addComment() {
    addFormButtonEl.addEventListener('click', function (e) {
    e.stopPropagation();

    inputNameEl.classList.remove('error');
    textCommentEl.classList.remove('error');
    if (inputNameEl.value.trim() === '' && textCommentEl.value.trim() === '') {
      inputNameEl.classList.add('error');
      textCommentEl.classList.add('error');
      return;
    } if (inputNameEl.value.trim() === '') {
      inputNameEl.classList.add('error');
      return;
    } else if (textCommentEl.value.trim() === '') {
      textCommentEl.classList.add('error');
      return;
    }

    addFormButtonEl.disabled = true;
    addFormButtonEl.textContent = "Комментарий добавляется...";

    const postFetch = postComments({
      name: sanitize(inputNameEl.value),
      text: sanitize(textCommentEl.value)} )
      .then(() => {
        getFetchPromise();
        addFormButtonEl.disabled = false;
        addFormButtonEl.textContent = "Написать";
        inputNameEl.value = "";
        textCommentEl.value = "";
      })
      .catch((error) => {
        addFormButtonEl.disabled = false;
        addFormButtonEl.textContent = "Написать";
        alert(error.message);
        console.warn(error);
      })
  });
}



//функция ответа на комментарий
export function answerComment({ comments }) {
    const commentHTML = document.querySelectorAll('.comment');
    commentHTML.forEach((el, i) => {
        el.addEventListener('click', () => {
            textCommentEl.value = `QUOTE_BEGIN ${comments[i].name}\n ${comments[i].text} QUOTE_END`;
        })
    })
}

// функция удаления последнего комментария
  export function deleteComment({comments}) {
    deleteButtonEl.addEventListener('click', () => {
      comments.pop();
      renderComments({comments});
    })
  }

// функции неактивной кнопки
export function nonActiveButton() {
    addFormButtonEl.disabled = true;
    inputName.addEventListener('input', (event) => {
        if (event.target.value.trim === '') {
            addFormButtonEl.disabled = true;
        } else {
            addFormButtonEl.disabled = false;
        }
    })
    textCommentEl.addEventListener('input', (event) => {
        if (event.target.value.trim === '') {                   // что здесь значит target ?
            addFormButtonEl.disabled = true;
        } else {
            addFormButtonEl.disabled = false;
        }
    })
}

// функция заменяющая теги на символы в тексте
export function sanitize(text) {
    return text.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div>');
}
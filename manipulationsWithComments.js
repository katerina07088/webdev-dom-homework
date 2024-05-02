import { renderComments } from "./render.js";
const textCommentEl = document.getElementById('textComment');
const addFormButtonEl = document.getElementById('addFormButton');
//const deleteButtonEl = document.getElementById('delete-button');

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
//   export function deleteComment({comments}) {
//     deleteButtonEl.addEventListener('click', () => {
//       comments.pop();
//       renderComments({comments});
//     })
//   }

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
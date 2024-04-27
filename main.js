"use strict";

import { getComments, postComments } from "./api.js";

  // элементы
  const listOfCommentsElement = document.getElementById('listOfComments');
  const addFormButtonEl = document.getElementById('addFormButton');
  const inputNameEl = document.getElementById('inputName');
  const textCommentEl = document.getElementById('textComment');
  const likeCounterEl = document.querySelectorAll('.likes-counter')
  const deleteButtonEl = document.getElementById('delete-button');
  const addFormEl = document.querySelector('add-form')
  const commentHiddenEl = document.getElementById('commentHidden');


  // массив комментариев 
  let comments = [];

  // функция на получение данных из API

  function getFetchPromise() {
    commentHiddenEl.classList.remove('comment-hidden');
    const fetchPromise = getComments()
    // fetch("https://wedev-api.sky.pro/api/v1/:korotenko/comments", {
    //   method: "GET"
    // })
    //   .catch(() => {
    //     throw new Error('Кажется, у вас сломался интернет, попробуйте позже');
    //   })
    //   .then((response) => {
    //     if (response.status === 500) {
    //       throw new Error("Сервер сломался, попробуй позже")
    //     }
    //     return response.json();
    //   })
      .then((reponseData) => {
        const appComments = reponseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: comment.date,
            text: comment.text,
            likeCounter: comment.likes,
            likeButton: false,
          };
        })
        comments = appComments
        commentHiddenEl.classList.add('comment-hidden');
        renderComments()
      })
      .catch((error) => {
        alert(error.message);
      })
  };
  getFetchPromise();


  // функция рендер
  const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
      return `<li class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${addDateTimeofComments(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likeCounter}</span>
              <button class="like-button ${comment.likeButton ? '-active-like' : ''}" data-index='${index}'></button>     
            </div>
          </div>
        </li>`
    })
      .join("");
    listOfCommentsElement.innerHTML = commentsHtml;
    countLikes();
    nonActiveButton();
    answerComment();
  };
  renderComments();
  deleteComment();

  // функция счетчика лайков
  function countLikes() {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeEl of likeButtonElements) {
      likeEl.addEventListener('click', function (e) {
        e.stopPropagation();
        const index = likeEl.dataset.index;
        if (comments[index].likeButton) {
          comments[index].likeButton = false;
          comments[index].likeCounter--;
        } else {
          comments[index].likeButton = true;
          comments[index].likeCounter++;
        }
        renderComments()
      });
    }
  }

    //функция ответа на комментарий
    function answerComment() {
    const commentHTML = document.querySelectorAll('.comment');
    commentHTML.forEach((el, i) => {
      el.addEventListener('click', () => {
        textCommentEl.value = `QUOTE_BEGIN ${comments[i].name}\n ${comments[i].text} QUOTE_END`;
      })
    })
  }

  // функция удаления последнего комментария
  function deleteComment() {
    deleteButtonEl.addEventListener('click', () => {
      comments.pop();
      renderComments();
    })
  }

  //функции неактивной кнопки
  function nonActiveButton() {
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
  function sanitize(text) {
    return text.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div>');
  }

  // функция для формата времени
  function addDateTimeofComments(commentDate) {
    let currentDate = new Date(commentDate);
    const date = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const time = { hour: 'numeric', minute: 'numeric' };
    let dateTimeOfCommmet = currentDate.toLocaleDateString('ru-Ru', date) + " " + currentDate.toLocaleTimeString('ru-Ru', time);
    return dateTimeOfCommmet;
  }

  // обработчик кнопки написать комментарий
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
    // fetch("https://wedev-api.sky.pro/api/v1/:korotenko/comments", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: sanitize(inputNameEl.value),
    //     text: sanitize(textCommentEl.value),
    //     forceError: true,
    //   }),
    // })
    //   .catch(() => {
    //     throw new Error('Кажется, у вас сломался интернет, попробуйте позже');
    //   })
    //   .then((response) => {
    //     if (response.status === 201) {
    //       return response.json();
    //     } else if (response.status === 500) {
    //       throw new Error('Сервер сломался, попробуй позже');
    //     } else {
    //       throw new Error('Имя и комментарий должны быть не короче 3 символов')
    //     }
    //   })
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


  //добавление комментария через enter 
  // inputNameEl.addEventListener('keyup', (event) => {
  //   if (event.which === 13) {
  //       addFormButtonEl.click();
  //       }
  //  })
  //  textCommentEl.addEventListener('keyup', (event) => {
  //   if (event.which === 13) {
  //     addFormButtonEl.click();
  //       }
  //  })

  console.log("It works!");
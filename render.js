import { addDateTimeofComments } from "./helpers.js";
import { token } from "./api.js";
import { renderLogin} from "./renderLogin.js"
import { addComment, countLikes, answerComment, nonActiveButton } from "./listeners.js";


export const appElement = document.getElementById('app'); 

export const renderComments = ({ comments }) => {
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

    const appHtml = `<div id="container" class="container">
    <div id="commentHidden" class="comment-style comment-hidden">
      <p class="comment-text-hidden "> Комментарии загружаются ... </p>
    </div>
    <ul id="listOfComments" class="comments">${commentsHtml}</ul>
    <div class="add-form">
      <input id="inputName" type="text" class="add-form-name" placeholder="Введите ваше имя" />
      <textarea id="textComment" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="addFormButton" class="add-form-button">Написать</button>
      </div>
      <div>
        <button id="delete-button" class="delete-form-button">Удалить последний комментарий</button>
      </div>
    </div>
  </div>`

  const appNoLoginHtml = `<div id="container" class="container">
  <div id="commentHidden" class="comment-style comment-hidden">
    <p class="comment-text-hidden "> Комментарии загружаются ... </p>
  </div>
  <ul id="listOfComments" class="comments">${commentsHtml}</ul> 
  <div class="login">Чтобы добавить комментарий, <a href="#" id="login-link" class="login-link">авторизуйтесь</a></div>
  </div>`

  if (token) {
    appElement.innerHTML = appHtml;
  } else{
    appElement.innerHTML = appNoLoginHtml;
  }
    const loginLinkElement = document.getElementById('login-link'); // переход по ссылке авторизации
    loginLinkElement.addEventListener("click", () => {
      renderLogin();
    });
  addComment();
  countLikes({ comments });
  nonActiveButton({ comments });
  answerComment({ comments });
};

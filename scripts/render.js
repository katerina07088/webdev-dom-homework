//import { addDateTimeofComments } from "./helpers.js";
import { token, user } from "./api.js";
import { renderLogin } from "./renderLoginAndRegister.js";
import {
  addComment,
  countLikes,
  answerComment,
  nonActiveButton,
  deleteComment,
} from "./listeners.js";
import { format } from "date-fns";

export const appElement = document.getElementById("app");

export const renderComments = ({ comments }) => {
  const commentsHtml = comments
    .map((comment, index) => {
      return `<li class="comment">
            <div class="comment-header">
              <div>${comment.name}</div>
              <div>${format(new Date(comment.date), "yyyy-MM-dd hh.mm.ss")}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${comment.text}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likeCounter}</span>
                <button class="like-button ${comment.likeButton ? "-active-like" : ""}" data-index='${index}'></button>     
              </div>
            </div>
          </li>`;
    })
    .join("");

  const appHtml = `<div id="container" class="container">
   
     <ul id="listOfComments" class="comments">${commentsHtml}</ul>
    <div class="add-form">
      <input id="inputName" type="text" readonly class="add-form-name" value="${user}"  />
      <textarea id="textComment" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="addFormButton" class="add-form-button">Написать</button>
      </div>
      <div>
        <button id="delete-button" class="delete-form-button">Удалить последний комментарий</button>
      </div>
    </div>
  </div>`;

  const appNoLoginHtml = `<div id="container" class="container">
 
  <ul id="listOfComments" class="comments">${commentsHtml}</ul> 
  <div class="login">Чтобы добавить комментарий, <a href="#" id="login-link" class="login-link">авторизуйтесь</a></div>
  </div>`;

  if (token) {
    appElement.innerHTML = appHtml;
    addComment();
    nonActiveButton({ comments });
    answerComment({ comments });
    countLikes({ comments });
    deleteComment({ comments });
  } else {
    appElement.innerHTML = appNoLoginHtml;
    const loginLinkElement = document.getElementById("login-link"); // переход по ссылке авторизации
    loginLinkElement.addEventListener("click", () => {
      renderLogin();
    });
    countLikes({ comments });
  }
};

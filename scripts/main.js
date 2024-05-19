"use strict";

import { getComments } from "./api.js";
import { renderComments } from "./render.js";

// массив комментариев
let comments = [];

// функция на получение данных из API
export function getFetchPromise() {
  const appElement = document.getElementById("app");
  const loader = document.createElement("div");
  loader.textContent = "Комментарии загружаются...";
  loader.classList.add("loader");
  appElement.appendChild(loader);
  getComments()
    .then((reponseData) => {
      const appComments = reponseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: comment.date,
          text: comment.text,
          likeCounter: comment.likes,
          likeButton: false,
        };
      });
      comments = appComments;
      renderComments({ comments });
    })
    .catch((error) => {
      console.log(error.message);
    });
}
getFetchPromise();
console.log("It works!");

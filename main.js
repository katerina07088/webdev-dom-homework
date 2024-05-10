"use strict";

import { getComments } from "./api.js";
import { renderComments } from "./render.js";
import { addComment, deleteComment } from "./listeners.js";


// массив комментариев 
let comments = [];

// функция на получение данных из API
export function getFetchPromise() {
  //const commentHiddenEl = document.getElementById('commentHidden');
  //commentHiddenEl.classList.remove('comment-hidden');
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
      })
      comments = appComments
      //commentHiddenEl.classList.add('comment-hidden');
      renderComments({ comments })
      deleteComment({ comments });
    })
    .catch((error) => {
      console.log(error.message);  // потом вернуть alert
    })
   //addComment();
};
getFetchPromise();

console.log("It works!");
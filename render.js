import { addDateTimeofComments } from "./timeDate.js";
import { countLikes } from "./countLikes.js";

 const listOfCommentsElement = document.getElementById('listOfComments');
 //const likeCounterEl = document.querySelectorAll('.likes-counter');

export const renderComments = ({comments}) => {
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
      countLikes({likeCounterEl});
      //nonActiveButton();
      //answerComment();
    };
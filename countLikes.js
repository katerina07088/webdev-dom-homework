
const likeCounterEl = document.querySelectorAll('.likes-counter');

export function countLikes({likeCounterEl, comments}) {
  
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
          renderComments({comments})
        });
      }
    }
export function getComments () {

    return  fetch("https://wedev-api.sky.pro/api/v1/:korotenko/comments", {
      method: "GET"
    })
      .catch(() => {
        throw new Error('Кажется, у вас сломался интернет, попробуйте позже');
      })
      .then((response) => {
        if (response.status === 500) {
          throw new Error("Сервер сломался, попробуй позже")
        }
        return response.json();
      });
    }

    export function postComments ({name,text}) {
       return fetch("https://wedev-api.sky.pro/api/v1/:korotenko/comments", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        text: text,
        forceError: true,
      }),
    })
      .catch(() => {
        throw new Error('Кажется, у вас сломался интернет, попробуйте позже');
      })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          throw new Error('Сервер сломался, попробуй позже');
        } else {
          throw new Error('Имя и комментарий должны быть не короче 3 символов')
        }
      });
    }


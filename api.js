const commentsURL = "https://wedev-api.sky.pro/api/v2/:korotenko/comments";
const userLog = " https://wedev-api.sky.pro/api/user/login";
const userReg = "https://wedev-api.sky.pro/api/user";

// функция на переопределение token
export let token;
export const setToken = (newToken) => {
  token = newToken;
}

//функция на имя 
export let user;
export const setName = (newName) => {
  user = newName;
};

// функция на получение комментов из api
export function getComments() {
  return fetch(commentsURL, {
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
// функция на добавление коммента в api
export function postComments({ text }) {
  return fetch(commentsURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
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

// функция на авторизацию
export function login({ login, password }) {
  return fetch(userLog, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    return response.json();
  })
}

// функция на регистрацию
export function register({ name, login, password }) {
  return fetch(userReg, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      login: login,
      password: password,
    }),
  })
    .then((response) => {
      return response.json();
    })
};

// export function deleteComment({ id }) {
//   return fetch(`${commentsURL}/${id}`, {     // почему такая запись? что она значит?
//       method: "DELETE",
//       headers: {
//           Authorization: `Bearer ${token}`,
//       }
//   }).then((response) => {
//       return response.json();
//   })
// }

// render login
import { getFetchPromise } from "./main.js"
import { login, setToken } from "./api.js";
import { appElement } from "./render.js";


export const renderLogin = () => {
    const loginHtml =
        `<div class="container">
    <div class = "login-form">
    <h3 class="form-title">Форма входа</h3>
    <input id="login-input" type="text" class="login-input" placeholder="Введите ваш логин " />
    <input id="password-input" type="text" class="login-input" placeholder="Введите ваш пароль"></input>
      <button id="login-button" class="login-button">Войти</button>
      <a href="#" id="link-to-register" class="link-to-register" >Зарегистрироваться</a>
    </div>
  </div>`
    appElement.innerHTML = loginHtml;   //  вставленный блок в Html

    const buttonLoginElement = document.getElementById("login-button");
    const passwordInputElement = document.getElementById("password-input");
    const loginInputElement = document.getElementById("login-input");

    buttonLoginElement.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            setToken(responseData.user.token);  // как понять этот путь? откуда его взяли?
        }).then(() => {
            getFetchPromise();
        });
    });
}

// //renderRegister
// export const renderRegister = () => {
//     const appElement = document.getElementById('app');  // получить элемент из Html
//     const loginHTML =
//     `<div class="A">
//     <h3 class="form-title">Форма регистрации</h3>
//     <input id="name-register" type="text" class="A" placeholder="Введите ваше имя " />
//     <input id="login-register" type="text" class="A" placeholder="Введите ваш логин"></input>
//     <input id="password-register" type="text" class="A" placeholder="Введите ваш пароль"></input>
//     <div class="A">
//       <button id="register-button" class="add-login-button">Зарегистрироваться</button>
//       <a href="#" id="link-to-register">Войти</a>                // другой id дать
//     </div>
//   </div>`
//     appElement.innerHTML = loginHTML;   //  вставленный блок в Html

//     const buttonRegisterElement = document.getElementById("register-button");
//     const loginInputElement = document.getElementById("login-register");
//     const passwordInputElement = document.getElementById("password-register");
//     const nameRegisterElement = document.getElementById('name-register');

//     buttonRegisterElement.addEventListener("click", () => {    // тут будет другаялогика какая-то
//         login({
//             login: loginInputElement.value,
//             password: passwordInputElement.value,
//         }).then((responseData) => {
//             setToken(responseData.user.token);  // как понять этот путь? откуда его взяли?
//         });
//     });

// }
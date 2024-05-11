// render login
import { getFetchPromise } from "./main.js"
import { login, setToken } from "./api.js";
import { appElement } from "./render.js";


export const renderLogin = () => {
    const loginHtml =
        `<div class="container">
    <div class = "login-form">
    <h3> Форма входа </h3>
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
    const registerElement =document.getElementById('link-to-register');

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
    registerElement.addEventListener("click", () => {
        renderRegister();
    });
}


//renderRegister
export const renderRegister = () => {
    const loginHTML =
    `<div class = "container">
    <div class = "register-form"
    <h3> Форма регистрации </h3>
    <input id="name-register" type="text" class="register-input" placeholder="Введите ваше имя " />
    <input id="login-register" type="text" class="register-input" placeholder="Введите ваш логин"></input>
    <input id="password-register" type="text" class="register-input" placeholder="Введите ваш пароль"></input>
      <button id="register-button" class="register-button">Зарегистрироваться</button>
      <a href="#" id="link-to-login" class = "link-to-login">Войти</a>    
      </div>
  </div>`
    appElement.innerHTML = loginHTML;   //  вставленный блок в Html

    const buttonRegisterElement = document.getElementById("register-button");
    const loginInputElement = document.getElementById("login-register");
    const passwordInputElement = document.getElementById("password-register");
    const nameRegisterElement = document.getElementById('name-register');
    const linkToLoginElement= document.getElementById('link-to-login');

    buttonRegisterElement.addEventListener("click", () => {    // тут будет другаялогика какая-то
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            setToken(responseData.user.token);  // как понять этот путь? откуда его взяли?
        });
    });
  linkToLoginElement.addEventListener("click", () => {
    renderLogin();  
});
}
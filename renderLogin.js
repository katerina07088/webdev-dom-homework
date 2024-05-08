// render login
import {getFetchPromise} from "./main.js"
import { login,setToken } from "./api.js";


// export const renderApp= () =>{
//     const loginHTML = 
//     // `<div class="authorization">Чтобы добавить комментарий, <a href="index.html" id="authorization-link" class="authorization-link">авторизуйтесь</a></div>`
//     //         }
//     `<div>
//     <p class = "link-login"> Чтобы добавить комментарий, авторизуйтесь </p>
//     </div>`
//     appElement.innerHTML = loginHTML;
// }


export const renderLogin = () => {
    const appElement = document.getElementById('app');  // получить элемент из Html
    const loginHTML = 
    `<div class="A">
    <h3 class="form-title">Форма входа</h3>
    <input id="login-input" type="text" class="A" placeholder="Введите ваш логин " />
    <input id="password-input" type="text" class="A" placeholder="Введите ваш пароль"></input>
    <div class="A">
      <button id="login-button" class="add-login-button">Войти</button>
      <a href="#" id="link-to-register">Зарегистрироваться</a>
    </div>
  </div>`
    appElement.innerHTML = loginHTML;   //  вставленный блок в Html

    const buttonLoginElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");

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
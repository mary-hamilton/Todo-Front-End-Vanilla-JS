import {login, signUp} from "../APIclient.js";
import {logUserIn, logUserOut} from "../auth.js";
import {updateUI} from "../ui/uiUtils.js";

function handleAuthSubmit(event, credentials, authAPIcall) {

    event.preventDefault();

    logUserOut();

    authAPIcall(credentials)
        .then(responseData => {
            const token = responseData.token
            if (token) {
                logUserIn(token);
                updateUI();
            }
        })
        .catch(error => console.log(error))
}
export function handleSignupSubmit(event) {

    let first_name = document.getElementById("signup-firstName").value;
    let last_name = document.getElementById("signup-lastName").value;
    let username = document.getElementById("signup-username").value;
    let password_plaintext = document.getElementById("signup-password").value;
    let confirm_password = document.getElementById("signup-confirm-password").value;
    let signUpData = {
        first_name,
        last_name,
        username,
        password_plaintext,
        confirm_password
    }

    handleAuthSubmit(event, signUpData, signUp)
}

export function handleLoginSubmit(event) {

    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;
    let basicAuthCredentials = {
        username,
        password,
    }

    handleAuthSubmit(event, basicAuthCredentials, login)
}

export function handleLogoutClick() {
    logUserOut()
    updateUI()
}


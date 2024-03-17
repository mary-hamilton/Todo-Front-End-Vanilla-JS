import {makeLogin} from "./login.js";
import {makeSignup} from "./signup.js";
import {isUserLoggedIn} from "../auth.js";

export function makeHeader() {

    let header = document.getElementById("header");
    header.innerHTML = "";

    let loggedIn = isUserLoggedIn()

    if (!loggedIn) {
        let loginEl = makeLogin();
        let signupEl = makeSignup();
        header.append(loginEl, signupEl)
    } else {
        let logoutButton = document.createElement("button");
        logoutButton.id = "logout-button";
        logoutButton.textContent = "Log Out"
        header.append(logoutButton);
    }
}
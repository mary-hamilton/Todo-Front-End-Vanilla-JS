
export function makeLogin() {

    let loginEl = document.createElement("div");

    let title = document.createElement("h4");
    title.innerText = "Log In";

    let form = document.createElement("form");
    form.id = "login-form";
    form.innerHTML = `
            <label for="login-username">Username</label>
            <input type="text" id="login-username" name="login-username">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" name="login-password">
            <input type="submit">
    `
    loginEl.append(title, form);

    return loginEl;
}
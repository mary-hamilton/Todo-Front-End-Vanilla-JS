
export function makeSignup() {

    const signupEl = document.createElement("div");
    
    const title = document.createElement("h4");
    title.textContent = "Or Sign Up";

    const form = document.createElement("form");
    form.id = "signup-form"
    form.innerHTML = `
            <label for="signup-firstName">First Name</label>
            <input type="text" id="signup-firstName" name="signup-firstName">
            <label for="signup-lastName">Last Name</label>
            <input type="text" id="signup-lastName" name="signup-lastName">
            <label for="signup-username">Username</label>
            <input type="text" id="signup-username" name="signup-username">
            <label for="signup-password">Password</label>
            <input type="password" id="signup-password" name="signup-password">
            <label for="signup-confirm-password">Confirm Password</label>
            <input type="password" id="signup-confirm-password" name="signup-confirm-password">
            <input type="submit">
    `
    signupEl.append(title, form)
    return signupEl;
}
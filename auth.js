export function isUserLoggedIn() {
    return !!localStorage.getItem("jwtToken");
}

export function logUserOut() {
    localStorage.removeItem("jwtToken")
}

export function logUserIn(token) {
    localStorage.setItem("jwtToken", token)
}
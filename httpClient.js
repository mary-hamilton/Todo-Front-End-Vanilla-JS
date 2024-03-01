
// function loadConfig() {
//     const isDevelopment = window.location.hostname === 'localhost'; // Adjust this condition based on your development environment
//
//     if (isDevelopment) {
//         return import('./config/config.dev.js').then(module => module.default);
//     } else {
//         // Prod environment stuff here
//     }
// }
//
// let baseUrl = ""
//
// loadConfig().then((config) => {
//     if (config) {
//         console.log(config)
//         baseUrl = config.apiUrl
//     }
// })

let baseUrl = "http://localhost:5000"

function genericFetch({ url, method, data, basicAuth = undefined }) {

    const token = localStorage.getItem('jwtToken');

    const headers = new Headers();

    if (token) {
        headers.append("Authorization", `Bearer ${token}`)
    }

    if (basicAuth) {
        const { username, password } = basicAuth
        headers.append("Authorization", `Basic  ${btoa(username + ':' + password)}`)
    }

    if (data) {
        headers.append("Content-Type", "application/json");
    }

    const init = {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined
    }

    return fetch(`${baseUrl}${url}`, init)
        .then(response => {
            if(!response.ok) {
                return response.json()
                    // TODO reformat the way errors are sent from the backend
                    .then(error => {
                        throw error
                    })
            }
            return response.json()
        })
        // TODO proper error handling
        .catch(error => console.log(error))
}

export function signUp(signUpData) {

    localStorage.removeItem('jwtToken')

    genericFetch({
        url: "/signup",
        method: "POST",
        data: signUpData
    }).then(responseData => {
        localStorage.setItem("jwtToken", responseData.token)
        return responseData
    })
}

export function login(basicAuth) {

    localStorage.removeItem('jwtToken')

    genericFetch({
        url: "/login",
        method: "POST",
        basicAuth
    }).then(responseData => {
        localStorage.setItem("jwtToken", responseData.token)
        return responseData
        })
}

export function fetchAllTodos() {
    return genericFetch({
        url: "/todos",
        method: "GET",
    })
}




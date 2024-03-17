
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

import {isUserLoggedIn} from "./auth.js";

let baseUrl = "http://localhost:5000"

function genericFetch({ url, method, data, headers }) {

    const allHeaders = new Headers();

    if (isUserLoggedIn()) {
        const token = localStorage.getItem("jwtToken");
        allHeaders.append("Authorization", `Bearer ${token}`)
    }

    if (data) {
        allHeaders.append("Content-Type", "application/json");
    }

    if (headers) {
        for (let headerName in headers) {
            const [ name, value ] = headers[headerName];
            allHeaders.append(name, value)
        }
    }

    const init = {
        method,
        headers: allHeaders,
        body: data ? JSON.stringify(data) : undefined
    }

    return fetch(`${baseUrl}${url}`, init)
        .then(response => {
            if(!response.ok) {
                return response.json()
                    .then(error => {
                        throw error
                    })
            }
            return response.json()
        })
}

export function signUp(signUpData) {

    return genericFetch({
        url: "/signup",
        method: "POST",
        data: signUpData
    })
}

export function login(basicAuthCredentials) {

    const { username, password } = basicAuthCredentials;
    const basicAuthHeader = ["Authorization", `Basic  ${btoa(username + ':' + password)}`]

    return genericFetch({
        url: "/login",
        method: "POST",
        headers: {basicAuthHeader}
    })
}

export function fetchAllTodos() {

    return genericFetch({
        url: "/todos",
        method: "GET",
    })
}

export function toggleTodoParent(childId, parentId) {

    return genericFetch({
        url: `/todos/${childId}/toggle_parent`,
        method: "PATCH",
        data: {
            parent_id: parentId
        }
    })
}




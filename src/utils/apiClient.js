import { API_URL } from "./constants"

async function makeRequest(resource) {
    const response = await fetch(`${API_URL}/${resource}`)
    const json = await response.json()

    return json
}

export function getChars() {
    return makeRequest('/chars')
}

export function getChar(name) {
    return makeRequest(`/chars/${name}`)
}

export async function getProfile(token) {
    const response = await fetch(`${API_URL}/accounts/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    })

    const json = await response.json()

    return json
}

export async function postLogin(username, password) {
    const response = await fetch(`${API_URL}/accounts/login`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ user: username, pass: password })
    })

    const token = await response.text()

    return token
}
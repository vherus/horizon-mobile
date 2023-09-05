import { API_URL } from './constants'

async function makeRequest(resource) {
    const response = await fetch(`${API_URL}/${resource}`)
    const json = await response.json()

    return json
}

async function makeAuthenticatedRequest(url, token) {
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    })

    const json = await response.json()

    return json
}

export function getChars() {
    return makeRequest('/chars')
}

export function getChar(name) {
    return makeRequest(`/chars/${name}`)
}

export function getEquipment(charName) {
    return makeRequest(`/chars/${charName}/equip`)
}

export async function getProfile(token) {
    return makeAuthenticatedRequest(`${API_URL}/accounts/profile`, token)
}

export async function getBalance(token, charname) {
    return makeAuthenticatedRequest(`${API_URL}/chars/${charname}/balance`, token)
}

export async function getDeliveries(token, charname) {
    return makeAuthenticatedRequest(`${API_URL}/chars/${charname}/delivery-box`, token)
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
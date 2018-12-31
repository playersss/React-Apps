let userName = '';

export function getBaseUrl() {
    return 'http://localhost:3001';
}

export function setUserName(username) {
    userName = username;
}

export function getUserName() {
    return userName;
}
// renderer/app.js
const { ipcRenderer } = require('electron');

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await ipcRenderer.invoke('login', { username, password });

    if (result.success) {
        alert('✅ Login exitoso');
    } else {
        document.getElementById('error').innerText = result.message;
    }
}

window.login = login;
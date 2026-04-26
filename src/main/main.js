const { app, BrowserWindow, ipcMain } = require('electron')
const bcrypt = require("bcryptjs");
const authService = require('./services/authService');


const User = require("../models/User");

// Example usage of the User model
// const userId = User.create({ username: "userTest", password: "password123" });
// console.log(`User created with ID: ${userId}`);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('../renderer/index.html'); 
}

app.whenReady().then(() => {
    createWindow()
    ipcMain.handle('login', async (event, data) => {
        return await authService.login(data);
    });
});

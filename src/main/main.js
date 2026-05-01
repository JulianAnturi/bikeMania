const { app, BrowserWindow, ipcMain } = require('electron')
const bcrypt = require("bcryptjs");
const authService = require('./services/AuthService');

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

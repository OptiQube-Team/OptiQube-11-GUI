

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

function createWindow() {
    const win = new BrowserWindow({
        width: 1150,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'Core/preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile('Application/index.html');

    ipcMain.on('minimize-window', () => win.minimize());
    ipcMain.on('maximize-window', () => win.maximize());
    ipcMain.on('close-window', () => win.close());

    ipcMain.on('start-cmd', () => {
        exec('start cmd', (error) => {
            if (error) {
                console.error('Failed to open CMD:', error);
            }
        });
    });
}

app.whenReady().then(createWindow);

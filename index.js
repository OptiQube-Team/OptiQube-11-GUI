// const { app, BrowserWindow } = require('electron');
// const { ipcMain } = require('electron');

// const path = require('path');

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1150,
//     height: 700,
//     frame: false,
//     webPreferences: {
//       preload: path.join(__dirname, 'Core/preload.js'),
//     }
//   });

//   win.loadFile('Application/index.html');
// }

// ipcMain.on('close-window', () => {
//   BrowserWindow.getFocusedWindow().close();
// });
// ipcMain.on('minimize-window', () => {
//   BrowserWindow.getFocusedWindow().minimize();
// });
// ipcMain.on('maximize-window', () => {
//   const window = BrowserWindow.getFocusedWindow();
//   window.isMaximized() ? window.unmaximize() : window.maximize();
// });


// app.whenReady().then(() => {
//   createWindow();
// });

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

function createWindow() {
    const win = new BrowserWindow({
        width: 1150,
        height: 700,
        frame: false,
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

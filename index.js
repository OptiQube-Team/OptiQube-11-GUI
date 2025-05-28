const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');

const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1150,
    height: 700,
    frame: false, // Disable default title bar
    webPreferences: {
      preload: path.join(__dirname, 'Core/preload.js'),
    }
  });

  win.loadFile('Application/index.html');
}

ipcMain.on('close-window', () => {
  BrowserWindow.getFocusedWindow().close();
});
ipcMain.on('minimize-window', () => {
  BrowserWindow.getFocusedWindow().minimize();
});
ipcMain.on('maximize-window', () => {
  const window = BrowserWindow.getFocusedWindow();
  window.isMaximized() ? window.unmaximize() : window.maximize();
});


app.whenReady().then(() => {
  createWindow();
});

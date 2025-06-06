const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('minimize-window'),
    maximize: () => ipcRenderer.send('maximize-window'),
    close: () => ipcRenderer.send('close-window'),
    startCmd: () => ipcRenderer.send('start-cmd'),
    optiqubeinit: () => ipcRenderer.send('initialiseoptiqube')
});

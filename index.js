const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');
const fetch = require('node-fetch');
const AdmZip = require('adm-zip');

// async function downloadAndExtract(url, destDir) {
//     const response = await fetch(url);
//     if (!response.ok) throw new Error(`Failed to download ${url}`);

//     const buffer = await response.buffer();
//     const zipPath = path.join(destDir, path.basename(url));

//     fs.writeFileSync(zipPath, buffer);

//     const zip = new AdmZip(zipPath);
//     zip.extractAllTo(destDir, true);

//     return destDir;
// }

// async function initializeOptiQube() {
//     try {
//         const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'optiqube'));

//         await downloadAndExtract('https://cdn.dogwaffle.world/hackbgrt.zip', tempDir);
//         const setupCmdPath = path.join(tempDir, 'setup.cmd');

//         console.log('Running setup.cmd...');
//         exec(`"${setupCmdPath}"`, { cwd: tempDir }, (error, stdout, stderr) => {
//             if (error) {
//                 console.error(`Error running setup.cmd:`, error);
//                 return;
//             }
//             console.log('setup.cmd output:', stdout);

//             (async () => {
//                 await downloadAndExtract('https://cdn.dogwaffle.world/REDGE.zip', tempDir);
//                 const redgeExePath = path.join(tempDir, 'REDGE.exe');

//                 console.log('Running REDGE.exe...');
//                 exec(`"${redgeExePath}"`, { cwd: tempDir }, (error2, stdout2, stderr2) => {
//                     if (error2) {
//                         console.error(`Error running REDGE.exe:`, error2);
//                         return;
//                     }
//                     console.log('REDGE.exe output:', stdout2);
//                 });
//             })();
//         });
//     } catch (err) {
//         console.error('Error in initializeOptiQube:', err);
//     }
// }

function initializeOptiQube() {
    const exePath = path.join(app.getAppPath(), 'bin', 'hackbgrt','setup.cmd');
    const exePath2 = path.join(app.getAppPath(), 'bin','REDGE.cmd');

    exec(exePath, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error launching exe:`, error);
            return;
        }
        console.log('Executable output:', stdout);
    });

    exec(exePath2, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error launching exe:`, error);
            return;
        }
        console.log('Executable output:', stdout);
    });
}

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
        initializeOptiQube();
    });
}

app.whenReady().then(createWindow);

document.getElementById('min-btn').addEventListener('click', () => {
  window.electronAPI.minimize();
});

document.getElementById('max-btn').addEventListener('click', () => {
  window.electronAPI.maximize();
});

document.getElementById('close-btn').addEventListener('click', () => {
  window.electronAPI.close();
});

document.getElementById('start-cmd').addEventListener('click', () => {
    window.electronAPI.startCmd();
});

document.getElementById('initialiseoptiqube').addEventListener('click', () => {
    window.electronAPI.optiqubeinit();
});
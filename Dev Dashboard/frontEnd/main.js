const { Dashboard } = require('./dashboard');
// import electron = require('electron');
const { ipcRenderer } = electron;

window.onload = () => {
  const dashboard = new Dashboard();
  dashboard.render();
};

// const { Dashboard } = require('./dashboard').default;
// import electron = require('electron');
import { Dashboard } from './dashboard/dashboard.js';
// const { ipcRenderer } = electron;

window.onload = () => {
  const dashboard = new Dashboard();
  // dashboard.render();

  dashboard.init();
};

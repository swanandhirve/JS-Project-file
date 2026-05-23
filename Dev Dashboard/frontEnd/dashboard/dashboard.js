// import routes from '../routes/api';
// import { Tabulator } from 'tabulator-tables';
// import { uuidv4 } from 'uuidv4';
// const { uuidv4 } = require('uuidv4');

export class Dashboard {
  constructor() {
    this.apiUrl = 'http://localhost:3000/api';
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.apiUrl}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async render() {
    const data = await this.fetchData('dashboard-data');
    if (data) {
      // Render the dashboard with the fetched data
      console.log('Dashboard data:', data);
    } else {
      console.log('Failed to load dashboard data.');
    }
  }

  init() {
    this.#getData().then((data) => {
      let columnHeaders = [
        { title: 'Id', field: 'id' },
        { title: 'Repository', field: 'repoName' },
        { title: 'Repository Commits', field: 'commits' },
      ];

      let gridOptions = {
        height: '100%',
        layout: 'fitColumns',
      };

      let callbacks = {
        rowClick: function (e, row) {
          console.log('Row clicked:', row.getData());
        },
      };

      let table = new Tabulator('#repo-list', {
        data: [data.data],
        height: '100%', // ✅ directly here
        layout: 'fitColumns', // ✅ directly here
        columns: [
          { title: 'Id', field: 'id', visible: false },
          { title: 'Repository', field: 'repoName' },
          { title: 'Repository Commits', field: 'commits' },
        ],
      });
      // table.appendTo('repo-list');
    });
  }

  async #getData() {
    let res = await fetch(`${this.apiUrl}/dashboard-data`);
    if (res.ok) {
      let data = await res.json();
      console.log('Data from API:', data);
      return data;
    } else {
      console.error('Failed to fetch data from API:', res.statusText);
    }
  }
}

// export default { Dashboard };
// module.exports = { Dashboard };

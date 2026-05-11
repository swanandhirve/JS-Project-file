class Dashboard {
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
}

export { Dashboard };

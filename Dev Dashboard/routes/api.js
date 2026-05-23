const { v4: uuidv4 } = require('uuid');

const routes = {
  '/api/data': {
    method: 'GET',
    handler: (req, res) => {
      const data = {
        message: 'Hello from the API!',
        timestamp: new Date(),
      };
      res.json(data);
    },
  },

  '/api/hello': {
    method: 'GET',
    handler: (req, res) => {
      const data = {
        message: 'Hello from the /api/hello endpoint!',
        timestamp: new Date(),
      };
      res.json(data);
    },
  },

  '/api/dashboard-data': {
    method: 'GET',
    handler: async (req, res) => {
      let response = await fetch(
        'https://api.github.com/repos/swanandhirve/JS-Project-file',
      );

      if (!response.ok) {
        res.status(500).json({
          message: 'Failed to fetch dashboard data',
          error: response.statusText,
        });
      }

      let responseData = await response.json();

      let commitsUrl = responseData.commits_url.replace('{/sha}', '');
      response = await fetch(commitsUrl);
      let commitsData = await response.json();

      let data = {
        id: uuidv4(),
        repoName: responseData.name,
        commits: commitsData.length,
      };

      res.json({
        message: 'Dashboard data fetched successfully!',
        data: data,
      });
    },
  },
};

module.exports = routes;

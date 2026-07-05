const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: './routes/.env' });

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
      const username = 'swanandhirve';
      const token = process.env.GITHUB_TOKEN;
      const perPage = 100; // Number of repositories per page
      const page = 1; // Page number

      let response;

      try {
        const url = 'https://api.github.com/users/' + username + `/repos`;
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github+json',
            'User-Agent': 'my-app'
          }
        });

        if (!response.ok) throw new Error('Unauthorized or bad request');

        const repos = await response.json();
        // console.log(repos);

        if (!response.ok) {
          res.status(500).json({
            message: 'Failed to fetch dashboard data',
            error: response.statusText,
          });
        }

        let allRepoData = [];

        for (let repo of repos) {
          let responseData = repo;
          let commitsUrl = responseData.commits_url.replace('{/sha}', '');
          response = await fetch(commitsUrl);
          let commitsData = await response.json();
          allRepoData.push({
            id: uuidv4(),
            repoName: responseData.name,
            commits: commitsData.length,
            date: repo.updated_at,
            description: repo.description
          });
        }

        res.json({
          message: 'Dashboard data fetched successfully!',
          data: allRepoData,
        });
      } catch (error) {
        console.error('Error:', error);
      }




      // let repos = await response.json();
    },
  },
};

module.exports = routes;

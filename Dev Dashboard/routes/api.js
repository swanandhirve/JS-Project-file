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
};

module.exports = routes;

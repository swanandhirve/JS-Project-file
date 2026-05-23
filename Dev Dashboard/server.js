const express = require('express');
const app = express();
const routes = require('./routes/api');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontEnd')));

const PORT = process.env.PORT || 3000;

// Register API routes
try {
  Object.keys(routes).forEach((route) => {
    const { method, handler } = routes[route];
    app[method.toLowerCase()](route, handler);
  });
} catch (err) {
  console.error('Route registration failed:', err);
}

app.get('/api/data', (req, res) => {
  // res.send('Hello World!');
  res.send({
    message: `Hello from the API! ${res.data}`,
    timestamp: new Date(),
  });
});

app.get('/api/hello', (req, res) => {
  res.send({
    message: 'Hello from the /api/hello endpoint!',
    timestamp: new Date(),
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontEnd/dashboard.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

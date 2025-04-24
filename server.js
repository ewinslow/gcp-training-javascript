// server.js
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  console.log('Request for /');
  res.status(200).json({ message: 'Hello World v2!' });
});

app.get('/health', (req, res) => {
  console.log('Request for /health');
  res.status(200).json({ status: 'ok' });
});

app.use((req, res) => {
    res.status(404).send("404");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500');
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}...`);
  });
}

module.exports = app;
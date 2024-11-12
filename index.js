const express = require('express');
const app = express();
const port = 9000;

app.use(express.raw({ type: '*/*', limit: '1mb' }));

const keyMap = new Map();

app.post('/input', (req, res) => {
  const key = req.body.toString().trim();

  if (key) {
    keyMap.set(key, (keyMap.get(key) || 0) + 1);
    res.send('OK');
  } else {
    res.status(400).send('Bad Request: Missing key');
  }
});

app.get('/query', (req, res) => {
  const { key } = req.query;

  if (key === undefined) {
    return res.status(400).send('Missing key query parameter');
  }

  const count = keyMap.get(key) || 0;
  res.send(count.toString());
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

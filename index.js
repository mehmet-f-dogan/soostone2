const express = require('express');
const app = express();
const port = 9000;

app.use(express.text());

const keyMap = new Map();

app.post('/input', (req, res) => {
  const key = req.body.trim();
  if (key) {
    keyMap.set(key, (keyMap.get(key) || 0) + 1);
    res.status(200).send('Key received');
  } else {
    res.status(400).send('Invalid input');
  }
});

app.get('/query', (req, res) => {
  const key = req.query.key;

  if (key) {
    const count = keyMap.get(key) || 0;
    res.status(200).send(count.toString());
  } else {
    res.status(400).send('Key query parameter is missing');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


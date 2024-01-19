import express from 'express';

const port = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to gadjets store');
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

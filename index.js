const express = require('express');
const request = require('request-promise');


const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = '719fe24c1fcd3c9ea563faf322d2ca28';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('welcome to amazon scrapper API.');
});

app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`);
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offers/${productId}`);
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;

  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

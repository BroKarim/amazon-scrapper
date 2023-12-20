//deklarasikan variabel express dan mengimpor modul express, yang digunakan untuk membuat server web dengan mudah.
const express = require('express');
//impor modul request-promise, yang digunakan untuk membuat permintaan HTTP berbasis Promise.
const request = require('request-promise');

// Membuat instance aplikasi Express menggunakan fungsi express()
const app = express();

//Mendeklarasikan variabel PORT yang akan menentukan port server.
//Jika nilai dari environment variable PORT sudah diatur, maka gunakan nilainya; jika tidak, gunakan port default 5000.
const PORT = process.env.PORT || 5000;

const apiKey = '719fe24c1fcd3c9ea563faf322d2ca28';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

//pastikan bahwa request akan di parse sebagai objek JSON
app.use(express.json());

//Ketika permintaan diterima, server akan mengirimkan pesan "welcome to amazon scrapper API." sebagai respons.
app.get('/', (req, res) => {
  res.send('welcome to amazon scrapper API.');
});

// GET PRODUCT DETAILS : http://localhost:5000/products/B0B8G8Y9QP
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});
// GET PRODUCT Reviews : http://localhost:5000/products/B0B8G8Y9QP/reviews
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`);
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});
// GET PRODUCT offer : http://localhost:5000/products/B0B8G8Y9QP/offers
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offers/${productId}`);
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});
// GET search result : http://localhost:5000/search/macbook
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;

  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//Menjalankan server pada port yang telah ditentukan. Ketika server berhasil dimulai, pesan "Server running on port {PORT}" akan ditampilkan di konsol.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// KONTEN
/**

- Kayaknya untuk yang sifatnya baru kita pelajari, dari pada ndak ada waktu kita pahami mending konten kita manfaatin untuk memahami
- Sehingga tak bakal ada kontribusi leih pada penjelasan kode di ig
Refernsi : 
https://www.scrapehero.com/tutorial-how-to-scrape-amazon-product-details-using-python-and-selectorlib/

- Nati card arahkan ke 



 */

const express = require('express');
const request = require('request-promise');


const app = express();
const PORT = process.env.PORT || 5000;
const apiKey = '719fe24c1fcd3c9ea563faf322d2ca28';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser middleware

app.get('/', (req, res) => {
  res.send(`
  <html>
  <head>
  <style>

  body{
    background-color: #121212;
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-family: 'Lato', sans-serif;
  }

    .container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      width: 50%;
  }

  .label {
    margin: 0 auto;
    text-align: center;
    padding: 10px;       
    background-color: #c0ffdd;
    color: #000;
}
   
    h2 {
      font-family: 'Arial', sans-serif;
      font-size: 3.75em;
      margin: 5px;
    }

    .form {
      margin-top: 5px;
    }

    .form label {
      display: block;
      margin-bottom: 5px;
    }

    .form input {
      padding: 5px;
      width: 200px;
    }

    .form button {
      padding: 8px;
      background-color: transparent;
    
      border-width: 5px;
      
      border-style: solid;
      border-color: rgb(255, 0, 0);

      color: white;
      border: none;
      cursor: pointer;
    }
  </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
</head>
      <body>
      <div class="container">
        <div class="label">Web Scrapping</div>
        <h2>Welcome to Amazon Scraper API</h2>
        <p> Programmatically retrieve and present detailed information such as names, product details, and images from amazon </p>
        <form class="form" action="/generate-link" method="post">
          <label for="productCode">Enter Product Code:</label>
          <input type="text" id="productCode" name="productCode" required>
          <button  type="submit">Go</button>
        </form>
        </div>
      </body>
    </html>
  `);
});

app.post('/generate-link', (req, res) => {
  const productCode = req.body.productCode;
  const productLink = `http://localhost:5000/products/${productCode}`;
  res.redirect(productLink);
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


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

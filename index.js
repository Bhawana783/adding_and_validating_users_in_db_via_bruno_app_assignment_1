const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

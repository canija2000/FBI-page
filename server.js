const express = require('express');
const app = express();
const port = 3000;
const routes = require('./scripts/routes');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.static('views'));
app.use('/', routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });



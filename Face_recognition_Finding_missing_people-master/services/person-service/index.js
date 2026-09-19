const connectToMongo = require('./db');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5001;

connectToMongo();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Healthcheck route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'person-service' });
});

// Person routes
app.use('/api/missingpeople', require('./routes/missing'));
app.use('/api/missingpeople', require('./docs/swagger'));

app.listen(port, () => {
    console.log(`Person Microservice running on port ${port}`);
});

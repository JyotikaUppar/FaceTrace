const connectToMongo = require('./db');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5002;

connectToMongo();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Healthcheck route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'location-service' });
});

// Location routes
app.use('/api/foundlocation', require('./routes/location'));

app.listen(port, () => {
    console.log(`Location Microservice running on port ${port}`);
});

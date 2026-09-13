const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5003;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Healthcheck route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'notification-service' });
});

// Notification routes
app.use('/api/notifications', require('./routes/notification'));

app.listen(port, () => {
    console.log(`Notification Microservice running on port ${port}`);
});

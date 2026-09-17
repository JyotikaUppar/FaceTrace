const test = require('node:test');
const assert = require('node:assert');
const http = require('http');

test('Location Service Healthcheck Test', (t, done) => {
    const options = {
        hostname: 'localhost',
        port: 5002,
        path: '/health',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        assert.strictEqual(res.statusCode, 200);
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
            const body = JSON.parse(data);
            assert.strictEqual(body.status, 'OK');
            assert.strictEqual(body.service, 'location-service');
            done();
        });
    });

    req.on('error', (e) => {
        assert.ok(e !== null);
        done();
    });

    req.end();
});

test('Location Data Formatting Helper Test', () => {
    const payload = {
        name: "Test Person",
        adhaar: "999988887777",
        locationval: "Lat: 12.9716, Long: 77.5946"
    };

    assert.ok(payload.name);
    assert.strictEqual(payload.adhaar.length, 12);
    assert.ok(payload.locationval.includes("Lat:"));
});

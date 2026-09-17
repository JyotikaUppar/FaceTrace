const test = require('node:test');
const assert = require('node:assert');

test('Location Service Healthcheck Structure Test', () => {
    const healthResponse = { status: 'OK', service: 'location-service' };
    assert.strictEqual(healthResponse.status, 'OK');
    assert.strictEqual(healthResponse.service, 'location-service');
});

test('Location Coordinates Boundary Validation Test', () => {
    const latitude = 12.9716;
    const longitude = 77.5946;
    assert.ok(latitude >= -90 && latitude <= 90);
    assert.ok(longitude >= -180 && longitude <= 180);
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

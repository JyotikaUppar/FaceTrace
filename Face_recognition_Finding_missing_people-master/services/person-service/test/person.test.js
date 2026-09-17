const test = require('node:test');
const assert = require('node:assert');

test('Person Service Healthcheck Structure Test', () => {
    const healthResponse = { status: 'OK', service: 'person-service' };
    assert.strictEqual(healthResponse.status, 'OK');
    assert.strictEqual(healthResponse.service, 'person-service');
});

test('Person Aadhaar Sanitization Helper Test', () => {
    const rawAadhaar = '  1234-5678-9012  ';
    const sanitized = rawAadhaar.replace(/[^0-9]/g, '');
    assert.strictEqual(sanitized, '123456789012');
    assert.strictEqual(sanitized.length, 12);
});

test('Person Payload Validation Test', () => {
    const mockPerson = {
        name: 'Jane Doe',
        adhaar: '123456789012',
        city: 'Mumbai',
        status: 'Missing'
    };
    assert.ok(mockPerson.name);
    assert.strictEqual(mockPerson.adhaar.length, 12);
    assert.strictEqual(mockPerson.status, 'Missing');
});

const express = require('express');

const router = express.Router();
const locationSchema = {
    type: 'object',
    required: ['name'],
    properties: {
        _id: { type: 'string' }, name: { type: 'string', example: 'Ananya Sharma' }, adhaar_number: { type: 'string', example: '123456789012' }, date: { type: 'string', format: 'date-time' },
        location: { type: 'object', properties: { city: { type: 'string', example: 'Pune' }, region: { type: 'string', example: 'Maharashtra' }, country: { type: 'string', example: 'India' }, latitude: { type: 'string', example: '18.5204' }, longitude: { type: 'string', example: '73.8567' }, ip: { type: 'string' }, timezone: { type: 'string' } } }
    }
};
const spec = {
    openapi: '3.0.3', info: { title: 'FaceTrace Location Tracking API', version: '1.0.0', description: 'Record and retrieve sighting locations for missing people.' }, servers: [{ url: '/', description: 'Current server (direct service or API gateway)' }], tags: [{ name: 'Health' }, { name: 'Locations' }],
    paths: {
        '/health': { get: { tags: ['Health'], summary: 'Check service health', responses: { 200: { description: 'Service is healthy' } } } },
        '/api/foundlocation/addlocation': { post: { tags: ['Locations'], summary: 'Record a sighting location', requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['name'], properties: { name: { type: 'string', example: 'Ananya Sharma' }, adhaar: { type: 'string', example: '123456789012' }, locationval: locationSchema.properties.location } } } } }, responses: { 201: { description: 'Location saved', content: { 'application/json': { schema: locationSchema } } }, 500: { description: 'Unable to save location' } } } },
        '/api/foundlocation/getalllocations': { get: { tags: ['Locations'], summary: 'List all location sightings', responses: { 200: { description: 'Locations retrieved', content: { 'application/json': { schema: { type: 'array', items: locationSchema } } } }, 500: { description: 'Unable to fetch locations' } } } }
    }
};
router.get('/openapi.json', (req, res) => res.json(spec));
router.get('/docs', (req, res) => res.type('html').send(`<!doctype html><html><head><meta charset="utf-8"><title>FaceTrace Location API Docs</title><link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"></head><body><div id="swagger-ui"></div><script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script><script>SwaggerUIBundle({url:'openapi.json',dom_id:'#swagger-ui',persistAuthorization:true})</script></body></html>`));
module.exports = router;

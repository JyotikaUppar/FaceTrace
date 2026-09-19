const express = require('express');

const router = express.Router();
const spec = {
    openapi: '3.0.3', info: { title: 'FaceTrace Notification API', version: '1.0.0', description: 'Dispatch WhatsApp alerts when a missing person is sighted.' }, servers: [{ url: '/', description: 'Current server (direct service or API gateway)' }], tags: [{ name: 'Health' }, { name: 'Notifications' }],
    paths: {
        '/health': { get: { tags: ['Health'], summary: 'Check service health', responses: { 200: { description: 'Service is healthy' } } } },
        '/api/notifications/send-whatsapp': { post: { tags: ['Notifications'], summary: 'Send a WhatsApp sighting notification', requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['number', 'name', 'adhaar'], properties: { number: { type: 'string', example: '9876543210', description: 'Indian mobile number without +91' }, name: { type: 'string', example: 'Ananya Sharma' }, adhaar: { type: 'string', example: '123456789012' }, location: { type: 'object', properties: { city: { type: 'string' }, region: { type: 'string' }, country: { type: 'string' }, latitude: { type: 'string' }, longitude: { type: 'string' } } } } } } } }, responses: { 200: { description: 'Notification dispatched', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean', example: true }, response: { type: 'object' } } } } } }, 500: { description: 'Notification provider error' } } } }
    }
};
router.get('/openapi.json', (req, res) => res.json(spec));
router.get('/docs', (req, res) => res.type('html').send(`<!doctype html><html><head><meta charset="utf-8"><title>FaceTrace Notification API Docs</title><link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"></head><body><div id="swagger-ui"></div><script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script><script>SwaggerUIBundle({url:'openapi.json',dom_id:'#swagger-ui',persistAuthorization:true})</script></body></html>`));
module.exports = router;

const express = require('express');

const router = express.Router();

const personSchema = {
    type: 'object',
    required: ['name', 'adhaar_number'],
    properties: {
        _id: { type: 'string', example: '665a0ed3a1e2f4b5c6d7e8f9' },
        name: { type: 'string', example: 'Ananya Sharma' },
        email: { type: 'string', format: 'email', example: 'ananya@example.com' },
        Gender: { type: 'string', example: 'Female' },
        identification: { type: 'string', example: 'Birthmark on left cheek' },
        nationality: { type: 'string', example: 'Indian' },
        height: { type: 'number', example: 165 },
        Date_missing: { type: 'string', format: 'date-time' },
        address: { type: 'string', example: 'Pune, Maharashtra' },
        adhaar_number: { type: 'string', example: '123456789012' },
        phonenumber: { type: 'number', example: 9876543210 },
        image: { type: 'object', description: 'Stored image metadata and binary data.' },
        date: { type: 'string', format: 'date-time' }
    }
};

const spec = {
    openapi: '3.0.3',
    info: {
        title: 'FaceTrace Person Registry API',
        version: '1.0.0',
        description: 'Register, retrieve, and remove reports for missing people.'
    },
    servers: [{ url: '/', description: 'Current server (direct service or API gateway)' }],
    tags: [{ name: 'Health' }, { name: 'Missing people' }],
    paths: {
        '/health': {
            get: { tags: ['Health'], summary: 'Check service health', responses: { 200: { description: 'Service is healthy' } } }
        },
        '/api/missingpeople/addperson': {
            post: {
                tags: ['Missing people'], summary: 'Register a missing person',
                requestBody: { required: true, content: { 'multipart/form-data': { schema: { type: 'object', required: ['name', 'adhaar_number'], properties: {
                    name: { type: 'string' }, email: { type: 'string', format: 'email' }, Gender: { type: 'string' }, identification: { type: 'string' }, nationality: { type: 'string' }, height: { type: 'number' }, datemissing: { type: 'string', format: 'date-time' }, address: { type: 'string' }, adhaar_number: { type: 'string' }, phonenumber: { type: 'string' }, image: { type: 'string', format: 'binary' }
                } } } } },
                responses: { 201: { description: 'Person registered', content: { 'application/json': { schema: personSchema } } }, 500: { description: 'Unable to save the person' } }
            }
        },
        '/api/missingpeople/getallpersons': {
            get: { tags: ['Missing people'], summary: 'List all missing people', responses: { 200: { description: 'People retrieved', content: { 'application/json': { schema: { type: 'array', items: personSchema } } } }, 500: { description: 'Unable to fetch people' } } }
        },
        '/api/missingpeople/getallpersons/{id}': {
            get: { tags: ['Missing people'], summary: 'Find people by Aadhaar number', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Aadhaar number' }], responses: { 200: { description: 'Matching people', content: { 'application/json': { schema: { type: 'array', items: personSchema } } } }, 404: { description: 'Person not found' }, 500: { description: 'Unable to fetch person' } } }
        },
        '/api/missingpeople/deleteperson/{id}': {
            delete: { tags: ['Missing people'], summary: 'Delete a missing-person report', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Aadhaar number' }], responses: { 200: { description: 'Person deleted' }, 404: { description: 'Person not found' }, 500: { description: 'Unable to delete person' } } }
        }
    }
};

router.get('/openapi.json', (req, res) => res.json(spec));
router.get('/docs', (req, res) => res.type('html').send(`<!doctype html><html><head><meta charset="utf-8"><title>FaceTrace Person API Docs</title><link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"></head><body><div id="swagger-ui"></div><script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script><script>SwaggerUIBundle({url:'openapi.json',dom_id:'#swagger-ui',persistAuthorization:true})</script></body></html>`));

module.exports = router;

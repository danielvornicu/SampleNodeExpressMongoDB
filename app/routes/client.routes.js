module.exports = (app) => {
    const clients = require('../controllers/client.controller.js');

    // get all clients
    app.get('/clients', clients.findAll);

    // Create a new client
    app.post('/clients/new', clients.create);

    // get a single client by id
    app.get('/clients/:id', clients.findById);

    // Update a client with id
    app.post('/clients/:id/edit', clients.update);

    // Delete a Client by id and return remaining client list
    app.get('/clients/:id/delete', clients.delete);
}
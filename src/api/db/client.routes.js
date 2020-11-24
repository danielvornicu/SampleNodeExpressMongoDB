module.exports = (app) => {
    //ClientController function version
    //const clientController = require('../db/client.controller.func.js');

    //ClientController class version
    const ClientController = require('../db/client.controller.js');
    // Instantiate ClientController:
    let clientController = new ClientController();

    // get all clients
    app.get('/clients', clientController.findAll);

    // Create a new client
    app.post('/clients/new', clientController.create);

    // get a single client by id
    app.get('/clients/:id', clientController.findById);

    // Update a client with id
    app.post('/clients/:id/edit', clientController.update);

    // Delete a Client by id and return remaining client list
    app.get('/clients/:id/delete', clientController.delete);
}
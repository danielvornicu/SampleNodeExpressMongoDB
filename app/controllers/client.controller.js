const Client = require('../models/client.js');

// Retrieve and return all clients from the database.
exports.findAll = (req, res) => {
    Client.find()
    .then(clients => {
        res.send(clients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreurs dues à la reception des clients."
        });
    });
};

// Create and Save a new client
exports.create = (req, res) => {
    // Validate request
    if(!req.body.prenom) {
        return res.status(400).send({
            message: "Le prenom du client ne peut pas etre vide."
        });
    }

    if(!req.body.nom) {
        return res.status(400).send({
            message: "Le nom du client ne peut pas etre vide."
        });
    }

    // Create a client object
    const client = new Client({
        prenom: req.body.prenom || "Untitled", 
        nom: req.body.nom
    });

    // Save the client in the database
    client.save()
    //return the created client
    // .then(data => {
    //     res.send(data);
    // })
    // redirect to clients list
    .then(data => {
        res.redirect('/clients')
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur survenue à la creation du client."
        });
    });
};

// Find a single client with a id
exports.findById= (req, res) => {
    Client.findById(req.params.id)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "On n'a pas trouvé le client avec l'id " + req.params.id
            });            
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "On n'a pas trouvé le client avec l'id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error à la reception du client avec l'id " + req.params.id
        });
    });
};

// Update a client identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.prenom) {
        return res.status(400).send({
            message: "Le prenom du client ne peut pas etre vide."
        });
    }

    if(!req.body.nom) {
        return res.status(400).send({
            message: "Le nom du client ne peut pas etre vide."
        });
    }

    // Find client and update it with the request body
    Client.findByIdAndUpdate(req.params.id, {
        prenom: req.body.prenom || "Untitled",
        nom: req.body.nom
    }, {new: true})
    //return the updated client
    // .then(client => {
    //     if(!client) {
    //         return res.status(404).send({
    //             message: "On n'a pas trouvé le client avec l'id " + req.params.id
    //         });
    //     }
    //     res.send(client);
    // })
    // redirect to clients list
    .then(data => {
        res.redirect('/clients')
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "On n'a pas trouvé le client avec l'id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Erreur survenue à la modification du client. " + req.params.id
        });
    });
};

// Delete a client with the specified id in the request
exports.delete = (req, res) => {
    Client.findByIdAndRemove(req.params.id)
    //return a message
    // .then(client => {
    //     if(!client) {
    //         return res.status(404).send({
    //             message: "On n'a pas trouvé le client avec l'id " + req.params.id
    //         });
    //     }
    //     //res.send({message: "Client supprimé avec success!"});
    // })
    // redirect to clients list
    .then(data => {
         res.redirect('/clients')
    })
    .catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "On n'a pas trouvé le client avec l'id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "On ne peut pas supprimer le client avec l'id " + req.params.id
        });
    });
};
const Client = require('../db/client.model.js');
const messages = require('../static/messages.json'); 

//ClientService function version
//const clientService = require('../db/client.service.func.js');  

//ClientService class version
const ClientService = require('../db/client.service.js');  
// Instantiate ClientService:
let clientService = new ClientService()

class ClientController {

    //get all clients
    findAll(req, res){
        clientService.findAll()
        .then(clients => {
            res.send(clients);
            //return res.status(200).json({ status: 200, data: clients, message: "Succesfully Clients Retrieved" });
            //return clients;
            //console.log(clients);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || messages.api.errors.findAllError
            });
        });
    }

    //get client by id
    findById (req, res) {
        clientService.findById(req.params.id)
        .then(client => {
            if(!client) {
                return res.status(404).send({
                    message: messages.api.errors.clientNotFoundError + req.params.id
                });            
            }
            res.send(client);
            //console.log(client);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: messages.api.errors.clientNotFoundError + req.params.id
                });                
            }
            return res.status(500).send({
                message: messages.api.errors.findByIdError + req.params.id
            });
        });
    }

    // Create and Save a new client
    create (req, res) {
        var prenom = req.body.prenom;
        var nom    = req.body.nom;
        var error;

        // Validation
        if(!prenom) {
            error = messages.fiche.client.validation.prenom.required;
        }

        if(!nom) {
            error = messages.fiche.client.validation.nom.required;
        }

        if (!error){
            // Create a client object
            const client = new Client({
                prenom: req.body.prenom || "Untitled", 
                nom: req.body.nom
            });

            // Save the client in the database, isCreation=true
            clientService.save(client, true)
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
                    message: err.message || messages.api.errors.createError
                });
            });
        } else {
            return res.status(400).send({
                message: error
            }); 
        }
    }



    // Update a client identified by the id in the request
    update (req, res) {
        var prenom = req.body.prenom;
        var nom    = req.body.nom;
        var error;

        // Validation
        if(!prenom) {
            error = messages.fiche.client.validation.prenom.required;
        }

        if(!nom) {
            error = messages.fiche.client.validation.nom.required;
        }

        if (!error){
            // update the existing client, , isCreation=false
            clientService.save({
                id : req.params.id,
                prenom: req.body.prenom, 
                nom: req.body.nom
            }, false)
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
                        message: messages.api.errors.clientNotFoundError + req.params.id
                    });                
                }
                return res.status(500).send({
                    message: messages.api.errors.updateError + req.params.id
                });
            });
        } else {
            return res.status(400).send({
                message: error
            });     
        }
    }

    // Delete a client with the specified id in the request
    delete (req, res) {
        clientService.delete(req.params.id)
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
                    message: messages.api.errors.clientNotFoundError + req.params.id
                });                
            }
            return res.status(500).send({
                message: messages.api.errors.deleteError + req.params.id
            });
        });
    }
}

module.exports = ClientController
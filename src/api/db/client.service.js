const Client = require('../db/client.model.js');

class ClientService {
    //get all clients
    findAll() {
        try {
            var clients =  Client.find();
            return clients;
        } catch (err) {
            throw Error(messages.api.errors.findAllError)
        }
    }

    //get client by id
    findById(id)  {
        try {
            var client =  Client.findById(id);
            return client;
        } catch (err) {
            throw Error(messages.api.errors.findByIdError + id)
        }
    }


    //create new Client or update existing one(HTTP POST)
    save(client, isCreation)  {
        if (isCreation){
            // Save the new client in the database
            return client.save();
        } else {
            // Find client and update it 
            return Client.findByIdAndUpdate(client.id, client, {new: true , useFindAndModify: false});
        }
    }

    delete(id)  {
        try {
            return Client.findByIdAndRemove(id);
        } catch (err) {
            throw Error(messages.api.errors.deleteError + id)
        }
    }
}

module.exports = ClientService
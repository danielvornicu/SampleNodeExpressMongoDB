const Client = require('../db/client.model.js');

//get all clients
exports.findAll = function () {
    try {
        var clients =  Client.find();
        return clients;
    } catch (err) {
        throw Error(messages.api.errors.findAllError)
    }
}

//get client by id
exports.findById = function (id)  {
    try {
        var client =  Client.findById(id);
        return client;
    } catch (err) {
        throw Error(messages.api.errors.findByIdError + id)
    }
};

//create new Client or update existing one(HTTP POST)
exports.save = function (client, isCreation)  {
  if (isCreation){
        // Save the new client in the database
        return client.save();
  } else {
        // Find client and update it 
       return Client.findByIdAndUpdate(client.id, client, {new: true , useFindAndModify: false});
  }
};

//delete client with id
exports.delete = function (id)  {
    try {
        return Client.findByIdAndRemove(id);
    } catch (err) {
        throw Error(messages.api.errors.deleteError + id)
    }
};
const mongoose = require('mongoose');

const ClientSchema= mongoose.Schema({
    prenom: String,
    nom: String
}, 
{
  timestamps: false
},
{ collection : 'Clients' }
);

//Clients = collection name
module.exports = mongoose.model('Client', ClientSchema, 'Clients');
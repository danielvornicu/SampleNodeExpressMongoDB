const mongoose = require('mongoose');

const ClientSchema= mongoose.Schema({
    //id   : ObjectId,
    prenom: String,
    nom: String
}, 
{
  timestamps: false
}
);

/**
 * toJSON implementation (hide some columns)
 */
ClientSchema.options.toJSON = {
  transform: function(doc, ret, options) {
      //ret is the JSON'ed object, and it's not an instance of the mongoose model
      ret.id = ret._id;
      //ret.prenoms = ret.prenom;
      //ret.noms = ret.nom;

      delete ret._id;
      //delete ret.prenom;
      //delete ret.nom;
      delete ret.adresse;
      delete ret.commandes;
      delete ret.__v;
      delete ret._class;

      return ret;
  }
}

//Clients = collection name
const Client = mongoose.model('Client', ClientSchema, 'Clients')
module.exports = Client;
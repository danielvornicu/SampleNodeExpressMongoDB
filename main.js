const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
//mesages
const messages = require('./src/static/messages.json'); 
// using EJS layouts
const expressLayouts = require('express-ejs-layouts');
//flash message
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
//
const ClientService = require('./src/api/db/client.service.js'); 
const Client = require('./src/api/db/client.model.js');
// Instantiate ClientService:
let clientService = new ClientService();

// create express app
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./src/api/db/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
 useNewUrlParser: true,
 useUnifiedTopology : true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Configuration template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "src/views"));
app.use(express.static(path.join(__dirname, "src/static")));
//app.use(express.urlencoded({ extended: false }));
app.set('layout', 'base');
// using EJS layouts
app.use(expressLayouts);

//flash messages
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    //store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Clients app"});
});

// define a simple route to welcome page
app.get('/welcome', (req, res) => {
    res.render("home/welcome", {title : "Bienvenue sur cette page" });
});

//define HTML routes for REST API CLIENT
// GET all clients
app.get("/client", (req, res) => {
    clientService.findAll()
    .then(clients => {
        res.render("clients/client.liste.ejs", { clients: clients, msg : messages});
    });
});

// GET creation client, must be before GET client/:id
app.get("/client/new", (req, res) => {
    res.render("clients/client.fiche.ejs", { client: {"id":-1,"nom":"","prenom":""}, msg : messages });
});

// POST creation client
app.post("/client/new", (req, res) => {
    // Create a client object
    const client = new Client({
        prenom: req.body.prenom, 
        nom: req.body.nom
    });

    clientService.save(client, true)
    .then( clients => {
        res.redirect('/client');
    }); 

    req.flash('success', messages.liste.actions.creerSucces + client.nom + " " + client.prenom);
});

// GET consult client by id
app.get("/client/:id", (req, res) => {
    const id = req.params.id;
    clientService.findById(id)
    .then(client => {
       res.render("clients/client.consult.ejs", { client: client, msg : messages });
    }); 
});


// GET modification client
app.get("/client/:id/edit", (req, res) => {
    const id = req.params.id;
    clientService.findById(id)
    .then(client => {
       res.render("clients/client.fiche.ejs", { client: client, msg : messages });
    }); 
 });

// POST modification client
app.post("/client/:id/edit", (req, res) => {
    client = {id: req.params.id,
              prenom: req.body.prenom,
              nom: req.body.nom};

    clientService.save(client, false)
    .then(clients => {
        res.redirect('/client');
    }); 

    req.flash('success', messages.liste.actions.modifierSucces + client.nom + " " + client.prenom);
});

// GET delete client
app.get("/client/:id/delete", (req, res) => {
    const id = req.params.id;

    clientService.delete(id)
    .then(clients => {
        res.redirect('/client');
    }); 

    req.flash('warning', messages.liste.actions.supprimerSucces);
 });
 //define HTML routes for REST API CLIENT

//REST API Routes
require('./src/api/db/client.routes.js')(app);

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
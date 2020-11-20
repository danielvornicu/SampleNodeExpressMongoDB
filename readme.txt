node --version => v12.13.0 (Node version)
npm --version  => 6.12.0 (Npm version)
ng --version(or ng v) =>  8.3.14  (Angular CLI version)
npm install -g @angular/cli  - install Angular Command Line Interface globally: for Component and Service part (for using ng...)


1. Create app:
>mkdir SampleNodeExpressMongoDB
>cd SampleNodeExpressMongoDB
SNEM>npm init  -  to initialize your app with a package.json file

2. Install dependencies: express, body-parser, mongoose 
>npm install express body-parser mongoose --save
Mongoose is an ODM (Object Document Mapping) tool for Node.js and MongoDB

3. Setting up the webserver
Create the main.js file:
>npm install
>node main.js - lance the web server on port 4000 then go to: http://localhost:4000/

4. Configuring and Connecting to the database
>mkdir config
>cd config
Create a config file: database.config.js with:
module.exports = {
    url: 'mongodb://localhost:27017/ClientDb'
}

5. Defining the Client model in Mongoose
>mkdir -p app\models
>cd app\models and create a model file called client.js

6. Defining Routes using Express
>mkdir app\routes
>cd app\routes and create a route file called client.routes.js
 
7. Developing the Restful APIs
>mkdir app\controllers
>cd app\controllers and create a controller file client.controller.js

REST Api:
http://localhost:4000/clients                                  HTTP GET - all clients
http://localhost:4000/clients/new                              HTTP GET  - show creation window
http://localhost:4000/clients/new                              HTTP POST - save created client and show the list of clients
http://localhost:4000/clients/5e6227ec915dde0810d395c6         HTTP GET - consult single client
http://localhost:4000/clients/5e6227ec915dde0810d395c6/edit    HTTP GET   - show modification window
http://localhost:4000/clients/5e6227ec915dde0810d395c6/edit    HTTP POST  - save modificated client and show the list of clients
http://localhost:4000/clients/5e6227ec915dde0810d395c6/delete  HTTP GET  - delete selected client and show the remaining list of clients

MongoDB database:
Install mongodb 4.2.3 in d:\java\apps\mongodb\mongodb 4.2.3\ then make a .bat file in \bin directory named: startMongo.bat with this content:
mongod.exe --dbpath="d:\java\apps\mongodb\mongodb 4.2.3\data\db"

On windows 10 MongoDB is instaled in c:\Program Files\MongoDB

Client for MongoDB:
Robo 3T 1.3 (old Robomongo), then make a MongoDB connection at localhist:27017



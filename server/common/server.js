const Express = require('express');
const bodyParser = require('body-parser');
const http =  require('http');
const path = require('path');
const cors = require('cors');

const app = new Express();
const root = path.normalize(`${__dirname}/../..`);


class ExpressServer {
    constructor() {
        app.use(bodyParser.json({limit: '50mb'}));
        app.use(bodyParser.urlencoded({
            extended: true,
        }));
        app.use(cors({
            allowedHeaders: ['Content-Type', 'token', 'x-api-key',"MimeType"],
            exposedHeaders: ['token'],
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: true,
        }));
    }
    
    router(routes) {
        routes(app);
        return this;
    }

    handleError() {
        app.get('/*', (request, response) => {
            response.send('Pho.To POC is running');
        });
        return this;
    }

    configureDb() {
        return new Promise((resolve, reject) => {
            // Mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
            //     if (err) {
            //         console.log(`Error in mongodb connection ${err.message}`);
            //         return reject(err);
            //     }
            //     console.log('Mongodb connection established');
                return resolve(this);
            // });
        });
    }

    listen(port) {
        http.createServer(app).listen(port, () => {
            console.log(`secure app is listening @port ${port}`);
        });
        return app;
    }
    

}

module.exports = ExpressServer;

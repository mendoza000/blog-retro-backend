const express = require('express');
const cors = require('cors');
require('colors');
const fileUpload = require('express-fileupload');
const { connectDB } = require('../database/config');

class Server {

    constructor() {
        console.log('\n');

        this.app  = express();
        this.port = process.env.PORT;
        this.paths   = {
            articles: '/api/articles'
        };

        // Conectar base de datos
        this.conectarDB()

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await connectDB()
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use(this.paths.articles, require('../routes/articles'))
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`${'Servidor corriendo'.cyan} en https://localhost:${this.port}`);
        });
    }

}




module.exports = Server;

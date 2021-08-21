const express = require('express');
const cors = require('cors');
require('colors');
const { connectDB } = require('../database/config');

class Server {

    constructor() {
        console.log('\n');

        this.app  = express();
        this.port = process.env.PORT;
        this.paths   = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            users: '/api/usuarios',
            productos : '/api/productos',
            search: '/api/search'
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
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.productos, require('../routes/productos'))
        this.app.use( this.paths.search, require('../routes/search') )
        this.app.use( this.paths.users, require('../routes/usuarios'));
        this.app.use( this.paths.categorias, require('../routes/categorias'))
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`${'Servidor corriendo'.cyan} en https://localhost:${this.port}`);
        });
    }

}




module.exports = Server;

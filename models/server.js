const express = require('express');
const cors = require('cors');



class Server {

	constructor(){
		this.app = express()
		this.port = process.env.PORT
		this.usersPath = 'api/users'

		/* middlewares */
		this.middlewares()

		this.routes()
	}

	middlewares(){

		/*Ruta public*/
		this.app.use(express.static('public'))

		/* Leer y parsear body */
		this.app.use(express.json())

		/*cyan: revisar como configurar cors whitelist*/
		this.app.use(cors())

	}

	routes(){

		this.app.use(this.usersPath, require('../routes/users'))

	}

	listen(){
		this.app.listen(this.port, () =>{
			console.log("Servidor alojado en el puerto", this.port);
		})
	}

}

module.exports = Server



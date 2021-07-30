const mongoose = require('mongoose');
const connectDB = async () =>{
	mongoose.Promise = global.Promise;
	try{

		mongoose.connect(process.env.MONGO,{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})

		console.log("Base de datos online");


	}catch(error){
		throw new Error('Error al inicializar la base de datos!')
		console.log(error);
	}

}

module.exports = {
	connectDB
}












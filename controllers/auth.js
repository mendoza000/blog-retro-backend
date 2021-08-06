const bcryptjs = require('bcryptjs');

const User = require('../models/users');
const generarJWT = require('../helpers/generar-jwt');

const authLogin = async(req, res) => {

	const { pass, mail } = req.body

	try{
		/* Confirmamos si el usuario existe */
		const user = await User.findOne({mail})
		if (!user) {
			return res.status(400).json({
				msg: "El mail / pass no existe en la base de datos."
			})
		}

		/* Confirmamos si el usuario esta activo */
		if (!user.status) {
			return res.status(400).json({
				msg: "El usuario ya no esta activo."
			})
		}

		/* Confirmamos si la contraseña es correcta */
		const validPass = bcryptjs.compareSync(pass, user.pass)
		if (!validPass) {
			return res.status(400).json({
				msg: "La contraseña es incorrecta."
			})
		}

		/* Generar JWT */
		const token = await generarJWT(user.id)


		res.json({
			msg: "funcionando authLogin",
			token
		})


	}catch(error){
		console.log(error);
		res.status(500).json({
			error: "Error en el backend, comuniquese con el dev :/"
		})
	}
}

module.exports = {
	authLogin
}
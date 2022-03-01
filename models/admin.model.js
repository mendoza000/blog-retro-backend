
const { Schema, model } = require('mongoose');

const AdminScheme = Schema({
	status:{
		type: Boolean,
		default: true,
		required: true
	},
	mail: {
    type: String,
    required: [true, 'El correo es necesario']
  },
  pass: {
    type: String,
    required: [true, 'La contraseña es requrida']
  },
  username: {
    type: String,
    required: [true, 'El usuario es requrido'],
    uniqued: true
  }

})


AdminScheme.methods.toJSON = function() {
	const { __v, pass, _id, ...admin  } = this.toObject()

	admin.uid = _id
	return admin
}

module.exports = model('Admin', AdminScheme)
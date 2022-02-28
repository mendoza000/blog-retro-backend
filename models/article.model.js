
const { Schema, model } = require('mongoose');

const ArticleScheme = Schema({
	status:{
		type: Boolean,
		default: true,
		required: true
	},
	title:{
		type: String,
		required: [true, 'El nombre es requerido.'],
		unique: true
	},
	date: {
		type: String,
		required: [true, 'El nombre es requerido.'],
	},
	text: {
		type: String,
		required: [true, 'El contendio del articulo es requerido.']
	}

})

module.exports = model('Article', ArticleScheme)
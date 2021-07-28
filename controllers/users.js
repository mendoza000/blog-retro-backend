const { response } = require('express');

const usersGet = (req, res = response) => {
	res.json({
		msg: 'get api - controller'
	})
}

const usersPut = (req, res = response) => {
	res.json({
		msg: 'put api - controller'
	})
}

const usersDelete = (req, res = response) => {
	res.json({
		msg: 'delete api - controller'
	})
}

const usersPost = (req, res = response) => {
	const { name, id } = req.body

	res.json({
		msg: 'post api - controller',
		name,
		id
	})
}




module.exports = {
	usersGet,
	usersPut,
	usersDelete,
	usersPost
}
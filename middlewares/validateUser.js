const Admin = require('../models/admin.model')

const validateMailExist = async (req, res, next) => {
  const {mail} = req.body
  const admin = await Admin.findOne({mail})

  if(!admin) return res.status(400).json({
    msg: 'No existe ningun admin con ese correo!',
    error: true
  })

  req.admin = admin
  next()
}

const validateMailNoExist = async(req, res, next) => {
  const {mail} = req.body
  const admin = await Admin.findOne({mail})

  if(admin) return res.status(400).json({
    msg: 'Ya existe un admin con ese correo',
    error: true
  })
  
  next()
}

module.exports = {
  validateMailExist,
  validateMailNoExist
}
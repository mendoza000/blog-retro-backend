const {request, response} = require('express')
const bcrypt = require("bcryptjs");
const Admin = require('../models/admin.model')
const generarJWT = require('../helpers/generar-jwt')

const authLogin = async(req=request, res=response) => {
  const {mail, pass} = req.body
  const correctPass = await bcrypt.compare(pass, req.admin.pass);

  if(!correctPass) return res.status(401).json({
    msg: "La contraseña es incorrecta",
    error: true
  })

  const token = await generarJWT(req.admin.uid)
  res.json({
    msg: "Autenticacion exitosa!",
    error: false,
    token,
    admin: req.admin
  })
}

const authResgister = async (req=request, res=response) => {
  const {mail, pass, pass2, username} = req.body

  if(pass !== pass2) return res.status(400).json({
    msg: 'La contraseña y la confirmacion no son iguales',
    error: true
  })

  const passBcrypt = await bcrypt.hash(pass, 10);

  const data = {
    mail,
    pass: passBcrypt,
    username
  }

  const newAdmin = await new Admin(data)
  await newAdmin.save()

  res.status(201).json(newAdmin)
}

const authGetList = async(req, res) => {
  const options = {status: true}
  const [total, admins] = await Promise.all([
    Admin.countDocuments(options),
    Admin.find(options)
  ])

  res.json({
    total,
    admins
  })
}

module.exports = {
  authLogin,
  authResgister,
  authGetList
}
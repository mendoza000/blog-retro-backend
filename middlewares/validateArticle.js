const { request, response } = require("express");
const Article = require('../models/article.model')

const validateTitle = async (req=request, res=response, next) => {
  const {title} = req.body
  const article = await Article.findOne({title})

  if(article) return res.status(400).json({
    msg: "Ya existe un articulo con ese titulo!",
    error: true
  })

  next()
}

const validateExist = async (req=request, res=response, next) => {
  const {id} = req.params
  const article = await Article.findById(id)

  if(!article) return res.status(400).json({
    msg: "No existe un articulo con ese id!",
    error: true
  })

  req.article = article
  next()
}

module.exports = {
  validateTitle,
  validateExist
}
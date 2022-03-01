const { request, response } = require('express');
const moment = require('moment')
const Article = require('../models/article.model')
moment.locale('es')

const getArticles = async (req = request, res = response) => {
  
  const options = {status: true}
  const [total, articles] = await Promise.all([
    Article.countDocuments(options),
    Article.find(options)
  ])

  res.json({
    total,
    articles
  })

}

const createArticle = async (req = request, res = response) => {
  const {title, text} = req.body
  const date = moment().format('MMM DD. YY')

  const data = {
    title,
    text,
    date
  }

  const article = new Article(data)
  await article.save()

  res.status(201).json(article)
}

const getArticleById = async (req=request, res=response) => {
  const {id} = req.params
  const article = await Article.findById(id)
  
  if(article === null) res.status(400).json({
    msg: "No encontramos ningun articulo con ese id",
    error: true
  })
  res.json(article)
}

const deleteArticle = async (req=request, res=response) => {
  const {id} = req.params;
  const data = {
    status: false
  }
  const article = await Article.findByIdAndUpdate(id, data)

  res.json(article)
}

module.exports = {
  getArticles,
  createArticle,
  getArticleById,
  deleteArticle
}
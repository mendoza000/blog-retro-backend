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

module.exports = {
  getArticles,
  createArticle
}
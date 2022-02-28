const {Router} = require('express');
const {check}  = require('express-validator');
const {
  getArticles,
  createArticle
} = require('../controllers/articles.controller')
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router()

// Llamamos los articulos
router.get('/', getArticles);
// TODO: Create article
router.post('/new', [
  check('title').not().isEmpty(),
  check('text').not().isEmpty(),
  validarCampos
], createArticle)

// TODO: Get a article specific
// TODO: Delete article
// TODO: Update article

module.exports = router


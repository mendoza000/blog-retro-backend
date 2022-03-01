const {Router} = require('express');
const {check}  = require('express-validator');
const {
  getArticles,
  createArticle,
  getArticleById,
  deleteArticle
} = require('../controllers/articles.controller')
const {
  validateTitle,
  validateExist
} = require('../middlewares/validateArticle')
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router()

// Llamamos los articulos
router.get('/', getArticles);

// Create article
router.post('/new', [
  check('title').not().isEmpty(),
  check('text').not().isEmpty(),
  validateTitle,
  validarCampos
], createArticle)

// Get a article specific
router.get('/:id', [
  check('id').not().isEmpty(),
  check('id').isMongoId(),
  validateExist,
  validarCampos
], getArticleById)

// Delete article
router.delete('/:id', [
  check('id').not().isEmpty(),
  check('id').isMongoId(),
  validateExist,
  validarCampos
], deleteArticle)

// TODO: Update article
router.put('/:id', [
  check('id').not().isEmpty(),
  check('id').isMongoId(),
  validateExist,
  validarCampos
])

module.exports = router


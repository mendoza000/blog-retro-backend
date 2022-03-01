const {Router} = require('express');
const {check}  = require('express-validator');
const {
  getArticles,
  createArticle,
  getArticleById,
  deleteArticle,
  updateArticle
} = require('../controllers/articles.controller')
const {
  validateTitle,
  validateExist
} = require('../middlewares/validateArticle')
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt')

const router = Router()

// Llamamos los articulos
router.get('/', getArticles);

// Create article
router.post('/new', [
  check('title').not().isEmpty(),
  check('text').not().isEmpty(),
  check('username').not().isEmpty(),
  validarJWT,
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
  validarJWT,
  validateExist,
  validarCampos
], deleteArticle)

// Update article
router.put('/:id', [
  check('id').not().isEmpty(),
  check('id').isMongoId(),
  validarJWT,
  validateExist,
  validarCampos
], updateArticle)

module.exports = router


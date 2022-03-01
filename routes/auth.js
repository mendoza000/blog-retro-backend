const {Router} = require('express');
const {check}  = require('express-validator');
const {
  authLogin,
  authResgister,
  authGetList
} = require('../controllers/auth.controller')
const {
  validateMailExist,
  validateMailNoExist
} = require('../middlewares/validateUser')
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
  check('mail').not().isEmpty(),
  check('pass').not().isEmpty(),
  validateMailExist,
  validarCampos
], authLogin)

router.post('/register', [
  check('mail').not().isEmpty(),
  check('mail').isEmail(),
  check('pass').not().isEmpty(),
  check('pass2').not().isEmpty(),
  validateMailNoExist,
  validarCampos
], authResgister)

router.get('/list', authGetList)

module.exports = router
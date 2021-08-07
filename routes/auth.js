const { Router } = require('express');
const { check } = require('express-validator');

const {authLogin, googleSingin} = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();


router.post('/login',[
    
    check('mail', 'El correo es obligatorio!').isEmail(),
    check('pass', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos

] ,authLogin );

router.post('/google',[
    
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),
    validarCampos

] ,googleSingin );

module.exports = router
const { Router } =  require("express")
const { usersGet, 
	    usersPut, 
	    usersDelete, 
	    usersPost
	  } = require('../controllers/users');
const router = Router()


router.get('/', usersGet)

router.put('/', usersPut)

router.delete('/', usersDelete)

router.post('/', usersPost)



module.exports = router
const { Signup, Login } = require('../controllers/Authcontrollers')
const router = require('express').Router()
const {userVerification} = require("../middlewares/Authmiddleware");

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/user',userVerification)


module.exports = router
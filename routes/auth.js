/*
    path: api/login

*/


const { Router } = require('express');
const { createUser, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


router.post('/new', [
    //middlewares
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required with 6 characters minimum').isLength({min: 6}).not().isEmpty(),
    validateFields
] ,createUser);


router.post('/', [
    //middlewares
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required with 6 characters minimum').isLength({min: 6}).not().isEmpty(),
    validateFields
] ,login);

router.get('/renew', validateJWT, renewToken);



module.exports = router;
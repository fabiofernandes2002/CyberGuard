const express = require('express');
const router = express.Router();
const Controller = require('../controllers/users.controller.js')
const { validationResult, body } = require('express-validator')

// register
router.post('/register', [
    body('username').isLength({ min: 3 }).withMessage('O username deve ter pelo menos 3 caracteres'),
    body('email').isEmail().withMessage('O email deve ser válido'),
    body('password').isLength({ min: 6 }).withMessage('A password deve ter pelo menos 6 caracteres'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('A password e a confirmPassword devem ser iguais')
        }
        return true
    }
    ),
    body('userType').isIn(['normal', 'empresarial', 'professional']).withMessage('O userType deve ser normal, empresarial ou professional'),
    body('companyName').optional().isLength({ min: 3 }).withMessage('O companyName deve ter pelo menos 3 caracteres'),
    body('isOwner').optional().isBoolean().withMessage('O isOwner deve ser true ou false'),
    body('company').optional().isMongoId().withMessage('O company deve ser um id de empresa válido'),
], 
(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    Controller.register(req, res)
})

// login
router.post('/login', [
    body('email').isEmail().withMessage('O email deve ser válido'),
    body('password').isLength({ min: 6 }).withMessage('A password deve ter pelo menos 6 caracteres')
], Controller.login)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'Users: what???' })
})

module.exports = router;
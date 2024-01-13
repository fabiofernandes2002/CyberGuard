const express = require('express');
const router = express.Router();
const Controller = require('../controllers/users.controller.js');
const utilities = require('../utilities/utilities.js');
const { validationResult, body } = require('express-validator');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// register
router.post(
  '/register',
  [
    body('username')
      .isLength({ min: 3 })
      .withMessage('O username deve ter pelo menos 3 caracteres'),
    body('email').isEmail().withMessage('O email deve ser válido'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('A password deve ter pelo menos 6 caracteres'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('A password e a confirmPassword devem ser iguais');
      }
      return true;
    }),
    body('userType')
      .isIn(['normal', 'empresarial', 'professional', 'admin'])
      .withMessage('O userType deve ser normal, empresarial ou professional'),
    body('companyName')
      .if((value, { req }) => req.body.userType === 'empresarial' && req.body.isOwner === true)
      .isLength({ min: 3 })
      .withMessage('O companyName deve ter pelo menos 3 caracteres'),
    body('company')
      .if((value, { req }) => req.body.userType === 'empresarial' && req.body.isOwner === false)
      .isLength({ min: 3 })
      .withMessage('O company deve ser um nome de empresa válido'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Controller.register(req, res);
  }
);

// login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('O email deve ser válido'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('A password deve ter pelo menos 6 caracteres'),
  ],
  Controller.login
);

// getAllUsers (admin)
router.route('/getAllUsers').get(utilities.validateToken, Controller.getAllUsers);

// getUserById (admin)
router.route('/getUserById/:id').get(utilities.validateToken, Controller.getUserById);

// editUserById
<<<<<<< HEAD
router.route('/editUserById/:id')
    .put(utilities.validateToken, upload.single('image'), Controller.editUserById)
=======
router.route('/editUserById/:id').put(utilities.validateToken, Controller.editUserById);
>>>>>>> bcbbb38a0b6d9fba08f350540f278c3bc9b600d9

// deleteUserById
router.route('/deleteUserById/:id').delete(utilities.validateToken, Controller.deleteUserById);

// getAllUsersByCompanyId
router
  .route('/getAllUsersByCompanyId/:id')
  .get(utilities.validateToken, Controller.getAllUsersByCompanyId);

// submitSurvey
router.route('/submitSurvey').post(utilities.validateToken, Controller.submitSurvey);

router.all('*', function (req, res) {
  res.status(404).json({ message: 'Users: what???' });
});

module.exports = router;

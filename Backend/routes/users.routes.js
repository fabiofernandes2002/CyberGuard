const express = require('express');
const router = express.Router();
const Controller = require('../controllers/users.controller.js');
const utilities = require('../utilities/utilities.js');
const { validationResult, body } = require('express-validator');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações de usuários
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password, confirmPassword, userType]
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de utilizador
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do utilizador
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Senha
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 description: Confirmação de password
 *               userType:
 *                 type: string
 *                 enum: [normal, empresarial, professional, admin]
 *                 description: Tipo de utilizador
 *               companyName:
 *                 type: string
 *                 description: Nome da empresa (para utilizadores empresariais)
 *               company:
 *                 type: string
 *                 description: Empresa associada (para utilizadores não proprietários de empresa)
 *     responses:
 *       200:
 *         description: Utilizador registrado com sucesso
 *       400:
 *         description: Erro na requisição ou loggedUserId não existe
 *      403:
 *        description: Acesso negado ao utilizador
 *    500:
 *     description: Algo correu mal, tente novamente mais tarde.
 */
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

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: login de um utilizador
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do utilizador
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password do utilizador
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Erro na requisição ou loggedUserId não existe
 *     403:
 *      description: Acesso negado ao utilizador
 *   500:
 *   description: Algo correu mal, tente novamente mais tarde.
 */
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

/**
 * @swagger
 * /users/getAllUsers:
 *   get:
 *     summary: Obtém todos os utilizadores (admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os utilizadores
 *       403:
 *         description: Acesso negado ao utilizador
 *      500:
 *      description: Algo correu mal, tente novamente mais tarde.
 */
router.get('/getAllUsers', utilities.validateToken, Controller.getAllUsers);

/**
 * @swagger
 * /users/editUserById/{id}:
 *   put:
 *     summary: Editar informações de um utilizador específico pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do utilizador a ser editado
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome do utilizador atualizado
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do utilizador atualizado
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Nova password do utilizador
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 description: Confirmação da nova password
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagem de perfil do utilizador atualizada
 *     responses:
 *       200:
 *         description: Utilizador editado com sucesso
 *       400:
 *         description: Erro na requisição ou loggedUserId não existe
 *       403:
 *         description: Acesso negado ao utilizador
 *       500:
 *         description: Algo correu mal, tente novamente mais tarde.
 */

router.put('/editUserById/:id', utilities.validateToken, upload.single('image'), Controller.editUserById);

/**
 * @swagger
 * /users/deleteUserById/{id}:
 *   delete:
 *     summary: Eliminar um utilzador específico pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do utilizador a ser eliminado
 *     responses:
 *       200:
 *         description: Utilizador eliminado com sucesso
 *       400:
 *         description: Erro na requisição ou loggedUserId não existe
 *       403:
 *         description: Acesso negado ao utilizador
 *     500:
 *    description: Algo correu mal, tente novamente mais tarde.
 */
router.delete('/deleteUserById/:id', utilities.validateToken, Controller.deleteUserById);

/**
 * @swagger
 * /users/getAllUsersByCompanyId/{id}:
 *   get:
 *     summary: Obtém todos os utilizadores associados a uma empresa específica pelo ID da empresa
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da empresa
 *     responses:
 *       200:
 *         description: Lista de utilizadores da empresa
 *       400:
 *         description: Erro na requisição ou loggedUserId não existe
 *       403:
 *         description: Acesso negado ao utilizador
 *    500:
 *    description: Algo correu mal, tente novamente mais tarde.
 */
router.get('/getAllUsersByCompanyId/:id', utilities.validateToken, Controller.getAllUsersByCompanyId);


/**
 * @swagger
 * /users/submitSurvey:
 *   post:
 *     summary: Submete a resposta do questionário de um utilizador
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionIndex:
 *                       type: integer
 *                      description: Índice da pergunta a ser respondida
 *                   answer:
 *                    type: string
 *                   description: Respostas fornecida pelo utilizador
  *     responses:
  *      200:
  *       description: Respostas do questionário submetidas com sucesso
  *     400:
  *      description: Erro na requisição ou loggedUserId não existe
  *    403:
  *    description: Acesso negado ao utilizador
  *  500:
  *  description: Algo correu mal, tente novamente mais tarde.
  */
router.post('/submitSurvey', utilities.validateToken, Controller.submitSurvey);

router.all('*', function (req, res) {
  res.status(404).json({ message: 'Users: what???' });
});

module.exports = router;
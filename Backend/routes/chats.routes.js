const express = require('express');
const router = express.Router();
const Controller = require('../controllers/chats.controller.js');
const utilities = require('../utilities/utilities.js');

/**
 * @swagger
 * tags:
 *   name: Chats
 *   description: Operações relacionadas aos chats
 */

/**
 * @swagger
 * /chats/createChat:
 *   post:
 *     summary: Cria um novo chat
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Conteúdo da primeira mensagem do chat
 *     responses:
 *       201:
 *         description: Chat criado com sucesso
 *       400:
 *         description: Erro na requisição ou loggedUserId não existe
 *       403:
 *         description: Acesso negado ao utilizador
 *     500:
 *      description: Algo correu mal, tente novamente mais tarde.
 */
router.route('/createChat').post(utilities.validateToken, Controller.createChat);

/**
 * @swagger
 * /chats/addMessageToChat/{id}:
 *   put:
 *     summary: Adiciona uma mensagem a um chat existente
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Conteúdo da mensagem a ser adicionada ao chat
 *     responses:
 *       201:
 *         description: Mensagem adicionada com sucesso
 *       400:
 *         description: Erro na requisição ou loggedUserId não existe
 *       403:
 *         description: Acesso negado ao utilizador
 *      500:
 *       description: Algo correu mal, tente novamente mais tarde.
 */
router.route('/addMessageToChat/:id').put(utilities.validateToken, Controller.addMessageToChat);

/**
 * @swagger
 * /chats/getAllChats:
 *   get:
 *     summary: Obtém todos os chats
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os chats
 *       500:
 *         description: Algo correu mal, tente novamente mais tarde.
 */
router.route('/getAllChats').get(utilities.validateToken, Controller.getAllChats);

router.all('*', function (req, res) {
  res.status(404).json({ message: 'CHATS: what???' });
});

module.exports = router;
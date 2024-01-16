const express = require('express');
const router = express.Router();
const Controller = require('../controllers/chats.controller.js');
const utilities = require('../utilities/utilities.js');
const { validationResult, body } = require('express-validator');

// createChat
router.route('/createChat').post(utilities.validateToken, Controller.createChat);

// addMessageToChat
router.route('/addMessageToChat/:id').put(utilities.validateToken, Controller.addMessageToChat);

// getAllChats
router.route('/getAllChats').get(utilities.validateToken, Controller.getAllChats);

router.all('*', function (req, res) {
  res.status(404).json({ message: 'CHATS: what???' });
});

module.exports = router;

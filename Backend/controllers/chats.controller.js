const users = require('../models/users.model');
const chats = require('../models/chats.model');
const utilities = require('../utilities/utilities');

// Criar um novo chat
exports.createChat = async function (req, res) {
  try {
    if (!req.loggedUserId) {
      return res.status(403).json({
        success: false,
        msg: 'Você deve estar autenticado para realizar esta solicitação!',
      });
    }
    const { userId, content } = req.body;
    const loggedUserId = req.loggedUserId;

    // Verificar se o userId existe
    const userExists = await users.findById(userId);
    if (!userExists) {
      return res.status(400).json({ message: 'O userId não existe.' });
    }

    // Verificar se o content é uma string
    if (typeof content !== 'string') {
      return res.status(400).json({ message: 'O content não é uma string.' });
    }

    // Criar um novo chat
    const chat = new chats({
      participants: [loggedUserId],
      messages: [{ userId: loggedUserId, content, time: Date.now() }],
    });

    await chat.save();

    // Adicionar o chatId ao model de utilizadores
    const user = await users.findById(loggedUserId);
    user.chatId.push(chat._id);
    await user.save();

    res.status(201).json({
      success: true,
      msg: 'Chat criado com sucesso!',
      chat: chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

// Adicionar uma mensagem a um chat existente
exports.addMessageToChat = async function (req, res) {
  try {
    if (!req.loggedUserId) {
      return res.status(403).json({
        success: false,
        msg: 'Você deve estar autenticado para realizar esta solicitação!',
      });
    }
    const { chatId, content } = req.body;
    const loggedUserId = req.loggedUserId;

    // Verificar se o chatId foi fornecido
    if (!chatId) {
      return res
        .status(400)
        .json({ message: 'O chatId deve ser fornecido para adicionar uma mensagem.' });
    }

    // Verificar se o chatId existe
    const chat = await chats.findById(chatId);
    if (!chat) {
      return res.status(400).json({ message: 'O chatId não existe.' });
    }

    // Verificar se o usuário já está na lista de participantes
    const isParticipant = chat.participants.includes(loggedUserId);

    // Adicionar a nova mensagem ao chat
    chat.messages.push({ userId: loggedUserId, content, time: Date.now() });

    // Adicionar o novo participante ao chat, se ainda não estiver na lista
    if (!isParticipant) {
      chat.participants.push(loggedUserId);
    }

    await chat.save();

    // Adicionar o chatId ao model de utilizadores se o utilizador não estiver no chat
    const user = await users.findById(loggedUserId);
    if (!user.chatId.includes(chatId)) {
      user.chatId.push(chatId);
      await user.save();
    }

    res.status(201).json({
      success: true,
      msg: 'Mensagem adicionada ao chat com sucesso!',
      chat: chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

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

    const { content } = req.body;
    const loggedUserId = req.loggedUserId;

    // Verificar se o loggedUserId existe
    const userExists = await users.findById(loggedUserId);
    if (!userExists) {
      return res.status(400).json({ message: 'O loggedUserId não existe.' });
    }

    // Criar um novo chat
    const chat = new chats({
      participants: [loggedUserId],
      messages: [
        { userId: loggedUserId, username: userExists.username, content, time: Date.now() },
      ],
    });

    await chat.save();

    // Adicionar o chatId ao modelo de usuários
    userExists.chatId.push(chat._id);
    await userExists.save();

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

    // Buscar o usuário pelo loggedUserId
    const user = await users.findById(loggedUserId);
    if (!user) {
      return res.status(400).json({ message: 'O usuário não existe.' });
    }

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
    chat.messages.push({
      userId: loggedUserId,
      username: user.username,
      content,
      time: Date.now(),
    });

    // Adicionar o novo participante ao chat, se ainda não estiver na lista
    if (!isParticipant) {
      chat.participants.push(loggedUserId);
    }

    await chat.save();

    // Adicionar o chatId ao model de utilizadores se o utilizador não estiver no chat
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

// getAllChats - Obter todos os chats de todo o sistema
exports.getAllChats = async function (req, res) {
  try {
    const chatsList = await chats.find();
    res.status(200).json({
      success: true,
      msg: 'Lista de chats obtida com sucesso!',
      chats: chatsList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

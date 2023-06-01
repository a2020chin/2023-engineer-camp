const express = require('express');

const {
  OPENAI_CONTENT,
} = require('../configs');

const chatAI = require('../services/openai');

const router = express.Router();

router
  .get('/', async (req, res) => {
    res.render('index', {
      messages: req.session.messages || [],
    });
  })
  .post('/', async (req, res) => {
    const { message } = req.body;
    const messages = req.session.messages || [];
    const meMessage = {
      sender: 'me',
      description: message,
    };
    messages.push(meMessage);

    const answer = await chatAI({
      content: OPENAI_CONTENT,
      message,
    });

    const chatMessage = {
      sender: 'chatGPT',
      description: answer,
    };
    messages.push(chatMessage);

    req.session.messages = messages;

    res.redirect('/');
  });

module.exports = router;

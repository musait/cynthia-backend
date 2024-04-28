const express = require('express');
const router = express.Router();
const { sendToDialogflow } = require('../controllers/dialogflowClient');

router.post('/message', async (req, res) => {
    const { message } = req.body;
    const response = await sendToDialogflow(message);
    res.send({ response });
});

router.get('/', (req, res) => {
  res.send('Bonjour, je suis Cynthia, votre assistant!');
});

module.exports = router;
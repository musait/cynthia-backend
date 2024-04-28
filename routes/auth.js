const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Route pour démarrer le processus d'authentification
router.get('/auth/google', (req, res) => {
  const url = authController.getAuthUrl();
  res.redirect(url);
});

// Route pour le callback après l'authentification
router.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const tokens = await authController.getAccessToken(code);
    console.log(tokens)
    // Ici, vous pouvez diriger les utilisateurs où vous le souhaitez, avec les tokens stockés
    res.redirect('http://localhost:3000');
  } catch (error) {
    console.error('Error exchanging auth code for tokens', error);
    res.redirect('/error-page');
  }
});

module.exports = router;
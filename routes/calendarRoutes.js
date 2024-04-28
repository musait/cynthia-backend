const express = require('express');
const calendarController = require('../controllers/calendar');
const authController = require('../controllers/auth');
const router = express.Router();

router.get('/events', (req, res) => {
  // Ici vous devrez récupérer l'objet client OAuth à partir de votre système de stockage
  const oauth2Client = authController.getOauth2Client();
  calendarController.listEvents(oauth2Client, (err, events) => {
    if (err) {
      console.error('Error fetching events', err);
      return res.status(500).json({ error: err.toString() });
    }
    res.json({ events });
  });
});

module.exports = router;
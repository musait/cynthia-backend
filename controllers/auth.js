const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// Vous devez définir ces variables d'environnement dans votre système ou fichier .env
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = 'http://localhost:5000/auth/google/callback';

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

// En mémoire (devrait être remplacé par une base de données pour la production)
let ACCESS_TOKEN = null;

function getAuthUrl() {
  const scopes = [
    'https://www.googleapis.com/auth/calendar'
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });

  return url;
}

let _tokens = null;
async function getAccessToken(code) {
  const { tokens } = await oauth2Client.getToken(code);
  _tokens = tokens;
  oauth2Client.setCredentials(tokens);
  return tokens;
}

function saveAccessToken() {
  return _tokens; // Renvoie le token stocké en mémoire
}

function getOauth2Client() {
  return oauth2Client;
}

module.exports = {
  getAuthUrl,
  getAccessToken,
  saveAccessToken,
  getOauth2Client
};

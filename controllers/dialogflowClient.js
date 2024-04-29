const dialogflow = require('dialogflow');
const projectId = process.env.DIALOGFLOW_PROJECT_ID
const credentials = {
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
  };
const sessionClient = new dialogflow.SessionsClient({projectId, credentials});

const sessionId = process.env.DIALOGFLOW_SESSION_ID; // Généralement un identifiant unique pour chaque utilisateur
const sessionPath = sessionClient.sessionPath(process.env.DIALOGFLOW_PROJECT_ID, sessionId);

// Fonction pour envoyer une requête texte à Dialogflow
async function sendToDialogflow(text) {
    console.log('Envoi de la requête à Dialogflow:', { textInput: text });
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: text,
                languageCode: 'fr-FR', // ou autre selon votre agent
            },
        },
    };

    const responses = await sessionClient.detectIntent(request)
    
    return responses[0].queryResult.fulfillmentText; // Retourne la réponse de Dialogflow
}

module.exports = { sendToDialogflow };
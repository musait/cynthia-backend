const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "cynthia-cgvb-62a75780f7da.json"
});

const sessionId = '107044742146902625315'; // Généralement un identifiant unique pour chaque utilisateur
const sessionPath = sessionClient.sessionPath('cynthia-cgvb', sessionId);

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
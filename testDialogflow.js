const { sendToDialogflow } = require('./controllers/dialogflowClient');

async function test() {
    try {
        const response = await sendToDialogflow('Bonjour');
        console.log('Réponse de Dialogflow:', response);
    } catch (error) {
        console.error('Erreur lors de la connexion à Dialogflow:', error);
    }
}

test();
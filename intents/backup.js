// The following code configures a handler that Alexa invokes when the user asks to start backups.
const StartBackupIntentHandler = {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartBackupIntent';
    },
    handle(handlerInput) {
      const speechText = 'Starting your backups!';
      return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Starting your backups!', speechText)
      .getResponse();
    }
};

module.exports = {StartBackupIntentHandler};
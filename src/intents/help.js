// The following code configures a handler that Alexa invokes when the skill 
// receives the built-in intent AMAZON.HelpIntent. For details about how user 
// utterances trigger built-in intents, see Standard Built-in Intents.
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can ask me to start your backups!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('You can ask me to start your backups!', speechText)
      .getResponse();
  }
};

module.exports = {HelpIntentHandler};
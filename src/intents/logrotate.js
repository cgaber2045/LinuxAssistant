// The following code configures a handler that Alexa invokes when the user asks to rotate logs.
const LogRotateIntentHandler = {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LogRotateIntent';
    },
    handle(handlerInput) {
      const speechText = 'Rotating logs!';
      return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Rotating logs!', speechText)
      .getResponse();
    }
};
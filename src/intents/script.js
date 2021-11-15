// The following code configures a handler that Alexa invokes when the user asks to run a script.
const RunScriptIntentHandler = {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RunScriptIntent';
    },
    handle(handlerInput) {
      const slots = handlerInput.requestEnvelope.request.intent.slots;
      const script = slots['scriptAnswer'].value;
  
      const speechText = `Running script: ${script}.`
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Running your script...', speechText)
        .getResponse();
    },
  };
// When the user invokes your skill without a specific intent, 
// Alexa sends your skill a LaunchRequest. The following code configures a 
// handler that Alexa invokes when your skill receives a LaunchRequest.
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to your LinuxAssistant skill. Ask me to start your backups!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Welcome to your LinuxAssistant skill. Ask me to start your backups!', speechText)
      .getResponse();
  }
};

module.exports = {LaunchRequestHandler};
// Although your skill can't return a response after receiving a SessionEndedRequest, 
// you can provide a handler that contains clean-up logic. The following example 
// shows how to create a handler for a SessionEndedRequest.
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    // Any clean-up logic goes here.
    return handlerInput.responseBuilder.getResponse();
  }
};

module.exports = {SessionEndedRequestHandler};
// You can put your error-handling logic in an error handler. 
// For example, you can add logic that handles unhandled requests, 
// API service timeouts, and so on. The following code adds an error handler to your 
// skill to ensure that your skill returns a meaningful message for all errors.
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I don\'t understand your command. Please say it again.')
      .reprompt('Sorry, I don\'t understand your command. Please say it again.')
      .getResponse();
  }
};


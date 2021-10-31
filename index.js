// https://developer.amazon.com/en-US/docs/alexa/alexa-skills-kit-sdk-for-nodejs/develop-your-first-skill.html
const Alexa = require('ask-sdk-core');

// When the user invokes your skill without a specific intent, 
// Alexa sends your skill a LaunchRequest. The following code configures a 
// handler that Alexa invokes when your skill receives a LaunchRequest.
const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
      const speechText = 'Welcome to your SDK weather skill. Ask me the weather!';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('Welcome to your SDK weather skill. Ask me the weather!', speechText)
        .getResponse();
    }
};

// The following code configures a handler that Alexa invokes when the user asks for the weather.
const AskWeatherIntentHandler = {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AskWeatherIntent';
    },
    handle(handlerInput) {
      const speechText = 'The weather today is sunny.';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('The weather today is sunny.', speechText)
        .getResponse();
    }
  };

  // The following code configures a handler that Alexa invokes when the skill 
  // receives the built-in intent AMAZON.HelpIntent. For details about how user 
  // utterances trigger built-in intents, see Standard Built-in Intents.
  const HelpIntentHandler = {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      const speechText = 'You can ask me the weather!';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('You can ask me the weather!', speechText)
        .getResponse();
    }
};

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

  // The Lambda handler is the entry point for your AWS Lambda function. 
  // The following code creates a Lambda handler function to route all inbound request to your skill.
  let skill;

  exports.handler = async function (event, context) {
    console.log(`REQUEST++++${JSON.stringify(event)}`);
    if (!skill) {
      skill = Alexa.SkillBuilders.custom()
        .addRequestHandlers(
          LaunchRequestHandler,
          AskWeatherIntentHandler,
          HelpIntentHandler,
          CancelAndStopIntentHandler,
          SessionEndedRequestHandler,
        )
        .addErrorHandlers(ErrorHandler)
        .create();
    }
  
    const response = await skill.invoke(event, context);
    console.log(`RESPONSE++++${JSON.stringify(response)}`);
  
    return response;
  };
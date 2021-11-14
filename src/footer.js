// The Lambda handler is the entry point for your AWS Lambda function. 
// The following code creates a Lambda handler function to route all inbound request to your skill.
let skill;

exports.handler = async function (event, context) {
  console.log(`+REQUEST:${JSON.stringify(event)}`);
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        // TODO: Add your intent handlers here
        StartBackupIntentHandler,
        HelpIntentHandler,
        SessionEndedRequestHandler,
      )
      .addErrorHandlers(ErrorHandler)
      .create();
  }

  // TODO: Declare all commands and their intent names here
  if (event.request.intent && event.request.intent.name === "StartBackupIntent") await sendCommand("backup");
  
  // End command declaration

  // Response used for debugging
  const response = await skill.invoke(event, context);
  console.log(`+RESPONSE:${JSON.stringify(response)}`);
  return response;
};

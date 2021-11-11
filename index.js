// https://developer.amazon.com/en-US/docs/alexa/alexa-skills-kit-sdk-for-nodejs/develop-your-first-skill.html
const Alexa = require('ask-sdk-core');
var AWS = require('aws-sdk');
require('dotenv').config();
AWS.config.update({region: 'us-east-1'});

// Loader to load in all intents
var normalizedPath = require("path").join(__dirname, "intents");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./intents/" + file);
});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const queue_url = process.env.QUEUE_URL;

// Used to send commands to the SQS server.
const sendCommand = async command => {
  const params = {MessageBody: command, QueueUrl: queue_url};
  // Creating the message to send to the SQS server!
  const request = sqs.sendMessage(params);
  const result = await request.promise();
  if(result) console.log("Message queued to SQS successfully : ", result.MessageId);
  else console.log("Message queued failed");
};

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
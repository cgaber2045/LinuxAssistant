var AWS = require('aws-sdk');
require('dotenv').config();
const { exec } = require("child_process");
AWS.config.update({region: 'us-east-1'});
global.config = require('./config');

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const queue_url = process.env.QUEUE_URL;

// Check for new commands every second.
setInterval(() => {
  getNextMessage();
}, 1000);

// Get the next message in the SQS queue.
function getNextMessage() {
  var params = {
    AttributeNames: [
       "SentTimestamp"
    ],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: ["All"],
    QueueUrl: queue_url,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0
   };   

  sqs.receiveMessage(params, function(err, data) {
    if (err) console.log("Receive Error", err);
    else if (data.Messages) {
      processMessage(data.Messages[0].Body);
      deleteMessage(data.Messages[0].ReceiptHandle);
    }
  });

}

// Delete message from SQS Queue.
function deleteMessage(reciept) {
  var deleteParams = {
    QueueUrl: queue_url,
    ReceiptHandle: reciept
  };
  sqs.deleteMessage(deleteParams, function(err, data) {
    if (err) console.log("Delete Error", err);
  });
}

// Process message from SQS Queue.
function processMessage(message) {
  switch (message) {

    case "backup":
      // Run backups
      console.log("Message Recieved: backup");
      console.log(`Backing up ${config.backup} to ${config.backuplocation}`);
      exec(`cp -r ${config.backup} ${config.backuplocation}`, (error, stdout, stderr) => {
        if (error) console.log(`error: ${error.message}`);
        else if (stderr)  console.log(`stderr: ${stderr}`);
        else console.log(`stdout: ${stdout}`);
      });
      break;
    
    case "logrotate":
      // Rotate logs
      console.log("Message Recieved: logrotate");
      exec(`logrotate /etc/logrotate.d`, (error, stdout, stderr) => {
        if (error) console.log(`error: ${error.message}`);
        else if (stderr)  console.log(`stderr: ${stderr}`);
        else console.log(`stdout: ${stdout}`);
      });
      break;

    default:
      console.log("Message not defined! Recieved: " + message);
      break;
  }

  if (message.includes('script ')) {
    const script = message.split(" ")[1];
    console.log(`Message Recieved: script ${script}`);
    exec(`sh ./scripts/${script}.sh `, (error, stdout, stderr) => {
      if (error) console.log(`error: ${error.message}`);
      else if (stderr)  console.log(`stderr: ${stderr}`);
      else console.log(`stdout: ${stdout}`);
    });
  }

}
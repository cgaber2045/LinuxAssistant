# LinuxAssistant Alexa Skill
> LinuxAssistant is an Alexa Skill used to help System Administrators manage their systems through Alexa. See http://ask-sdk-node-typedoc.s3-website-us-east-1.amazonaws.com/index.html for the api.

## Requirements

1. Node.js v14.18.0 or newer

## 🚀 Getting Started

```sh
git clone https://github.com/cgaber2045/LinuxAssistant.git
cd LinuxAssistant
npm install
```

Set up a .env file with the following variables from SQS: ```QUEUE_URL```, ```AWS_ACCESS_KEY_ID```, ```AWS_SECRET_ACCESS_KEY```

## 💡 Building

1. After creating intents, create a prod folder in the main directory.
2. Run ```make``` to build the production build.
3. The built files should be located under /prod/.

## 🤝 Contributing
1. [Fork the repository](https://github.com/cgaber2045/LinuxAssistant/fork)
2. Clone your fork: `git clone https://github.com/your-username/LinuxAssistant.git`
3. Create your feature branch: `git checkout -b my-new-feature`
4. Stage changes `git add .`
5. Commit your changes: `git commit`
6. Push to the branch: `git push origin my-new-feature`
7. Submit a pull request
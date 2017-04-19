# Hoops Firebase Backend
https://console.firebase.google.com/project/hoops-us-149010/overview

## Getting Started
```sh
npm install -g firebase-tools
```

## Logs
```sh
firebase functions:log
```

## Deployment
```sh
firebase deploy --only functions
```

## Firebase Config
```sh
functions:config:get
```
### Development
```json
{
  "stripe": {
    "token": "sk_test_WTTMiUO7uSe2QSEdscdfkHYK",
    "currency": "GBP"
  },
  "slack": {
    "channel": "#hoops-log",
    "username": "Firebase Dev",
    "webhook_url": "https://hooks.slack.com/services/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"
  }
}
```

## References & Resources
* https://firebase.google.com/docs/functions/get-started
* https://github.com/firebase/functions-samples/tree/master/stripe



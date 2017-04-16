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
firebase functions:config:get
```

## Firebase Set Config Item
```sh
firebase functions:config:set someservice.key="THE API KEY" someservice.id="THE CLIENT ID"
```

### Development
```json
"stripe": {
  "currency": "GBP",
  "token": "sk_test_WTTMiUO7uSe2QSEdscdfkHYK"
}
```

## References & Resources
* https://firebase.google.com/docs/functions/get-started
* https://github.com/firebase/functions-samples/tree/master/stripe

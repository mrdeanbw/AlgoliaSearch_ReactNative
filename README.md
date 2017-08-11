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
## Package install
```sh
cd functions
npm install
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

firebase functions:config:set algolia.app_id="THE API KEY" 
firebase functions:config:set algolia.api_key="THE CLIENT ID" 
```
## Firebase functions
initEventsIndex :  create indices when restore the all events from firebase
createEventIndex : create index when new event is created
reindexEventIndex : backup indices 
removeEventIndex : remove index when event is deleted 
updatEventeObject : update index when event is updated 

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

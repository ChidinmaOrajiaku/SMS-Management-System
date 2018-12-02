# SMS-Management-System
This is a system that manages the user's sms

## Features
* Users can create contact
* Users can get all contacts
* Users can get a single contact
* Users can update a contact
* Users can delete a contact
* Users can create a message
* Users can get all messages
* Users can get messages sent by a contact
* Users can get messages received by a contact
* Users can delete a message

## API
### POST A CONTACT (/api/v1/contact)
* name, number
#### Request
```
{
  "name": "Didi",
  "number": "12345678",
}
```
#### Response
```
{
  "message": "Contact has been successfully created",
  "contact": {
      "id": 5,
      "name": "Didi",
      "number": "12345678",
      "updatedAt": "2018-12-01T23:55:47.212Z",
      "createdAt": "2018-12-01T23:55:47.212Z"
  }
}
```

### GET CONTACTS (/api/v1/contact)
#### Response
```
{
  "contact": [
      {
          "id": 1,
          "name": "Chidinma",
          "number": "8056706918",
          "createdAt": "2018-12-01T23:03:33.735Z",
          "updatedAt": "2018-12-01T23:03:33.735Z",
          "sentMessages": [],
          "receivedMessages": [
              {
                  "id": 1,
                  "sender": "Mumsi",
                  "receiver": "Chidinma",
                  "message": "I love you",
                  "status": "sent",
                  "createdAt": "2018-12-01T23:08:37.340Z",
                  "updatedAt": "2018-12-01T23:08:37.340Z",
                  "senderId": 4,
                  "receiverId": 1
              }
          ]
      },
      {
          "id": 4,
          "name": "Mumsi",
          "number": "8036211209",
          "createdAt": "2018-12-01T23:06:22.344Z",
          "updatedAt": "2018-12-01T23:06:22.344Z",
          "sentMessages": [
              {
                  "id": 1,
                  "sender": "Mumsi",
                  "receiver": "Chidinma",
                  "message": "I love you",
                  "status": "sent",
                  "createdAt": "2018-12-01T23:08:37.340Z",
                  "updatedAt": "2018-12-01T23:08:37.340Z",
                  "senderId": 4,
                  "receiverId": 1
              }
          ],
          "receivedMessages": []
      },
      {
          "id": 5,
          "name": "Didi",
          "number": "12345678",
          "createdAt": "2018-12-01T23:55:47.212Z",
          "updatedAt": "2018-12-01T23:57:47.926Z",
          "sentMessages": [],
          "receivedMessages": []
      }
  ]
}
```

### GET A SINGLE CONTACT (/api/v1/contact/:contactId)
* where contactId = 5
#### Response
```
{
  "id": 5,
  "name": "Didi",
  "number": "12345678",
  "createdAt": "2018-12-01T23:55:47.212Z",
  "updatedAt": "2018-12-01T23:57:47.926Z",
  "sentMessages": [],
  "receivedMessages": []
}
```

### UPDATE A CONTACT (/api/v1/contact/:contactId)
* name, number
#### Request
```
  {
    "name": "Didi",
    "number": "456789",
  }
```
#### Response
```
 {
    "message": "Successfully updated",
    "contact": {
        "id": 5,
        "name": "Didi",
        "number": "456789",
        "createdAt": "2018-12-01T23:55:47.212Z",
        "updatedAt": "2018-12-01T23:57:47.926Z"
    }
  }
```

### DELETE A CONTACT (/api/v1/contact/:contactId)
* where contactId = 5
#### Response
```
{
  "message": "Successfully deleted",
  "contact": {
      "id": 5,
      "name": "Didi",
      "number": "456789",
      "createdAt": "2018-12-01T23:55:47.212Z",
      "updatedAt": "2018-12-01T23:57:47.926Z"
  }
}
```

### POST A MESSAGE (/api/v1/message/:senderId/:receiverId)
* sender, receiver, message, status
#### Request
```
{
  "sender": "Chidinma",
  "receiver": "Mumsi",
  "message": "I love you",
}
```

#### Params
senderId = 1
receiverId = 4

#### Response
```
{
  "message": "Message has been successfully sent",
  "messageDetail": {
      "id": 6,
      "sender": "Chidinma",
      "receiver": "Mumsi",
      "message": "I love you",
      "status": "sent",
      "senderId": 1,
      "receiverId": 4,
      "updatedAt": "2018-12-02T00:05:41.095Z",
      "createdAt": "2018-12-02T00:05:41.095Z"
  }
}
```

### GET MESSAGES (/api/v1/message)
#### Response
```
[
    {
        "id": 1,
        "sender": "Mumsi",
        "receiver": "Chidinma",
        "message": "I love you",
        "status": "sent",
        "createdAt": "2018-12-01T23:08:37.340Z",
        "updatedAt": "2018-12-01T23:08:37.340Z",
        "senderId": 4,
        "receiverId": 1
    },
    {
        "id": 6,
        "sender": "Chidinma",
        "receiver": "Mumsi",
        "message": "I love you",
        "status": "sent",
        "createdAt": "2018-12-02T00:05:41.095Z",
        "updatedAt": "2018-12-02T00:05:41.095Z",
        "senderId": 1,
        "receiverId": 4
    }
]
```
### GET MESSAGES SENT BY A CONTACT (/api/v1/message/sent/:senderId)
* where senderId = 4
#### Response
```
[
  {
      "id": 1,
      "sender": "Mumsi",
      "receiver": "Chidinma",
      "message": "I love you",
      "status": "sent",
      "createdAt": "2018-12-01T23:08:37.340Z",
      "updatedAt": "2018-12-01T23:08:37.340Z",
      "senderId": 4,
      "receiverId": 1
  }
]
```

### GET MESSAGES RECEIVED BY A CONTACT (/api/v1/message/received/:receiverId)
* where receiverId = 4
#### Response
```
[
  {
      "id": 6,
      "sender": "Chidinma",
      "receiver": "Mumsi",
      "message": "I love you",
      "status": "sent",
      "createdAt": "2018-12-02T00:05:41.095Z",
      "updatedAt": "2018-12-02T00:05:41.095Z",
      "senderId": 1,
      "receiverId": 4
  }
]
```

### DELETE A MESSAGE (/api/v1/message/:messageId)
* where messageId = 6
#### Response
```
{
  "message": "Successfully deleted",
  "messageDetail": {
      "id": 6,
      "sender": "Chidinma",
      "receiver": "Mumsi",
      "message": "I love you",
      "status": "sent",
      "createdAt": "2018-12-02T00:05:41.095Z",
      "updatedAt": "2018-12-02T00:05:41.095Z",
      "senderId": 1,
      "receiverId": 4
  }
}
```

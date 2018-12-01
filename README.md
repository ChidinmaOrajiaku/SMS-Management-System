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

### GET CONTACTS (/api/v1/contact)

### GET A SINGLE CONTACT (/api/v1/contact/:contactId)

### UPDATE A CONTACT (/api/v1/contact/:contactId)
* name, number

### DELETE A CONTACT (/api/v1/contact/:contactId)

### POST A MESSAGE (/api/v1/message/:senderId/:receiverId)
* sender, receiver, message, status

### GET MESSAGES (/api/v1/message)

### GET MESSAGES SENT BY A CONTACT (/api/v1/message/sent/:senderId)

### GET MESSAGES RECEIVED BY A CONTACT (/api/v1/message/received/:receiverId)

### DELETE A MESSAGE (/api/v1/message/:messageId)

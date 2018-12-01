import ContactController from '../controllers/contact';
import MessageController from '../controllers/message';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the PMS API!',
  }));

  app.post('/api/v1/contact', ContactController.createContact);
  app.get('/api/v1/contact', ContactController.getAllContacts);
  app.get('/api/v1/contact/:contactId', ContactController.getAContact);
  app.put('/api/v1/contact/:contactId', ContactController.updateContact);
  app.delete('/api/v1/contact/:contactId', ContactController.deleteContact);

  app.post('/api/v1/message/:senderId/:receiverId', MessageController.createMessage);
  app.get('/api/v1/message', MessageController.getMessages);
  app.get('/api/v1/message/sent/:senderId', MessageController.messagesSentByAContact);
  app.get('/api/v1/message/received/:receiverId', MessageController.messagesSentToAContact);
  app.delete('/api/v1/message/:messageId', MessageController.deleteMessage);
};

import { Message, Contact } from '../models';

class MessageController {
  /**
   * Create Messages
   * @param {object} req
   * @param {object} res
   */
  static createMessage(req, res) {
    const {
      sender,
      receiver,
      message,
    } = req.body;
    if (isNaN(parseInt(req.params.senderId, 10)) || isNaN(parseInt(req.params.receiverId, 10))) {
      return res.status(400).send({
        message: 'Please use a valid id',
      });
    }
    return Contact
      .findOne({
        where: {
          id: req.params.senderId,
          name: sender,
        },
      })
      .then((contact) => {
        if (!contact) {
          return res.status(404).send({
            message: 'Sender\'s detail not found',
          });
        }
        return Contact
          .findOne({
            where: {
              id: req.params.receiverId,
              name: receiver,
            },
          })
          .then((receiverDetail) => {
            if (!receiverDetail) {
              return res.status(404).send({
                message: 'Receiver\'s contact was not found hence message was not delivered',
              });
            }
            return Message.create({
              sender,
              receiver,
              message,
              status: 'sent',
              senderId: req.params.senderId,
              receiverId: req.params.receiverId,
            })
              .then(messageDetail => res.status(201).send({
                message: 'Message has been successfully sent',
                messageDetail,
              }))
              .catch((error) => {
                const errorMessage = error.errors.map(value => value.message);
                return res.status(400).send({
                  message: 'Message cannot be sent',
                  errorMessage,
                });
              });
          })
          .catch(error => res.status(500).send({
            message: 'An receiver error occured',
            error,
          }));
      })
      .catch(error => res.status(500).send({
        message: 'An error occured',
        error,
      }));
  }

  /**
   * Get all Messages
   * @param {object} req
   * @param {object} res
   */
  static getMessages(req, res) {
    return Message
      .all()
      .then(message => res.status(200).send(message))
      .catch(error => res.status(500).send({
        message: 'An error occured',
        error,
      }));
  }

  /**
   * Get all messages sent by a contact
   * @param {object} req
   * @param {object} res
   */
  static messagesSentByAContact(req, res) {
    if (isNaN(parseInt(req.params.senderId, 10))) {
      return res.status(400).send({
        message: 'Please use a valid id',
      });
    }

    return Contact
      .findById(req.params.senderId)
      .then((contact) => {
        if (!contact) {
          return res.status(404).send({
            message: 'Contact does not exist',
          });
        }
        return Message
          .findAll({
            where: {
              senderId: req.params.senderId,
            },
          })
          .then((message) => {
            if (!message.length) {
              return res.status(404).send({
                message: 'Contact has no message history',
              });
            }
            return res.status(200).send(message);
          });
      });
  }

  /**
   * Get all messages sent to a contact
   * @param {object} req
   * @param {object} res
   */
  static messagesSentToAContact(req, res) {
    if (isNaN(parseInt(req.params.receiverId, 10))) {
      return res.status(400).send({
        message: 'Please use a valid id',
      });
    }

    return Contact
      .findById(req.params.receiverId)
      .then((contact) => {
        if (!contact) {
          return res.status(404).send({
            message: 'Contact does not exist',
          });
        }
        return Message
          .findAll({
            where: {
              receiverId: req.params.receiverId,
            },
          })
          .then((message) => {
            if (!message.length) {
              return res.status(404).send({
                message: 'Contact has no message history',
              });
            }
            return res.status(200).send(message);
          });
      });
  }

  /**
   * Delete message
   * @param {object} req
   * @param {object} res
   */
  static deleteMessage(req, res) {
    if (isNaN(parseInt(req.params.messageId, 10))) {
      return res.status(400).send({
        message: 'Please use a valid id',
      });
    }

    return Message
      .findById(req.params.messageId)
      .then((messageDetail) => {
        if (!messageDetail) {
          return res.status(404).send({
            message: 'Message does not exist',
          });
        }
        return messageDetail.destroy()
          .then(() => res.status(200).send({
            message: 'Successfully deleted',
            messageDetail,
          }))
          .catch(error => res.status(400).send({
            message: 'Message could not be deleted',
            error,
          }));
      })
      .catch(error => res.status(500).send({
        message: 'An error occured',
        error,
      }));
  }
}

export default MessageController;

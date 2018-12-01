import { Contact, Message } from '../models';

class ContactController {
  /**
   * Create a contact
   * @param {object} req
   * @param {object} res
   */
  static createContact(req, res) {
    const {
      name,
      number,
    } = req.body;
    return Contact
      .create({
        name: name.trim(),
        number: number.trim(),
      })
      .then(contact => res.status(201).send({
        message: 'Contact has been successfully created',
        contact,
      }))
      .catch((error) => {
        const errorMessage = error.errors.map(value => value.message);
        return res.status(400).send({
          error: errorMessage,
        });
      });
  }

  /**
   * Get all contacts
   * @param {object} req
   * @param {object} res
   */
  static getAllContacts(req, res) {
    return Contact.findAll({
      include: [
        {
          model: Message,
          as: 'sentMessages',
        },
        {
          model: Message,
          as: 'receivedMessages',
        },
      ],
    })
      .then(contact => res.status(200).send({
        contact,
      }))
      .catch(error => res.status(500).send({
        message: 'An error occured',
        error,
      }));
  }

  /**
   * Get a contact
   * @param {object} req
   * @param {object} res
   */
  static getAContact(req, res) {
    if (isNaN(parseInt(req.params.contactId, 10))) {
      return res.status(400).send({
        message: 'Please use a valid id',
      });
    }
    return Contact
      .findById(req.params.contactId, {
        include: [
          {
            model: Message,
            as: 'sentMessages',
          },
          {
            model: Message,
            as: 'receivedMessages',
          },
        ],
      })
      .then((contact) => {
        if (!contact) {
          return res.status(404).send({
            message: 'Contact was not found',
          });
        }
        return res.status(200).send(contact);
      })
      .catch(error => res.status(500).send({
        message: 'An error occured',
        error,
      }));
  }

  /**
   * Update a contact
   * @param {object} req
   * @param {object} res
   */
  static updateContact(req, res) {
    const {
      name,
      number,
    } = req.body;
    if (isNaN(parseInt(req.params.contactId, 10))) {
      return res.status(400).send({
        message: 'Please use a valid id',
      });
    }
    return Contact.findById(req.params.contactId)
      .then((contact) => {
        if (!contact) {
          return res.status(404).send({
            message: 'Contact was not found',
          });
        }
        return contact
          .update({
            name: name.trim(),
            number: number.trim(),
          })
          .then(() => res.status(200).send({
            message: 'Successfully updated',
            contact,
          }))
          .catch((error) => {
            const errorMessage = error.errors.map(value => value.message);
            return res.status(400).send({
              error: errorMessage,
            });
          });
      })
      .catch(error => res.status(500).send({
        message: 'An error occured',
        error,
      }));
  }

  /**
   * Delete a contact
   * @param {object} req
   * @param {object} res
   */
  static deleteContact(req, res) {
    if (isNaN(parseInt(req.params.contactId, 10))) {
      return res.status(400).send({
        message: 'Please use a valid id',
      });
    }
    return Contact
      .findById(req.params.contactId)
      .then((contact) => {
        if (!contact) {
          return res.status(404).send({
            message: 'Contact was not found',
          });
        }
        return contact.destroy()
          .then(() => res.status(200).send({
            message: 'Successfully deleted',
            contact,
          }))
          .catch(error => res.status(400).send({
            message: 'Contact could not be deleted',
            error,
          }));
      })
      .catch(error => res.status(500).send({
        message: 'An error occured',
        error,
      }));
  }
}

export default ContactController;

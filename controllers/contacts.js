const contacts = require('../models/contacts');
const { HttpError, validators, ctrlWrapper } = require('../helpers');

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();

  res.status(200).json(result);
};
const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const contactById = await contacts.getContactById(contactId);

  if (!contactById) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(contactById);
};
const addContact = async (req, res) => {
  const newContact = await contacts.addContact(req.body);

  res.status(201).json(newContact);
};
const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await contacts.removeContact(contactId);

  if (!deletedContact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ message: 'contact deleted' });
};
const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await contacts.updateContact(contactId, req.body);

  if (!updatedContact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(updatedContact);
};
module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};

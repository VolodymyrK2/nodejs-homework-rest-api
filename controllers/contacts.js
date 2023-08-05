const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../helpers');

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = null } = req.query;
  const query = favorite === null ? { owner } : { owner, favorite };
  const skip = (page - 1) * limit;

  const result = await Contact.find(query, null, { skip, limit });

  res.status(200).json(result);
};
const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const contactById = await Contact.findById(contactId);

  if (!contactById) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(contactById);
};
const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });

  res.status(201).json(newContact);
};
const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await Contact.findByIdAndRemove(contactId);

  if (!deletedContact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ message: 'contact deleted' });
};
const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!updatedContact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(updatedContact);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};

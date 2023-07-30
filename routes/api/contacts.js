const express = require('express');
const { schemas } = require('../../models/contact');

const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId } = require('../../middlewares');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema, false), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.removeContact);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema, false), ctrl.updateContact);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema, true), ctrl.updateFavorite);

module.exports = router;

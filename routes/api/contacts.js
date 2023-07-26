const express = require('express');

const ctrl = require('../../controllers/contacts');
const { validators } = require('../../helpers');
const { validateBody } = require('../../middlewares');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', validateBody(validators.createContactValidator), ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', validateBody(validators.createContactValidator), ctrl.updateContact);

module.exports = router;

const express = require('express');

const { validateBody, authenticate } = require('../../middlewares');
const { authSchema } = require('../../models/user');
const ctrl = require('../../controllers/auth');

const router = express.Router();

router.post('/register', validateBody(authSchema), ctrl.register);

router.post('/login', validateBody(authSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

module.exports = router;

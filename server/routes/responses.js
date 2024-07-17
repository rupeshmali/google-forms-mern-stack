const express = require('express');
const { getForm } = require('../controllers/responses');
const router = express.Router();

router.get('/form/:id', getForm)

module.exports = router;
const express = require('express');
const { getForm, saveResponse, getAnswers } = require('../controllers/responses');
const router = express.Router();

router.get('/form/:id', getForm)
router.get('/form/:id/answers', getAnswers)
router.post('/form/:id', saveResponse)
module.exports = router;
const express = require('express');
const { create, getByUser, update, addQuestion } = require('../controllers/forms');
const router = express.Router();

router.post('/create', create)
router.get('/user', getByUser)
router.patch('/:id', update)
router.post('/:id/question', addQuestion)

module.exports = router;
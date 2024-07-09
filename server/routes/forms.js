const express = require('express');
const { create, getByUser, update } = require('../controllers/forms');
const router = express.Router();

router.post('/create', create)
router.get('/user', getByUser)
router.patch('/:id', update)

module.exports = router;
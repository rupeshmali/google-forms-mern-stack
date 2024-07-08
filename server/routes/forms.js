const express = require('express');
const { create, getByUser } = require('../controllers/forms');
const router = express.Router();

router.post('/create', create)
router.get('/user', getByUser)
module.exports = router;
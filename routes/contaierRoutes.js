const express = require('express');
const router = express.Router();
const {
  getContainers,
  addContainer,
  updateContainer,
  deleteContainer
} = require('../controllers/containerController');

router.get('/', getContainers);
router.post('/', addContainer);
router.put('/:id', updateContainer);
router.delete('/:id', deleteContainer);

module.exports = router;

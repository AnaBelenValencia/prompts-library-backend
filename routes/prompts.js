const express = require('express');
const router = express.Router();
const {
  getAllPrompts,
  getPromptById,
  createPrompt,
  updatePrompt
} = require('../controllers/promptController');

router.get('/', getAllPrompts);
router.get('/:id', getPromptById);
router.post('/', createPrompt);
router.patch('/:id', updatePrompt);

module.exports = router;

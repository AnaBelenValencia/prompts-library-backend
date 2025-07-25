import express from 'express'
import {
  getAllPrompts,
  getPromptById,
  createPrompt,
  updatePrompt
} from '../controllers/promptController.js'
import validatePrompt from '../middlewares/validatePrompt.js'

const router = express.Router();

router.get('/', getAllPrompts)
router.get('/:id', getPromptById)
router.post('/', validatePrompt, createPrompt)
router.patch('/:id', updatePrompt)

export default router

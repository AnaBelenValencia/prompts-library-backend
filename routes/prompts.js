import express from 'express'
import Prompt from '../models/Prompt.js'

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const prompts = await Prompt.find().sort({ created_at: -1 })
    res.status(200).json(prompts)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id)
    if (!prompt) return res.status(404).json({ error: 'Prompt not found' })
    res.json(prompt)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/', async (req, res) => {
  try {
    const newPrompt = new Prompt(req.body)
    await newPrompt.save()
    res.status(201).json(newPrompt)
  } catch (err) {
    res.status(400).json({ error: 'Invalid data', details: err })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const updated = await Prompt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updated) return res.status(404).json({ error: 'Prompt not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: 'Invalid update' })
  }
})

export default router

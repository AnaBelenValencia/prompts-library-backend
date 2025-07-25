import Prompt from '../models/Prompt.js'

export const getAllPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find().sort({ created_at: -1 })
    res.status(200).json(prompts)
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message })
  }
};

export const getPromptById = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id)
    if (!prompt) return res.status(404).json({ error: 'Prompt not found' })
    res.json(prompt)
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}

export const createPrompt = async (req, res) => {
  try {
    const newPrompt = new Prompt(req.body)
    await newPrompt.save()
    res.status(201).json(newPrompt)
  } catch (error) {
    res.status(400).json({ error: 'Invalid data', details: error.message })
  }
}

export const updatePrompt = async (req, res) => {
  console.log(req.params)
  try {
    const prompt = await Prompt.findById(req.params.id)
    if (!prompt) return res.status(404).json({ error: 'Prompt not found' })

    if (req.body.status !== undefined) {
      prompt.status = req.body.status
    }

    await prompt.save()
    res.json(prompt)
  } catch (error) {
    res.status(400).json({ error: 'Invalid update', details: error.message })
  }
}

const { readData, writeData } = require('../utils/fileHandler');
const { v4: uuidv4 } = require('uuid');

const getAllPrompts = (req, res) => {
  const data = readData();
  res.json(data);
};

const getPromptById = (req, res) => {
  const data = readData();
  const prompt = data.find(p => p.id === req.params.id);
  if (!prompt) return res.status(404).json({ message: 'Prompt not found' });
  res.json(prompt);
};

const createPrompt = (req, res) => {
  const { title, content, tags, status } = req.body;
  const newPrompt = {
    id: uuidv4(),
    title,
    content,
    tags,
    status: status || 'inactive',
    created_at: new Date().toISOString()
  };
  const data = readData();
  data.push(newPrompt);
  writeData(data);
  res.status(201).json(newPrompt);
};

const updatePrompt = (req, res) => {
  const data = readData();
  const index = data.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Prompt not found' });

  const { content, status } = req.body;
  if (content !== undefined) data[index].content = content;
  if (status !== undefined) data[index].status = status;

  writeData(data);
  res.json(data[index]);
};

module.exports = {
  getAllPrompts,
  getPromptById,
  createPrompt,
  updatePrompt
};

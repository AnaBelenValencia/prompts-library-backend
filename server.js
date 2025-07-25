const express = require('express');
const cors = require('cors');
const promptRoutes = require('./routes/prompts');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/prompts', promptRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

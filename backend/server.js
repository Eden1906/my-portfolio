import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './mongodb.js'; 
import Project from './models/Project.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/check-password', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: 'Incorrect password' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const { name, summary, gitHubLink } = req.body;
    if (!name || !summary) {
      return res.status(400).json({ success: false, message: 'Name and summary are required.' });
    }

    const newProject = new Project({ name, summary, gitHubLink });
    await newProject.save();

    res.json({ success: true, project: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ _id: -1 }); 
    res.json({ success: true, projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.listen(PORT, () => {
  console.log(`🔐 Server running on port ${PORT}`);
});

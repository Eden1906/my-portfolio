import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();                      // נטען ENV מיד כשמתחילים

import { connectDB } from './mongodb.js'; // ייבוא הפונקציה (לא מתחבר אוטומטית)
import Project from './models/Project.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'https://eden-levy-portfolio.vercel.app' })); // מומלץ למקד origin
app.use(express.json());

// בריאות
app.get('/api/health', (_req,res)=>res.status(200).send('ok'));

// לפני שימוש ב-DB, ודא חיבור
app.get('/api/projects', async (req, res, next) => {
  try {
    await connectDB();
    const projects = await Project.find().sort({ _id: -1 }).lean();
    res.json({ success: true, projects });
  } catch (err) { next(err); }
});

app.post('/api/projects', async (req, res, next) => {
  try {
    await connectDB();
    const { name, summary, gitHubLink } = req.body;
    if (!name || !summary) {
      return res.status(400).json({ success: false, message: 'Name and summary are required.' });
    }
    const newProject = new Project({ name, summary, gitHubLink });
    await newProject.save();
    res.json({ success: true, project: newProject });
  } catch (err) { next(err); }
});

app.post('/api/check-password', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) return res.json({ success: true });
  return res.status(401).json({ success: false, message: 'Incorrect password' });
});

// error handler – יחזיר 500 עם הודעה שתראה בלוגים וברספונס
app.use((err, req, res, _next) => {
  console.error('UNHANDLED ERROR:', err);
  res.status(500).json({ success: false, message: err.message || 'Server error' });
});

app.listen(PORT, () => console.log(`🔐 Server running on port ${PORT}`));

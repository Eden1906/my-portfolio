import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  summary: { type: String, required: true },
  gitHubLink: { type: String },
  dateCreated: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;

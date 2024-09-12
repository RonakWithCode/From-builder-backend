const Project = require('../models/Project');
const Form = require('../models/Form');

// Create a new project
exports.createProject = async (req, res) => {
    const { projectName } = req.body;
    console.log(
        "api hit"
    )
    try {
        const newProject = new Project({
            userId: req.user.id,
            projectName,
        });

        await newProject.save();
        res.json(newProject);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Get all projects for a user
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user.id }).populate('forms');
        res.json(projects);
    } catch (err) {
        res.status(500).send('Server error');
    }
};
// Fetch a project by its ID
exports.getProjectById = async (req, res) => {
    try {
      const project = await Project.findById(req.params.id).populate('forms'); // Fetch project by ID and populate forms
      if (!project || project.userId.toString() !== req.user.id) {
        return res.status(404).json({ msg: 'Project not found or you do not have access.' });
      }
      res.json(project);
    } catch (err) {
      console.error('Error fetching project by ID:', err);
      res.status(500).send('Server error');
    }
  };
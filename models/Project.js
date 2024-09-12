const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectName: { type: String, required: true },
    forms: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Form' }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);

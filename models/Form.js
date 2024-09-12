const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
    label: { type: String, required: true },  // Field label (e.g., "Email", "Message")
    type: { type: String, required: true },   // Field type (text, email, number, etc.)
    required: { type: Boolean, default: false },  // Is the field required?
    validation: {                              // Validation rules (optional)
        regex: { type: String },               // Regular expression for validation (optional)
        errorMessage: { type: String }         // Custom error message if validation fails
    },
});

const FormSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    formName: { type: String, required: true },  // Form name (e.g., "Contact Form")
    fields: [FieldSchema],   // An array of form fields
    version: { type: Number, default: 1 },  // Form version number for future updates
    status: { type: String, default: 'active' },  // Form status (active, inactive)
    apiKey: { type: String, required: true },  // Unique API key for this form
    createdAt: { type: Date, default: Date.now },  // Timestamp when the form was created
    updatedAt: { type: Date, default: Date.now },  // Timestamp when the form was last updated
}, { timestamps: true });

module.exports = mongoose.model('Form', FormSchema);

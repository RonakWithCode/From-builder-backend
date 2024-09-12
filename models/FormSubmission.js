const mongoose = require('mongoose');

// Schema for capturing metadata about each form submission
const SubmissionMetadataSchema = new mongoose.Schema({
    ip: { type: String }, // IP address of the user submitting the form
    userAgent: { type: String }, // Browser or application details
    referrer: { type: String }, // Referrer URL if applicable
    submittedAt: { type: Date, default: Date.now }, // When the form was submitted
});

// Schema for each form field's submitted data
const FormDataSchema = new mongoose.Schema({
    fieldLabel: { type: String, required: true }, // Label of the form field (Email, Message, etc.)
    fieldValue: { type: mongoose.Schema.Types.Mixed, required: true }, // Value submitted by the user
    fieldType: { type: String, required: true }, // Field type (text, email, etc.)
});

const FormSubmissionSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    developerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    submissionData: [FormDataSchema], // Submitted form data
    metadata: SubmissionMetadataSchema, // Metadata about the form submission
    tag: { type: String }, // Label of the form field (Email, Message, etc.)
    status: { 
        type: String, 
        enum: [
            'pending',      // Initial state when the submission is received
            'reviewed',     // When the submission has been reviewed
            'approved',     // When the submission is approved (if applicable)
            'rejected',     // When the submission is rejected
            'completed',    // When the submission is fully completed
            'in-progress',  // When work or processing is ongoing
            'on-hold',      // When the submission is temporarily paused or on hold
            'failed',       // When processing the submission has failed
            'archived',     // When the submission is archived (no longer actively processed)
            'cancelled',    // When the submission is cancelled by the user or system
            'triggered',    // When an external action like a webhook has been triggered
            'complete',     // To support your existing workflow if 'complete' is still needed
        ], 
        default: 'pending'
    },    
    encryptedFields: [String], // Array of fields that should be encrypted
    webhookTriggered: { type: Boolean, default: false }, // Has the webhook been triggered?
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('FormSubmission', FormSubmissionSchema);

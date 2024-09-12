const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Developer who owns the form
    submissionData: { type: Object, required: true },  // The actual submitted data (email, message, etc.)
    
    status: { type: String, default: 'pending' },  // Submission status (pending, processed, completed)
    
    submittedAt: { type: Date, default: Date.now },  // When the submission was made
    
    metadata: {                                      // Metadata for the submission
        ipAddress: { type: String },                 // IP address of the user submitting the form
        userAgent: { type: String },                 // Browser user agent string
        deviceType: { type: String },                // Device type (mobile, desktop)
    },

    attachments: [{                                  // List of file attachments, if any
        fileName: { type: String },
        fileUrl: { type: String },
        mimeType: { type: String }
    }],

    logs: [                                          // Audit logs for tracking submission changes or errors
        {
            message: { type: String },               // Log message (e.g., "Form processed", "Error occurred")
            timestamp: { type: Date, default: Date.now },
        }
    ],

    notification: {                                  // Notification settings
        emailSent: { type: Boolean, default: false },  // Whether notification email was sent
        emailSentAt: { type: Date },                 // Timestamp of when the email was sent
    }
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);

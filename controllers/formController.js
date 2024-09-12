const Form = require('../models/Form');
const FormSubmission = require('../models/FormSubmission');
const Project = require('../models/Project');

// Create a new form in a specific project
const crypto = require('crypto');


// Create a new form in a specific project
exports.createForm = async (req, res) => {
  const { projectId, formName, fields } = req.body;

  try {
      const project = await Project.findById(projectId);
      if (!project) {
          return res.status(404).json({ msg: 'Project not found' });
      }

      // Generate a unique API key for the form
      const apiKey = crypto.randomBytes(20).toString('hex');

      const newForm = new Form({
          projectId,
          formName,
          fields,
          apiKey,
      });

      await newForm.save();
      project.forms.push(newForm._id);
      await project.save();

      res.json({ form: newForm, apiKey });
  } catch (err) {
      console.error(`Error: ${err.message}`);
      res.status(500).send('Server error');
  }
};





// controllers/formController.js

// Submit form data to a specific form
// Submit form data to a specific form
// exports.submitForm = async (req, res) => {
//   const { formId } = req.params;
//   const { submissionData, metadata } = req.body;

//   try {
//     // Log req.user to ensure it's set
//     console.log('User making the request:', req.user);

//     if (!req.user || !req.user.id) {
//       return res.status(403).json({ msg: 'User not authenticated' });
//     }

//     // Find the form by its ID
//     const form = await Form.findById(formId);
//     if (!form) return res.status(404).json({ msg: 'Form not found' });

//     // Ensure the developer is the owner of the project associated with the form
//     const project = await Project.findById(form.projectId);
//     if (!project || project.userId.toString() !== req.user.id) {
//       return res.status(403).json({ msg: 'Unauthorized to submit to this form' });
//     }

//     // Create a new submission
//     const newSubmission = new FormSubmission({
//       formId: form._id,
//       projectId: form.projectId,
//       developerId: req.user.id,
//       submissionData,
//       metadata,
//     });

//     // Save the submission
//     await newSubmission.save();

//     res.json({ msg: 'Form submitted successfully', submission: newSubmission });
//   } catch (err) {
//     console.error(`Server error: ${err.message}`);
//     res.status(500).send('Server error');
//   }
// };


// controllers/formController.js

// Submit form data to a specific form
// exports.submitForm = async (req, res) => {
//   const { formId } = req.params;
//   const { submissionData, metadata } = req.body;

//   try {
//     // Ensure the form from the middleware matches the submitted form
//     const form = req.form;
//     if (form._id.toString() !== formId) {
//       return res.status(403).json({ msg: 'Form ID does not match the API key' });
//     }

//     // Create a new submission
//     const newSubmission = new FormSubmission({
//       formId: form._id,
//       projectId: form.projectId,
//       submissionData,
//       metadata,
//     });

//     // Save the submission
//     await newSubmission.save();

//     res.json({ msg: 'Form submitted successfully', submission: newSubmission });
//   } catch (err) {
//     console.error(`Server error: ${err.message}`);
//     res.status(500).send('Server error');
//   }
// };


// // exports.submitForm = async (req, res) => {
// //     const { formId } = req.params;
// //     const { submissionData, metadata } = req.body;
  
// //     try {
// //       // Log req.user to ensure it's set
// //       console.log('User making the request:', req.user);
  
// //       if (!req.user || !req.user.id) {
// //         return res.status(403).json({ msg: 'User not authenticated' });
// //       }
  
// //       // Find the form by its ID
// //       const form = await Form.findById(formId);
// //       if (!form) return res.status(404).json({ msg: 'Form not found' });
  
// //       // Ensure the developer is the owner of the project associated with the form
// //       const project = await Project.findById(form.projectId);
// //       if (!project || project.userId.toString() !== req.user.id) {
// //         return res.status(403).json({ msg: 'Unauthorized to submit to this form' });
// //       }
  
// //       // Create a new submission
// //       const newSubmission = new FormSubmission({
// //         formId: form._id,
// //         projectId: form.projectId,
// //         developerId: req.user.id,
// //         submissionData,
// //         metadata,
// //       });
  
// //       // Save the submission
// //       await newSubmission.save();
  
// //       res.json({ msg: 'Form submitted successfully', submission: newSubmission });
// //     } catch (err) {
// //       console.error(`Server error: ${err.message}`);
// //       res.status(500).send('Server error');
// //     }
// //   };
  


// // Get submissions for a form in a project
// exports.getFormSubmissions = async (req, res) => {
//   const { formId } = req.params;

//   try {
//       // Find all submissions related to the form ID
//       const submissions = await FormSubmission.find({ formId });

//       // Check if there are any submissions
//       if (!submissions || submissions.length === 0) {
//           return res.status(404).json({ msg: 'No submissions found for this form' });
//       }

//       // Return the found submissions
//       res.json(submissions);
//   } catch (err) {
//       console.error(`Server error: ${err.message}`);
//       res.status(500).send('Server error');
//   }
// };




// exports.submitForm = async (req, res) => {
//   const { formId } = req.params;
//   const { submissionData, metadata } = req.body;

//   try {
//     // Ensure the form from the middleware matches the submitted form
//     const form = req.form;
//     if (form._id.toString() !== formId) {
//       return res.status(403).json({ msg: 'Form ID does not match the API key' });
//     }

//     // Create a new submission log
//     const newSubmission = new FormSubmission({
//       formId: form._id,
//       projectId: form.projectId,
//       submissionData,
//       metadata: {
//         ip: req.ip, // Capture IP address
//         userAgent: req.headers['user-agent'], // Capture user-agent (browser)
//         referrer: req.headers['referer'], // Capture referrer URL
//         submittedAt: Date.now(),
//       },
//     });

//     // Save the submission
//     await newSubmission.save();

//     res.json({ msg: 'Form submitted successfully', submission: newSubmission });
//   } catch (err) {
//     console.error(`Server error: ${err.message}`);
//     res.status(500).send('Server error');
//   }
// };
exports.getFormSubmissions = async (req, res) => {
  const { formId } = req.params;

  try {
    // Find all submissions related to the form ID
    const submissions = await FormSubmission.find({ formId });

    // Check if there are any submissions
    if (!submissions || submissions.length === 0) {
      return res.status(404).json({ msg: 'No submissions found for this form' });
    }

    // Calculate metrics
    const totalRequests = submissions.length;
    const lastRequest = submissions[submissions.length - 1]?.createdAt || null;

    // Return the found submissions and metrics
    res.json({
      totalRequests,
      lastRequest,
      submissions,
    });
  } catch (err) {
    console.error(`Server error: ${err.message}`);
    res.status(500).send('Server error');
  }
};

// Get form details by formId
exports.getFormById = async (req, res) => {
  const { formId } = req.params;

  try {
    // Find the form by its ID
    const form = await Form.findById(formId);

    // Check if the form exists
    if (!form) {
      return res.status(404).json({ msg: 'Form not found' });
    }

    // Return the form data
    res.json({ form });
  } catch (err) {
    console.error(`Server error: ${err.message}`);
    res.status(500).send('Server error');
  }
};
// New controller function to update submission status
exports.updateSubmissionStatus = async (req, res) => {
  const { formId, submissionId } = req.params;
  const { status } = req.body;

  // Validate the status
  const validStatuses = ['pending', 'complete'];
  if (!validStatuses.includes(status.toLowerCase())) {
    return res.status(400).json({ msg: 'Invalid status value.' });
  }

  try {
    // Find the form by formId
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ msg: 'Form not found.' });
    }

    // Find the project to check ownership
    const project = await Project.findById(form.projectId);
    if (!project) {
      return res.status(404).json({ msg: 'Associated project not found.' });
    }

    // Check if the requesting user is the owner of the project
    if (project.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized to update submissions for this form.' });
    }

    // Find the submission by submissionId and formId
    const submission = await FormSubmission.findOne({ _id: submissionId, formId });
    if (!submission) {
      return res.status(404).json({ msg: 'Submission not found.' });
    }

    // Update the status
    submission.status = status.toLowerCase();
    await submission.save();

    res.json({ msg: 'Submission status updated successfully.', submission });
  } catch (err) {
    console.error(`Server error: ${err.message}`);
    res.status(500).send('Server error');
  }
};

// Function to validate form submission fields
const validateSubmissionFields = (formFields, submissionData) => {
  const errors = [];

  // Create a map for quick lookup of form fields by label
  const formFieldMap = formFields.reduce((map, field) => {
      map[field.label] = field;
      return map;
  }, {});

  // Loop through each submission field to validate it
  submissionData.forEach(submissionField => {
      const formField = formFieldMap[submissionField.fieldLabel];

      // If the form field doesn't exist, add an error
      if (!formField) {
          errors.push(`Invalid field: ${submissionField.fieldLabel} does not exist on the form.`);
          return;
      }

      // Check if the field is required and missing
      if (formField.required && !submissionField.fieldValue) {
          errors.push(`Field required: ${submissionField.fieldLabel} is required but not provided.`);
      }

      // Validate the field type (e.g., text, email, password)
      if (formField.type !== submissionField.fieldType) {
          errors.push(`Invalid type for field ${submissionField.fieldLabel}: expected ${formField.type}, but got ${submissionField.fieldType}`);
      }

      // If there's a regex validation, apply it
      if (formField.validation && formField.validation.regex) {
          const regex = new RegExp(formField.validation.regex);
          if (!regex.test(submissionField.fieldValue)) {
              errors.push(`Validation error for field ${submissionField.fieldLabel}: ${formField.validation.errorMessage || 'Invalid format'}`);
          }
      }
  });

  // Check for any required fields missing from submission
  formFields.forEach(field => {
      const submittedField = submissionData.find(data => data.fieldLabel === field.label);
      if (field.required && !submittedField) {
          errors.push(`Field required: ${field.label} is missing.`);
      }
  });

  return errors;
};

exports.submitForm = async (req, res) => {
  const { formId } = req.params;
  const { submissionData, metadata } = req.body;

  try {
      // Find the form using the formId
      const form = await Form.findById(formId);
      if (!form) {
          return res.status(404).json({ msg: 'Form not found' });
      }

      // Validate the submitted fields
      const errors = validateSubmissionFields(form.fields, submissionData);
      if (errors.length > 0) {
          return res.status(400).json({ msg: 'Validation errors', errors });
      }

      // Create a new submission log
      const newSubmission = new FormSubmission({
          formId: form._id,
          projectId: form.projectId,
          submissionData,
          metadata: {
              ip: req.ip, // Capture IP address
              userAgent: req.headers['user-agent'], // Capture user-agent (browser)
              referrer: req.headers['referer'], // Capture referrer URL
              submittedAt: Date.now(),
          },
      });

      // Save the submission
      await newSubmission.save();

      res.json({ msg: 'Form submitted successfully', submission: newSubmission });
  } catch (err) {
      console.error(`Server error: ${err.message}`);
      res.status(500).send('Server error');
  }
};

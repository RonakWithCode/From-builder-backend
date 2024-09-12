// /middlewares/apiKeyMiddleware.js
const Form = require('../models/Form');

const apiKeyMiddleware = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];  // Get API key from the headers

  if (!apiKey) {
    return res.status(401).json({ msg: 'No API key provided' });
  }

  try {
    // Find the form by its API key
    const form = await Form.findOne({ apiKey });

    if (!form) {
      return res.status(401).json({ msg: 'Invalid API key' });
    }

    // Attach the form to the request object for further use
    req.form = form;
    next();
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = apiKeyMiddleware;

const Question = require('../models/question');
const { addQuestionSchema } = require('../middlewares/validate-middleware');

// Add a new question
const addQuestion = async (req, res) => {
  try {
    // Validate request body
    addQuestionSchema.parse(req.body);

    const { id, type, question, options, answer } = req.body;

    // Check if the ID already exists
    const existingQuestion = await Question.findOne({ id });
    if (existingQuestion) {
      return res.status(400).json({ message: 'Question with this ID already exists' });
    }

    // Add the question to the database
    const newQuestion = new Question({
      id,
      type,
      question,
      options,
      answer
    });

    await newQuestion.save();

    res.status(201).json({
      message: 'Question added successfully',
      question: newQuestion
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = addQuestion;

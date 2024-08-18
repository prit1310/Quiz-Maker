// routes/question-routes.js
const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate-middleware');
const questionController = require('../controllers/question-controller');
const { addQuestionSchema, revealAnswerSchema } = require('../validators/question-validator');
const Question = require('../models/question');

// Route to add a question
router.route('/addQuestion').post(validate(addQuestionSchema), questionController.addQuestion);

// Route to get a question (without the answer)
router.route('/question/:id').get(questionController.getQuestion);

// Route to reveal the answer
router.route('/question/:id/answer').post(validate(revealAnswerSchema), questionController.revealAnswer);

// Define the route to get all questions
router.route('/questions').get(async (req, res) => {
    try {
      const questions = await Question.find();
      res.status(200).json(questions);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  

module.exports = router;

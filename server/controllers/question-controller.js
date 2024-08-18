const mongoose = require('mongoose');
const Question = require('../models/question');

// Add a new question
const addQuestion = async (req, res) => {
    const { type, question, options, answer } = req.body;
  
    try {
      const newQuestion = new Question({
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
  

// Get a question by ID
const getQuestion = async (req, res) => {
    const questionId = req.params.id;
  
    try {
      const objectId = new mongoose.Types.ObjectId(questionId);
  
      const question = await Question.findById(objectId);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      const { question: q, options } = question;
  
      res.status(200).json({
        question: q,
        options
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  // Define getQuestionById function
  const getQuestionById = async (id) => {
    try {
      return await Question.findById(id);
    } catch (error) {
      console.error('Error fetching question:', error);
      throw error;
    }
  };
  
  // Define revealAnswer function
 // Define revealAnswer function
const revealAnswer = async (req, res) => {
  const { answers } = req.body; // { questionId: answer }

  try {
    let correctCount = 0;
    let incorrectCount = 0;

    for (const [questionId, answer] of Object.entries(answers)) {
      const question = await getQuestionById(questionId);
      if (!question) {
        incorrectCount++;
        continue;
      }

      const validOptions = question.options || [];
      if (validOptions.includes(answer)) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }

    res.status(200).json({ correctCount, incorrectCount });
  } catch (error) {
    console.error('Error handling reveal answer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  // Export the functions if needed
  module.exports = {
    revealAnswer
  };
  
  
  
  

module.exports = { addQuestion, getQuestion, revealAnswer };

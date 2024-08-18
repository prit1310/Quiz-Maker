const { z } = require('zod');

const addQuestionSchema = z.object({
  type: z.string().min(1, 'Question type must be a string'),
  question: z.string().min(1, 'Question must be a string'),
  options: z.array(z.string()).length(4, 'Must provide exactly 4 options'),
  answer: z.string(),
}).refine(data => {
  // Validate that the answer is one of the options
  return data.options.includes(data.answer);
}, {
  message: 'Answer must be one of the provided options',
  path: ['answer'], // Specify the path to the field being validated
});

const revealAnswerSchema = z.object({
    answer: z.string().min(1, 'Answer must be provided'),
  });
  
  module.exports = { addQuestionSchema, revealAnswerSchema };
  
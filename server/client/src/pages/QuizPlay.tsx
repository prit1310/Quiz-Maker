import { useState, useEffect } from 'react';
import Spinner from './Spinner';

// Define the type for a question
interface Question {
  _id: string;
  question: string;
  options: string[];
  answer?: string; // Add this if the answer is included in the question data
}

// Define the type for the results
interface Results {
  correctCount: number;
  incorrectCount: number;
}

// Define the type for answers
interface Answers {
  [questionId: string]: string;
}

const QuizPlay = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<Results | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions');
        
        if (response.ok) {
          const data: Question[] = await response.json();
          setQuestions(data);
        } else {
          console.error('Network response was not ok:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionChange = (questionId: string, option: string) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: option }));
  };

  const handleSubmit = async () => {
    const questionResults = questions.map(question => ({
      questionId: question._id,
      selectedOption: answers[question._id],
      isCorrect: question.answer === answers[question._id] // Check if selected option is correct
    }));

    const correctCount = questionResults.filter(result => result.isCorrect).length;
    const incorrectCount = questionResults.length - correctCount;

    setResult({ correctCount, incorrectCount });
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
  };

  const question = questions[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-6 md:p-8 lg:p-12">
      {result ? (
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900">Results</h1>
          <p className="text-base sm:text-lg md:text-xl">Correct: {result.correctCount}</p>
          <p className="text-base sm:text-lg md:text-xl">Incorrect: {result.incorrectCount}</p>
          <button
            onClick={handleRestart}
            className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center">
          {question ? (
            <div className="w-full mt-[18%] max-w-md sm:max-w-lg bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg space-y-4 sm:space-y-6 border border-gray-200">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{question.question}</h1>
              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`${question._id}-${index}`}
                      name={question._id}
                      value={option}
                      onChange={() => handleOptionChange(question._id, option)}
                      checked={answers[question._id] === option}
                      className="mr-2"
                    />
                    <label htmlFor={`${question._id}-${index}`} className="text-gray-800">{option}</label>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-4 md:flex-row md:gap-4 md:justify-between">
                <button
                  onClick={() => setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0))}
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 transition duration-300"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1))}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition duration-300"
                >
                  Next
                </button>
                {currentIndex === questions.length - 1 && (
                  <button
                    onClick={handleSubmit}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPlay;

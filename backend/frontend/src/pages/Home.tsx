import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-6 md:p-8 lg:p-12">
      <header className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900">Welcome to QuizMaster</h1>
        <p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-700">
          Your go-to platform for creating and playing quizzes. Get started by adding new questions or jump straight into a quiz challenge!
        </p>
      </header>

      <main className="flex-grow flex flex-col items-center">
        <div className="text-center bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">About QuizMaster</h2>
          <p className="mt-4 text-sm sm:text-base md:text-gray-600">
            QuizMaster allows you to create custom quizzes and test your knowledge. You can add new questions with multiple-choice options and play quizzes to test your understanding.
          </p>
          <p className="mt-2 text-sm sm:text-base md:text-gray-600">
            Use the buttons below to navigate through the app. Add questions to build your quiz or start playing to see how well you know the material.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-6 md:gap-8 justify-center">
            <Link
              to="/quizadd"
              className="px-4 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Question
            </Link>
            <Link
              to="/quizplay"
              className="px-4 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Play Quiz
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

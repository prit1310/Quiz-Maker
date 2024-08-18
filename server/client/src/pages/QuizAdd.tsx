import { useState } from 'react';
import {toast} from "react-toastify"

const QuizAdd = () => {
  const [formData, setFormData] = useState({
    type: '',
    question: '',
    options: ['', '', '', ''],
    answer: ''
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/addQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success("Question added successfully")
        setFormData({
          type: '',
          question: '',
          options: ['', '', '', ''],
          answer: ''
        });
      } else {
        alert('Failed to add question');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-900">Add a New Question</h1>
      <div className="flex-grow flex flex-col items-center">
        <form 
          onSubmit={handleSubmit} 
          className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6 border border-gray-200 mb-16"
        >
          <div>
            <label className="block text-lg font-semibold text-gray-800">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-gray-800"
              placeholder="Enter question type"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800">Question</label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-gray-800"
              placeholder="Enter the question"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800">Options</label>
            {formData.options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-gray-800"
                placeholder={`Option ${index + 1}`}
                required
              />
            ))}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800">Answer</label>
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-gray-800"
              placeholder="Enter the correct answer"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-indigo-600 text-white font-bold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Add Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizAdd;

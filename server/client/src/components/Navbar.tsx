import { NavLink } from "react-router-dom";
import { useAuth } from '../store/auth'

const Navbar = () => {
  const { isLoggedIn } = useAuth()

  return (
    <header className="fixed bottom-0 w-full bg-gray-800 text-white shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
      <div className="flex items-center space-x-4">
          <NavLink to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Quiz Maker" 
              className="h-8 w-auto" 
            />
            <span className="ml-2 text-xl font-bold">QuizMaker</span>
          </NavLink>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `hover:text-gray-400 ${isActive ? 'text-yellow-500' : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/quizadd" 
                className={({ isActive }) => 
                  `hover:text-gray-400 ${isActive ? 'text-yellow-500' : ''}`
                }
              >
                Add Quiz
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/quizplay" 
                className={({ isActive }) => 
                  `hover:text-gray-400 ${isActive ? 'text-yellow-500' : ''}`
                }
              >
                Play Quiz
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink 
                  to="/logout" 
                  className={({ isActive }) => 
                    `hover:text-gray-400 ${isActive ? 'text-yellow-500' : ''}`
                  }
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink 
                    to="/register" 
                    className={({ isActive }) => 
                      `hover:text-gray-400 ${isActive ? 'text-yellow-500' : ''}`
                    }
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/login" 
                    className={({ isActive }) => 
                      `hover:text-gray-400 ${isActive ? 'text-yellow-500' : ''}`
                    }
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

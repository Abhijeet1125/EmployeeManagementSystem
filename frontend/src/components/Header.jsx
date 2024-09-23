import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom"


const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState(null);


  const choices = ["Home", "Employees", "Departments", "Attendance", "Salary", "Feedback", "Transactions"];

  const ToggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setDarkMode((e) => !e)
  }

  return (
    <header className="w-full bg-gray-300 dark:bg-background-secondary fixed top-0 p-4 flex justify-between items-center ">
      {/* Logo Section */}
      <div className="text-accent-primary text-lg font-bold">Logo</div>

      {/* Navigation Links (visible on desktop only) */}
      <nav className="hidden md:flex space-x-6">
        <ul className=" flex space-x-6 text-black  font-semibold dark:text-text-primary">
          {choices.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={`/${item}`}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0  ${(isActive && ("text-orange-600"))}`
                  }
                >
                  {item}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>


      {/* User/Login */}
      <div className="hidden md:flex items-center space-x-4">
        {!login ? (
          <>
            <button className="dark:text-text-primary text-black hover:text-accent-primary">Sign in</button>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!isUserMenuOpen)}
              className="w-10 h-10 rounded-full bg-accent-primary flex items-center justify-center"
            >
              {/* Example of user icon */}
              <span className="text-white">U</span>
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-200 dark:bg-background-secondary rounded-lg shadow-lg py-2">

                <button className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100 dark:text-text-primary dark:hover:bg-background-tertiary"
                  onClick={ToggleTheme} >
                  Toggle Theme
                </button>
                <button className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100 dark:text-text-primary dark:hover:bg-background-tertiary">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hamburger Menu for mobile view */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-black dark:text-text-primary" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-black dark:text-text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <nav className="md:hidden absolute top-16 left-0 w-full bg-gray-300 dark:bg-background-secondary shadow-lg">
          <ul className="flex flex-col space-y-4 py-4 px-6">
            {choices.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={`/${item}`}
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 lg:p-0 ${isActive
                        ? "text-orange-600"
                        : "text-black dark:text-text-secondary"
                      } hover:bg-gray-100 dark:hover:bg-background-tertiary hover:text-orange-700`
                    }
                  >
                    {item}
                  </NavLink>
                </li>
              );
            })}
            {!login ? (
              <li>
                <button className="text-black dark:text-text-secondary hover:text-blue-700 hover:bg-gray-100 dark:hover:bg-background-tertiary">
                  Sign in
                </button>
              </li>
            ) : (
              <>
                {/* Display "Toggle Theme" and "Logout" directly without user button */}
                <li>
                  <button
                    onClick={ToggleTheme}
                    className="block w-full text-left px-4 py-2 text-black dark:text-text-secondary hover:text-orange-700 hover:bg-gray-100 dark:hover:bg-background-tertiary"
                  >
                    Toggle Theme
                  </button>
                </li>
                <li>
                  <button className="block w-full text-left px-4 py-2 text-black dark:text-text-secondary hover:text-orange-700 hover:bg-gray-100 dark:hover:bg-background-tertiary">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}


    </header>
  );
};

export default Header;
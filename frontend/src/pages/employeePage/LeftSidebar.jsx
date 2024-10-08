import { NavLink } from "react-router-dom";

const LeftSidebar = () => {
  const options = [
    { name: "Overview", path: "" },
    { name: "Employee List", path: "./list" },
    { name: "Add Employee", path: "./add-employee" },
    // { name: "Logout", path: "./logout" },
  ];


  return (
    <div className="h-full flex flex-col justify-between p-4 overflow-hidden">
      <div>
        <h2 className="text-xl mb-4 font-bold ">Navigation</h2>
        <hr className="m-2" />
        <nav className="flex flex-col space-y-4">
          {options.map((option) => (
            <NavLink
              key={option.name}
              to={option.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold text-lg"
                  : " font-semibold text-lg"
              }
            >
              {option.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
        Logout
      </button>
    </div>
  );
};

export default LeftSidebar;

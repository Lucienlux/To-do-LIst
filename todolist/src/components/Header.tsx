import React from "react";

const Header = () => {
  return (
    <div className="h-10 w-full border-2 rounded-md my-4 p-6 flex items-center">
      <div className="flex-1"></div> {}
      <h1 className="flex-none font-mono font-extrabold text-center">
        To Do List
      </h1>
      <div className="flex-1 flex justify-end">
        <a
          className="flex font-mono items-center"
          href="https://github.com/Lucienlux"
        >
          Check out my github
        </a>
      </div>
    </div>
  );
};

export default Header;

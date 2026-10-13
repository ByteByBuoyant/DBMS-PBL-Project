import React from "react";
import { NavLink } from "react-router-dom";

function Aside(props) {
  return (
    <div className="hidden md:block w-[260px] h-[calc(100vh-3.5rem)] border-r border-[#ebdfff] bg-white/30 backdrop-blur-sm p-6">
      <ul className="flex flex-col gap-3">
        {props.forHam &&
          props.forHam.map((ele, index) => {
            return (
              <li key={index + 1}>
                <NavLink
                  to={`${ele.replace(/\s/g, "").toLowerCase()}`}
                  className="sidebar-link"
                >
                  {ele}
                </NavLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Aside;

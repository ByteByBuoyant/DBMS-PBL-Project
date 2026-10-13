import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HamContext } from "../HamContextProvider";

function Header(props) {
  const nav = useNavigate();

  const logoutHandler = function () {
    localStorage.clear();
    nav("/", { replace: true });
  };

  const { hamActive, hamHandler } = useContext(HamContext);
  const path = window.location.pathname;
  let fallbackUser = "admin";
  if (path.includes("owner")) fallbackUser = "owner";
  else if (path.includes("tenant")) fallbackUser = "tenant";
  else if (path.includes("employee")) fallbackUser = "employee";

  const user = JSON.parse(localStorage.getItem("whom"))?.userType || fallbackUser;
  return (
    <nav className="w-full sticky z-50 top-0 h-14 bg-white/70 backdrop-blur-md border-b border-[#ebdfff]">
      <div className="flex items-center justify-between p-2 h-full">
        <div className="ml-4 flex items-center justify-between gap-2.5">
          <div className="flex items-center justify-center p-1.5 rounded-xl bg-[#7c3aed]/5 border border-[#7c3aed]/15">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-[#7c3aed]">
              <circle cx="12" cy="12" r="4" stroke="currentColor" fill="currentColor" fillOpacity="0.1" />
              <circle cx="12" cy="4" r="1" fill="currentColor" />
              <circle cx="12" cy="20" r="1" fill="currentColor" />
              <circle cx="4" cy="12" r="1" fill="currentColor" />
              <circle cx="20" cy="12" r="1" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-base md:text-lg font-bold text-[#211545] tracking-tight">
            Shyama Apartments
          </h1>
        </div>
        <div>
          <button
            className="hidden md:block text-[#211545]/80 hover:text-[#7c3aed] font-semibold text-sm px-4 py-1.5 border border-[#211545]/15 hover:border-[#7c3aed]/30 rounded-xl hover:bg-[#7c3aed]/5 transition duration-200 mr-5"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        {/* Hamburger Icon */}
        <div className="md:hidden absolute top-3.5 right-4">
          <button onClick={hamHandler} className="p-1 rounded-lg hover:bg-[#7c3aed]/5 text-[#211545]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#211545"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* HamMenu */}
      {hamActive && (
        <div
          style={{
            transform: hamActive ? "translateX(0px)" : "translateX(-300px)",
          }}
          className="md:hidden fixed left-0 top-14 transition duration-300 w-[240px] h-full text-sm mobile-nav-menu p-4 z-50"
        >
          <ul className="flex flex-col gap-2 font-medium">
            {props.forHam &&
              props.forHam.map((ele, index) => {
                if (ele === "Logout") {
                  return (
                    <li key={index + 1}>
                      <NavLink
                        to="/"
                        onClick={() => {
                          hamHandler();
                          logoutHandler();
                        }}
                        className="logout-link mt-4"
                      >
                        {ele}
                      </NavLink>
                    </li>
                  );
                }
                return (
                  <li key={index + 1}>
                    <NavLink
                      to={`/${user}/${ele.replace(/\s/g, "").toLowerCase()}`}
                      onClick={hamHandler}
                      className="mobile-link"
                    >
                      {ele}
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Header;

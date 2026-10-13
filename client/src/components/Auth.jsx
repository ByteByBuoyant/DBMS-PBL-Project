import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Particle from "./Particle";
import bgImage from "../assets/light_lilac_bg.jpg";

function Auth(props) {
  const nav = useNavigate();
  const inputEl = useRef(null);
  const passEl = useRef(null);
  const [isName, setIsName] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (
      inputEl.current.value === "" ||
      userId.toUpperCase().charAt(0) === "A" ||
      userId.toUpperCase().charAt(0) === "O" ||
      userId.toUpperCase().charAt(0) === "E" ||
      userId.toUpperCase().charAt(0) === "T"
    ) {
      setIsName(true);
      return;
    } else {
      setIsName(false);
    }
  }, [userId]);

  useEffect(() => {
    if (password.length === 0) {
      setIsPassword(true);
      return;
    } else if (password.length < 6) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  }, [password]);

  const authorize = async () => {
    try {
      const res = await axios.post("http://localhost:5001/auth", {
        username: userId,
        password: password,
      });
      if (res.data.access === "granted") {
        window.localStorage.setItem(
          "whom",
          JSON.stringify({
            userType: res.data.user,
            username: userId,
          })
        );
        if (res.data.user === "employee") {
          nav("/employee", { replace: true });
        }
        if (res.data.user === "admin") {
          nav("/admin", { replace: true });
        }
        if (res.data.user === "tenant") {
          nav("/tenant", { replace: true });
        }
        if (res.data.user === "owner") {
          nav("/owner", { replace: true });
        }
        if (res.data.user === "unknown") {
          setIsName(false);
        } else if (res.data.user === "passunknown") {
          setIsPassword(false);
        }
      } else {
        setIsName(false);
        setIsPassword(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = function (e) {
    e.preventDefault();
    setUserId(inputEl.current.value);
    setPassword(passEl.current.value);
    authorize();
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-white/10 z-0" />
      
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particle colors={["#7c3aed", "#a78bfa", "#d8b4fe"]} />
      </div>

      <div className="relative w-full max-w-md px-6 py-12 mx-auto z-20">
        <div className="backdrop-blur-md bg-white/80 border border-[#ebdfff] shadow-2xl rounded-3xl p-8 md:p-10 flex flex-col items-center">
          <div className="mb-6 flex items-center justify-center p-3 rounded-2xl bg-[#7c3aed]/5 border border-[#7c3aed]/15">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10 text-[#7c3aed]">
              <circle cx="12" cy="12" r="4" stroke="currentColor" fill="currentColor" fillOpacity="0.1" />
              <circle cx="12" cy="4" r="1" fill="currentColor" />
              <circle cx="12" cy="20" r="1" fill="currentColor" />
              <circle cx="4" cy="12" r="1" fill="currentColor" />
              <circle cx="20" cy="12" r="1" fill="currentColor" />
              <circle cx="6.34" cy="6.34" r="1" fill="currentColor" />
              <circle cx="17.66" cy="17.66" r="1" fill="currentColor" />
              <circle cx="6.34" cy="17.66" r="1" fill="currentColor" />
              <circle cx="17.66" cy="6.34" r="1" fill="currentColor" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-[#211545] text-center mb-2 tracking-tight">
            Shyama Apartments
          </h1>
          <p className="text-sm text-[#5e4f8d] text-center mb-8 max-w-[280px] leading-relaxed font-semibold">
            Sign in to access your dashboard, manage tenant details, and raise complaints
          </p>

          <form onSubmit={submitHandler} className="w-full flex flex-col gap-5">
            <div className="relative flex flex-col w-full">
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="user-id"
                  className="text-sm font-semibold text-[#211545]"
                >
                  User Id
                </label>
                {!isName && (
                  <span className="font-bold text-[11px] text-rose-600">
                    Invalid username
                  </span>
                )}
              </div>
              <input
                ref={inputEl}
                type="text"
                autoFocus
                name="user-id"
                required
                value={userId}
                onChange={() => setUserId(inputEl.current.value)}
                id="used-id"
                placeholder="Enter your user ID"
                className={`w-full px-4 py-3 bg-slate-50 border ${
                  isName ? "border-[#dcd6f7]" : "border-rose-500/80"
                } text-[#211545] rounded-xl placeholder-slate-400 focus:outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/10 text-base font-semibold transition-all duration-300`}
              />
            </div>

            <div className="relative flex flex-col w-full">
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#211545]"
                >
                  Password
                </label>
                {!isPassword && (
                  <span className="font-bold text-[11px] text-rose-600">
                    Invalid password
                  </span>
                )}
              </div>
              <input
                ref={passEl}
                type="password"
                required
                name="password"
                id="password"
                value={password}
                autoComplete="on"
                onChange={() => setPassword(passEl.current.value)}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 bg-slate-50 border ${
                  isPassword ? "border-[#dcd6f7]" : "border-rose-500/80"
                } text-[#211545] rounded-xl placeholder-slate-400 focus:outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/10 text-base font-semibold transition-all duration-300`}
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 px-4 py-3.5 font-bold text-white bg-[#7c3aed] hover:bg-[#6d28d9] rounded-xl shadow-md hover:shadow-[#7c3aed]/25 active:scale-[0.98] transition-all duration-200"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;

"use client";
import React, { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("");



  const handleLogin = async (username, password) => {
    try {
      // POST request 
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ username, password }),
      });

      // Extracting the email from the response.
      const data = await response.json();
      setEmail(data.email);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className=" w-2/3 p-5 rounded bg-white">
        <h1 className="text-center text-black font-bold text-2xl">Login </h1>

        <div className="p-5 text-center ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Getting username and password from the form and call handleLogin.
              const username = e.target.elements.username.value;
              const password = e.target.elements.password.value;
              handleLogin(username, password);
            }}
          >
            <div id="usename" className="mb-4">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                className="py-2 px-2 mx-2 bg-gray-100 border-blue-100 rounded focus:outline-none  focus:border-transparent focus:ring-0"
                placeholder="Enter Username"
              />
            </div>

            <div className="mb-4">
              <label>Password:</label>
              <input type="password" name="password" className="py-2 px-2 mx-2 bg-gray-100 border-blue-100 rounded focus:outline-none  focus:border-transparent focus:ring-0"
                placeholder="Enter Password" />
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
            </div>
          </form>
            <div className="mt-6 text-green-700 font-bold text-2xl">
            {email && <h2>Email: {email}</h2>}
            </div>
        
        </div>
      </div>
    </div>
  );
}

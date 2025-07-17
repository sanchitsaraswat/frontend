// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "0",
    Education_Level: "0",
    Job_Title: "0",
    Years_of_Experience: "",
  });
  const [predictedSalary, setPredictedSalary] = useState(null);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://salary-predictor-backend-htae.onrender.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    setPredictedSalary(result.predicted_salary);
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Blue Left Side */}
      <div className="w-1/2 bg-blue-500 flex flex-col items-center justify-center text-white p-8">
        <h1 className="text-4xl font-bold mb-4">Salary Predictor</h1>
        <p className="text-lg mb-8 text-center">
          Click below to estimate employee salary based on input parameters.
        </p>
        <button
          onClick={handleClick}
          className="bg-white text-blue-600 font-bold py-2 px-6 rounded hover:bg-gray-100 transition"
        >
          Explore Now
        </button>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-md bg-white text-black p-6 rounded shadow"
          >
            <div className="mb-4">
              <label className="block mb-1 font-bold">Age</label>
              <input
                type="number"
                name="Age"
                value={formData.Age}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-bold">Gender</label>
              <select
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-bold">Education Level</label>
              <select
                name="Education_Level"
                value={formData.Education_Level}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="0">High School</option>
                <option value="1">Bachelors</option>
                <option value="2">Masters</option>
                <option value="3">PhD</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-bold">Job Title</label>
              <select
                name="Job_Title"
                value={formData.Job_Title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="0">Software Engineer</option>
                <option value="1">Data Scientist</option>
                <option value="2">Web Developer</option>
                <option value="3">Project Manager</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-bold">Years of Experience</label>
              <input
                type="number"
                name="Years_of_Experience"
                value={formData.Years_of_Experience}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              Predict Salary
            </button>
          </form>
        )}
      </div>

      {/* Red Right Side */}
      <div className="w-1/2 bg-red-500 flex flex-col justify-center items-center p-8 text-white">
        <h2 className="text-3xl font-bold mb-6">Prediction Output</h2>

        {predictedSalary && (
          <>
            <div className="text-2xl font-bold bg-white text-red-500 p-4 rounded shadow-lg">
              Predicted Salary: ₹ {Math.round(predictedSalary)}
            </div>

            <div className="mt-6 bg-white rounded p-4 text-black w-full max-w-lg">
              <h2 className="text-lg font-bold mb-2">Graph: Salary vs Experience</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    {
                      experience: formData.Years_of_Experience,
                      salary: Math.round(predictedSalary),
                    },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="experience" label={{ value: "Experience", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "Salary", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Bar dataKey="salary" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(...registerables);

const InstructorChat = ({ courses = [] }) => {
  const [currChart, setCurrChart] = useState("Students");

  // Generate stable random colors (only once per courses change)
  const colors = useMemo(() => {
    return courses.map(
      () =>
        `rgb(${Math.floor(Math.random() * 200)},
             ${Math.floor(Math.random() * 200)},
             ${Math.floor(Math.random() * 200)})`
    );
  }, [courses]);

  // Students Chart Data
  const chartDataForStudents = {
    labels: courses.map((data) => data.courseName),
    datasets: [
      {
        label: "Total Students",
        data: courses.map((data) => data.totalEnrolledStudent),
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  // Income Chart Data
  const chartDataForIncome = {
    labels: courses.map((data) => data.courseName),
    datasets: [
      {
        label: "Total Income",
        data: courses.map((data) => data.totalAmountGenerated),
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#E5E7EB",
          boxWidth: 12,
        },
      },
    },
  };

  if (!courses.length) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        No Data Available
      </div>
    );
  }

  return (
    <div className="bg-richblack-800 p-5 rounded-xl shadow-md w-full">

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <p className="text-lg font-semibold">Visualize Performance</p>

        {/* Toggle Buttons */}
        <div className="flex bg-richblack-700 rounded-lg p-1 w-fit">
          <button
            onClick={() => setCurrChart("Students")}
            className={`px-4 py-1 rounded-md text-sm transition-all duration-300 ${
              currChart === "Students"
                ? "bg-yellow-400 text-black font-semibold"
                : "text-gray-300"
            }`}
          >
            Students
          </button>

          <button
            onClick={() => setCurrChart("Income")}
            className={`px-4 py-1 rounded-md text-sm transition-all duration-300 ${
              currChart === "Income"
                ? "bg-yellow-400 text-black font-semibold"
                : "text-gray-300"
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full h-[300px] sm:h-[350px]">
        <Pie
          data={
            currChart === "Students"
              ? chartDataForStudents
              : chartDataForIncome
          }
          options={options}
        />
      </div>
    </div>
  );
};

export default InstructorChat;
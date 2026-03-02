import RenderSteps from "./RenderSteps";

export default function AddCourse() {
  return (
    <div className="min-h-screen w-full bg-richblack-900 text-white px-4 sm:px-6 lg:px-10 py-8">
      
      {/* Page Title */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          Add Course
        </h1>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left Section - Steps & Forms */}
          <div className="flex-1 bg-richblack-800 rounded-xl shadow-lg">
            <RenderSteps />
          </div>

          {/* Right Section - Upload Tips */}
          <div className="w-full lg:w-[350px] bg-richblack-800 p-6 rounded-xl shadow-lg h-fit">
            <h2 className="text-lg font-semibold mb-4 text-yellow-400">
              ⚡ Course Upload Tips
            </h2>

            <ul className="space-y-3 text-sm text-richblack-200 list-disc pl-5">
              <li>Set clear and descriptive course title.</li>
              <li>Upload high-quality thumbnail image.</li>
              <li>Write short but impactful course description.</li>
              <li>Add clear learning outcomes.</li>
              <li>Keep course price competitive.</li>
              <li>Use relevant tags for better discoverability.</li>
              <li>Structure content properly in Course Builder.</li>
              <li>Preview course before publishing.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

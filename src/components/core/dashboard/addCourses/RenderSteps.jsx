import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse";

const steps = [
  { id: 1, title: "Course Information" },
  { id: 2, title: "Course Builder" },
  { id: 3, title: "Publish" },
];

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">

      {/* Stepper Container */}
      <div className="w-full max-w-4xl mx-auto">

        {/* Steps */}
        <div className="flex items-center justify-between relative">

          {steps.map((item, index) => (
            <div key={item.id} className="flex flex-col items-center flex-1 relative">

              {/* Circle */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-semibold transition-all duration-300
                ${
                  step === item.id
                    ? "bg-yellow-500 border-yellow-400 text-richblack-900 scale-110"
                    : step > item.id
                    ? "bg-green-500 border-green-400 text-white"
                    : "bg-richblack-700 border-richblack-600 text-richblack-300"
                }`}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>

              {/* Title */}
              <p
                className={`mt-3 text-xs sm:text-sm text-center font-medium
                ${
                  step === item.id
                    ? "text-yellow-400"
                    : "text-richblack-300"
                }`}
              >
                {item.title}
              </p>

              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full flex items-center">
                  <div
                    className={`h-1 w-full border-t-2 border-dashed
                    ${
                      step > item.id
                        ? "border-green-400"
                        : "border-richblack-600"
                    }`}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>

    </div>
  );
};

export default RenderSteps;

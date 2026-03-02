import { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import apiConnector from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentsData";
import CourseCard from "../components/core/Catalog/CourseCard";
import CourseSlider from "../components/core/Catalog/CourseSlider";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [activeTab, setActiveTab] = useState("popular");

  // ================= GET CATEGORY ID =================
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);

        const category_id = res?.data?.data
          ?.find(
            (ct) =>
              ct.name.split(" ").join("-").toLowerCase() ===
              catalogName?.toLowerCase()
          )
          ?._id;

        setCategoryId(category_id);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, [catalogName]);

  // ================= GET CATEGORY DETAILS =================
  useEffect(() => {
    if (!categoryId) return;

    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        if (res?.data) setCatalogPageData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategoryDetails();
  }, [categoryId]);

  // ================= LOADING =================
  if (!catalogPageData) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-lg">
        Loading Courses...
      </div>
    );
  }

  const { selectedCategory, differentCategory, mostSellingCourses } =
    catalogPageData;

  return (
    <div className="bg-richblack-900 text-white min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="w-11/12 max-w-[1200px] mx-auto pt-10 pb-16">
        <p className="text-sm text-richblack-300">
          Home / Catalog /{" "}
          <span className="text-yellow-50 font-medium">
            {selectedCategory?.name}
          </span>
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-4">
          {selectedCategory?.name}
        </h1>

        <p className="text-richblack-300 mt-3 max-w-[700px]">
          {selectedCategory?.description}
        </p>
      </div>

      {/* ================= SECTION WRAPPER ================= */}
      <div className="w-11/12 max-w-[1200px] mx-auto space-y-16 pb-16">
        {/* ================= SECTION 1 ================= */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-semibold">
              Courses to get you started
            </h2>

            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab("popular")}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === "popular"
                    ? "bg-yellow-50 text-black"
                    : "bg-richblack-700 text-richblack-100"
                }`}
              >
                Most Popular
              </button>

              <button
                onClick={() => setActiveTab("new")}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === "new"
                    ? "bg-yellow-50 text-black"
                    : "bg-richblack-700 text-richblack-100"
                }`}
              >
                New
              </button>
            </div>
          </div>

          <CourseSlider Courses={selectedCategory?.courses || []} />
        </section>

        {/* ================= SECTION 2 ================= */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            Top Courses in{" "}
            <span className="text-yellow-50">
              {differentCategory?.name}
            </span>
          </h2>

          <CourseSlider Courses={differentCategory?.courses || []} />
        </section>

        {/* ================= SECTION 3 ================= */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            Frequently Bought Together
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mostSellingCourses?.map((course, index) => (
              <CourseCard
                key={index}
                course={course}
                height={"h-[300px]"}
              />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
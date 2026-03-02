import { toast } from "react-hot-toast";
import { catalogData } from "../apis";
import apiConnector from "../apiConnector";

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      { categoryId }
    );

    if (!response?.data) {
      throw new Error("Could not fetch category page data");
    }

    toast.dismiss(toastId);
    return response.data; // ⭐ direct return
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.dismiss(toastId);
    toast.error(error?.response?.data?.message || "Something went wrong");
    return null;
  }
};

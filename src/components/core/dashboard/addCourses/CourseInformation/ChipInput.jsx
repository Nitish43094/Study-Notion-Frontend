import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
}) {
  const { editCourse, course } = useSelector((state) => state.course);

  const [chips, setChips] = useState([]);

  // Register field
  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, [register, name]);

  // Edit mode data load (with guard)
  useEffect(() => {
    if (editCourse && course?.data?.tag) {
      const tags = course.data.tag;

      if (
        tags.length > 0 &&
        JSON.stringify(tags) !== JSON.stringify(chips)
      ) {
        setChips(tags);
      }
    }
  }, [editCourse, course]);

  // Sync with react-hook-form
  useEffect(() => {
    setValue(name, chips);
  }, [chips, setValue, name]);

  // Add chip
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      const value = event.target.value.trim();
      if (!value) return;

      if (!chips.includes(value)) {
        setChips([...chips, value]);
      }

      event.target.value = "";
    }
  };

  // Remove chip
  const handleDeleteChip = (index) => {
    const updated = chips.filter((_, i) => i !== index);
    setChips(updated);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex w-full flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-900 font-medium"
          >
            {chip}
            <button
              type="button"
              className="ml-2"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}

        <input
          id={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full rounded-md p-2 bg-richblack-700"
        />
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}

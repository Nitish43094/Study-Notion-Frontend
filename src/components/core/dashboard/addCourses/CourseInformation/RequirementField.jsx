import { useEffect, useState } from "react";

const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
  watch,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  // Register field
  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, [register, name]);

  // Sync with react-hook-form
  useEffect(() => {
    setValue(name, requirementList, { shouldValidate: true });
  }, [requirementList, setValue, name]);

  // Watch for edit mode values
  const watchedValue = watch(name);

  useEffect(() => {
    if (
      watchedValue &&
      watchedValue.length > 0 &&
      JSON.stringify(watchedValue) !== JSON.stringify(requirementList)
    ) {
      setRequirementList(watchedValue);
    }
  }, [watchedValue]); // eslint-disable-line

  const handleAddRequirement = () => {
    const value = requirement.trim();

    if (!value) return;

    // prevent duplicates
    if (requirementList.includes(value)) {
      setRequirement("");
      return;
    }

    setRequirementList((prev) => [...prev, value]);
    setRequirement("");
  };

  const handleRemoveRequirement = (index) => {
    setRequirementList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-richblack-5">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full bg-richblack-700 p-2 rounded-md"
        />

        <button
          type="button"
          onClick={handleAddRequirement}
          className="px-4 py-2 bg-yellow-50 text-richblack-900 rounded-md"
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <ul className="space-y-1 mt-2">
          {requirementList.map((item, i) => (
            <li
              key={i}
              className="flex justify-between bg-richblack-700 px-3 py-1 rounded"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(i)}
                className="text-pink-200 text-xs"
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="text-xs text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default RequirementField;

import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  editData = null,
  viewData = null,
}) {
  const [previewSource, setPreviewSource] = useState("")

  // register field with react-hook-form
  useEffect(() => {
    register(name, { required: !editData && !viewData })
  }, [register, name, editData, viewData])

  // set preview when edit/view data available
  useEffect(() => {
    if (editData || viewData) {
      setPreviewSource(editData || viewData)
    }
  }, [editData, viewData])

  // preview selected file
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      setValue(name, file, { shouldValidate: true })
      previewFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video
      ? { "video/mp4": [".mp4"] }
      : { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    multiple: false,
    onDrop,
  })

  const handleCancel = (e) => {
    e.stopPropagation()
    setPreviewSource("")
    setValue(name, null, { shouldValidate: true })
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      <label className="text-sm text-richblack-5">
        {label} {!editData && !viewData && <sup className="text-pink-200">*</sup>}
      </label>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[200px] md:min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500 w-full`}
      >
        <input {...getInputProps()} />

        {previewSource ? (
          <div className="flex flex-col items-center p-4 w-full max-w-md">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="w-full h-auto rounded-md object-cover"
              />
            ) : (
              <video
                controls
                className="w-full rounded-md"
                src={previewSource}
              />
            )}

            {/* Remove button only when not view mode */}
            {!viewData && (
              <button
                type="button"
                onClick={handleCancel}
                className="mt-3 text-sm text-richblack-300 underline"
              >
                Remove
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center p-6 text-center">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className="mt-2 text-sm text-richblack-200">
              Drag & drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span>
            </p>
          </div>
        )}
      </div>

      {/* Error */}
      {errors[name] && (
        <span className="text-xs text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}

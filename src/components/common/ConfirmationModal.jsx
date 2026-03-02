
export default function ConfirmationModal({ modalData }) {
    // console.log("Modal  data ->",modalData)
    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
                <p className="text-2xl font-semibold text-richblack-5">
                    {modalData?.test1}
                </p>
                <p className="mt-3 mb-5 leading-6 text-richblack-200">
                    {modalData?.text2}
                </p>
                <div className="flex items-center gap-x-4">
                    <button
                        onClick={modalData?.btn1Handler}
                        className="bg-yellow-400 py-[5px] px-[15px] cursor-pointer rounded-md font-semibold text-black"
                    >
                        {modalData?.btn1Text}
                    </button>
                    <button
                        className="cursor-pointer rounded-md bg-richblack-200 py-[5px] px-[15px] font-semibold text-richblack-900 transition-all duration-100 hover:scale-95 hover:bg-black hover:text-white hover:border-[1px]"
                        onClick={modalData?.btn2Handler}
                    >
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}
const Card = ({ item, flip = false }) => {
  return (
    <div
      className={`${
        flip ? "min-w-[260px]" : "" } perspective`}
    >
      <div
        className={`relative h-[220px] w-full rounded-xl transition-transform duration-700 
        ${flip ? "group hover:rotate-y-180" : ""}`}
      >
        {/* FRONT */}
        <div className="absolute inset-0 bg-black border rounded-xl p-5 flex flex-col gap-3 backface-hidden shadow-pink-400 shadow-md">
          <h1 className="text-xl font-bold">{item.heading}</h1>
          <p className="text-pure-greys-200 text-sm">
            {item.subHeading}
          </p>
          <div className="flex justify-between mt-auto text-sm">
            <span>{item.lavel}</span>
            <span>{item.lession} Lessons</span>
          </div>
        </div>

        {/* BACK */}
        {flip && (
          <div className="absolute inset-0 bg-richblack-900 border rounded-xl p-5 rotate-y-180 backface-hidden flex items-center justify-center">
            <p className="text-center text-sm text-pure-greys-200">
              📘 Notebook Style Course  
              <br />
              Swipe & Flip to Explore
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
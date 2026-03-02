import React, { useState } from "react";
import HighlightTest from "./HighlightTest";
import Card from "./Card";
const cards = [
    {
        name: "Free",
        heading: "Learn HTML",
        subHeading: "This course Cover the basic concepts of HTML including creating and structuring",
        lavel: "Beginner",
        lession: 6,
    },
    {
        name: "Free",
        heading: "Learn CSS",
        subHeading: "This course Cover the basic concepts of HTML including creating and structuring",
        lavel: "Beginner",
        lession: 6,
    },
    {
        name: "Free",
        heading: "responsive Web design",
        subHeading: "This course teaches responsive web design techniwues, allowing web page to adapage",
        lavel: "Intermidet",
        lession: 6,
    },
    {
        name: "New To Coding",
        heading: "HTML",
        subHeading: "This course Cover the basic concepts of HTML including creating and structuring",
        lavel: "Beginner",
        lession: 6,
    },
    {
        name: "New To Coding",
        heading: "CSS",
        subHeading: "This course Cover the basic concepts of HTML including creating and structuring",
        lavel: "Beginner",
        lession: 6,
    },
    {
        name: "New To Coding",
        heading: "Responsive",
        subHeading: "This course teaches responsive web design techniwues, allowing web page to adapage",
        lavel: "Beginner",
        lession: 6,
    },
    {
        name: "Most Popular",
        heading: "Learn HTML",
        subHeading: "This course Cover the basic concepts of HTML including creating and structuring",
        lavel: "Beginner",
        lession: 6,
    },
    {
        name: "Most Popular",
        heading: "Learn HTML",
        subHeading: "This course Cover the basic concepts of HTML including creating and structuring",
        lavel: "Beginner",
        lession: 6,
    },
    {
        name: "Most Popular",
        heading: "Learn HTML",
        subHeading: "This course Cover the basic concepts of HTML including creating and structuring",
        lavel: "Beginner",
        lession: 6,
    },
    {
        name: "Skill Paths",
        heading: "Learn HTML",
        subHeading: "This course Cover the basic concepts of HTML including creating and structuring",
        lavel: "Beginner",
        lession: 6,
    },
    {
        name: "Skill Paths",
        heading: "Learn HTML",
        subHeading: "This course Cover the basic concepts of HTML including creating and structuring",
        lavel: "Beginner",
        lession: 6,
    },
    {
        name: "Skill Paths",
        heading: "Learn HTML",
        subHeading: "This course Cover the basic concepts of HTML including creating and structuring",
        lavel: "Beginner",
        lession: 6,
    },
    {
        name: "Career Paths",
        heading: "Learn HTML",
        subHeading: "This course Cover the basic concepts of HTML including creating and structuring",
        lavel: "Beginner",
        lession: 6,
    },
    {
        name: "Career Paths",
        heading: "Learn HTML",
        subHeading: "This course Cover the basic concepts of HTML including creating and structuring",
        lavel: "Beginner",
        lession: 6,
    },
    {
        name: "Career Paths",
        heading: "Learn HTML",
        subHeading: "This course Cover the basic concepts of HTML including creating and structuring",
        lavel: "Beginner",
        lession: 6,
    },
]
const tabs = ["Free", "New To Coding", "Most Popular", "Skill Paths", "Career Paths"];
const UnlockPower = () => {
  const [tab, setTab] = useState("Free");

  // desktop = filtered, mobile = all cards
  const filteredCards = cards.filter((c) => c.name === tab);

  return (
    <div className="flex flex-col items-center gap-10 px-4 mb-[-90px]">

      {/* HEADING */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Unlock the <HighlightTest text={"Power of Code."} />
        </h1>
        <p className="text-base md:text-xl text-pure-greys-200">
          Learn to build anything you can imagine
        </p>
      </div>

      {/* TABS (HIDE ON MOBILE) */}
      <div className="hidden md:flex gap-4 bg-richblack-800 p-2 rounded-full text-pure-greys-200">
        {tabs.map((data) => (
          <button
            key={data}
            onClick={() => setTab(data)}
            className={`px-5 py-2 rounded-full transition ${
              tab === data
                ? "bg-black text-white font-bold"
                : "hover:bg-black hover:text-white"
            }`}
          >
            {data}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="w-full">

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCards.map((item, ind) => (
            <Card key={ind} item={item} />
          ))}
        </div>

        {/* MOBILE NOTEBOOK STYLE */}
        <div className="md:hidden flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {cards.map((item, ind) => (
            <Card key={ind} item={item} flip />
          ))}
        </div>

      </div>
    </div>
  );
};

export default UnlockPower;
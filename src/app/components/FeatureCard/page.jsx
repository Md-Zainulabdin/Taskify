import React from "react";
import { BiSolidTimeFive } from "react-icons/bi";

const FeatureCard = ({ features }) => {
  const currentDate = new Date();
  const featureFinishDate = new Date(features?.finishDate);
  const timeDiffernce = featureFinishDate.getTime() - currentDate.getTime();
  const daysleft = Math.ceil(timeDiffernce / (1000 * 3600 * 24));

  return (
    <div className="my-5 bg-white p-5 rounded-2xl">
      <span className="my-2 bg-[#dfa87433] text-[#d58d49] rounded-[4px] px-[6px] py-1 font-medium text-xs">
        {features?.priority}
      </span>

      <h2 className="my-2 font-medium text-[#0d062d]">{features?.name}</h2>
      <p className="text-[#787486] text-xs">{features?.description}</p>

      <div className="mt-7 flex gap-2 items-center justify-between">
        <p className="text-xs flex gap-2 items-center bg-purple-200 px-2 py-1 text-purple-800 rounded-[4px] font-medium">
          <BiSolidTimeFive />
          {daysleft} days left
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;

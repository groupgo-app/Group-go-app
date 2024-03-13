import React from "react";
import cover from "../assets/images/resturant image.jpeg";

const AvailableEvents = ({ events, handleEventClick }) => {
  return (
    <>
      <div
        onClick={() => handleEventClick(events)}
        style={{ aspectRatio: "1 / 1" }}
        className="relative w-full cursor-pointer"

        // className="relative h-full cursor-pointer laptop:h-[206px] laptop:w-[50%] laptop:max-w-[256px]"
      >
        <img
          src={events?.eventImg || cover}
          alt=""
          className="relative h-full w-full rounded-[10px] bg-contain"
        />
        <p className=" absolute bottom-2 left-3 text-base font-normal text-white">
          {events?.eventType}
        </p>
      </div>
    </>
  );
};

export default AvailableEvents;

import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "../context/FormContext";
import { useParams } from "react-router-dom";

const CopyLInkModal = () => {
  const { eventData } = useContext(FormContext);

  let { eventId } = useParams();

  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  };

  const handleCopyClick = () => {
    copyToClipboard(`https://groupgo.netlify.app/${eventData.eventId}`)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="w-full">
        <div className="flex w-full flex-col justify-between gap-[15px] rounded-[15px] bg-white px-2 py-[6px] font-light text-black-clr tablet:flex-row tablet:items-center tablet:gap-0 tablet:border-[1px] tablet:border-[#06081121]">
          <p className="text-wrap rounded-[15px] border-[1px] border-[#06081121] px-2 py-[6px] text-base font-light text-black-clr tablet:border-none ">
            {`https://groupgo.netlify.app/${eventId}`}
          </p>
          <button
            onClick={handleCopyClick}
            className="rounded-[10px] bg-orange-clr px-[18px] py-2 text-white"
          >
            {!isCopied ? "Copy invite link" : "copied"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CopyLInkModal;

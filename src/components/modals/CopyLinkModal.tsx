import { useContext, useState } from "react";
import { FormContext } from "../../contexts/FormContext";

const CopyLInkModal = () => {
  const { eventData } = useContext(FormContext);

  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  };

  const handleCopyClick = () => {
    copyToClipboard(
      `${import.meta.env.VITE_REACT_SITE_URL}/${eventData.eventId}`,
    )
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
            {`${import.meta.env.VITE_REACT_SITE_URL}/${eventData.eventId}`}
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

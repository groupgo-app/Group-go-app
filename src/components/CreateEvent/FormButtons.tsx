import React from "react";
import Loader from "../Loader";

const FormButtons = ({
  handleSubmit,
  isLoadingSubmit,
  handleBackButton,
}: {
  handleSubmit: any;
  isLoadingSubmit: boolean;
  handleBackButton: any;
}) => {
  return (
    <div className="mt-12 flex w-full justify-between tablet:gap-[100px]">
      <div className="w-full">
        <button
          onClick={handleBackButton}
          className="primary_button block tablet:w-[100%]"
          type="button"
        >
          Back
        </button>
      </div>
      <div className="w-full">
        <button
          onClick={handleSubmit}
          className="primary_button block tablet:w-[100%]"
          disabled={isLoadingSubmit}
          type="submit"
        >
          {isLoadingSubmit ? (
            <>
              <Loader />
            </>
          ) : (
            <>Save and Continue</>
          )}
        </button>
      </div>
    </div>
  );
};

export default FormButtons;

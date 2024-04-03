import React from "react";
import Template from "./Template";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import Signin from "./modals/Signin";

const TemplateContainer = () => {
  const { templateData, handleRedirect } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  return (
    <>
      {!user && <Signin />}
      {/* <button
        onClick={handleBackButton}
        className="flex gap-2 items-center text-blue-500"
      >
        <FiArrowLeft />
        Go back
      </button> */}
      <div className="flex w-full flex-wrap justify-center gap-[24px] tablet:justify-between">
        {templateData.map((template) => (
          <Template
            key={template.id}
            template={template}
            handleRedirect={handleRedirect}
            user={user}
          />
        ))}
      </div>
    </>
  );
};

export default TemplateContainer;

// import React from "react";
import Template from "./Template";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { AuthContext } from "../contexts/AuthContext";
import Signin from "./modals/Signin";
import { FormContext } from "../contexts/FormContext";

const TemplateContainer = ({ event }: any) => {
  const { templates } = useContext(AppContext);
  const { handleRedirect } = useContext(FormContext);
  const { user } = useContext(AuthContext);
  return (
    <>
      {!user && <Signin />}

      <div className="flex w-full flex-wrap justify-center gap-[24px] tablet:justify-between">
        {templates!.map((template) => (
          <Template
            key={template.id}
            template={template}
            handleRedirect={handleRedirect}
          />
        ))}
      </div>
    </>
  );
};

export default TemplateContainer;

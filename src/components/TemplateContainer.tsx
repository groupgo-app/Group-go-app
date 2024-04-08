// import React from "react";
import Template from "./Template";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Signin from "./modals/Signin";
import { FormContext } from "../contexts/FormContext";
import { templates } from "../data/templates";

const TemplateContainer = () => {
  let handleRedirect: any, user: any;
  const formContext = useContext(FormContext);
  const authContext = useContext(AuthContext);
  if (formContext && authContext) {
    ({ handleRedirect } = formContext);
    ({ user } = authContext);
  }

  return (
    <>
      {!user && <Signin />}

      <div className="flex w-full flex-wrap justify-center gap-[24px] tablet:justify-between">
        {templates.map((template) => (
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

import React from "react";
// import Underliner from "../Underliner";

const FormSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="create_form_section">
      <h3 className="pb-3">{title}</h3>
      {/* <Underliner /> */}
      {children}
    </div>
  );
};

export default FormSection;

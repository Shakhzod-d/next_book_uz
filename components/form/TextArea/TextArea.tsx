import React, { FC } from "react";
import { TextAreaPropsType } from "./TextArea.types";
import { TextAreaStyled } from "./TextArea.style";
import Label from "../Label/Label";
import Error from "../Error/Error";
const TextArea: FC<TextAreaPropsType> = ({
  label = "",
  className = "",
  params,
  error,
}) => {
  return (
    <div className={className}>
      {label && <Label label={label} />}
      <TextAreaStyled {...params} error={!!error} />
      {error && <Error message={error.message} />}
    </div>
  );
};

export default TextArea;

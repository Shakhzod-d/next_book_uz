import Image from "next/image";
import React from "react";
import Logo from "../../../../../assets/images/Logo.svg";
import CancelIcon from "@/assets/icons/CancelIcon";
import { IDialogHeader } from "./DialogHeader.types";
import { DialogHeaderStyled } from "./DialogHeader.style";

const DialogHeader: React.FC<IDialogHeader> = ({ onClose }) => {
  return (
    <DialogHeaderStyled className="d-flex justify-content-between align-items-center pb-3">
      {/* <img src={Logo} alt="Book uz" /> */}
      <Image src={Logo} alt="Book uz" width={150} height={50} priority />
      <div className="dialog-cancel-icon" onClick={onClose}>
        <CancelIcon />
      </div>
    </DialogHeaderStyled>
  );
};

export default React.memo(DialogHeader);

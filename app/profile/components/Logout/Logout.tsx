"use client";

import React from "react";
import { DialogContent } from "@mui/material";
import { Button } from "@/components";
import { LayoutContext } from "@/layout/context";
import { ProfileContext } from "../../context";
import { useTranslation } from "react-i18next";
import { DialogStyled, LogoutStyled } from "./Logout.style";

const Logout: React.FC<{ onClose: () => void; open: boolean }> = ({
  onClose,
  open,
}) => {
  const { t } = useTranslation();

  const {
    actions: { logout },
  } = React.useContext(ProfileContext);

  const {
    state: { isAuth },
    actions: { setAuthOpen, setIsAuth },
  } = React.useContext(LayoutContext);

  return (
    <DialogStyled
      className="logout-dialog"
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogContent>
        <LogoutStyled className="logout p-2">
          <h2 className="text-center dialog-title  font-600 mb-4 ">
            {t("PROFILE.DO_YOU_REALLY_WANT_TO_LEAVE_YOUR_PROFILE")}
          </h2>
          <div className="d-flex justify-content-between">
            <Button
              className="logout-cancel-btn"
              value={t("COMMON.CANCEL")}
              variant="contained"
              color="secondary"
              type="button"
              onClick={onClose}
            />
            <Button
              className="logout-save-btn"
              value={t("COMMON.YES")}
              variant="contained"
              color="error"
              type="button"
              onClick={() => logout()}
            />
          </div>
        </LogoutStyled>
      </DialogContent>
    </DialogStyled>
  );
};

export default Logout;

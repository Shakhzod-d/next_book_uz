"use client";

import { FormControl, MenuItem } from "@mui/material";
import React from "react";
import browserStorage from "@/services/storage/browserStorage";
import { SelectStyled } from "./ChangeLanguage.style";
import { useTranslation } from "react-i18next";

const ChangeLanguage = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = React.useState(
    browserStorage.get("i18nextLng") || "uz"
  );

  const handleChange = (event: any) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
    window.location.reload();
  };

  return (
    <FormControl>
      <SelectStyled value={language} onChange={handleChange}>
        {/* <MenuItem value="uz">O'zbek</MenuItem>
                <MenuItem value="ru">Русский</MenuItem> */}
        <MenuItem value="uz">UZ</MenuItem>
        <MenuItem value="ru">RU</MenuItem>
      </SelectStyled>
    </FormControl>
  );
};

export default ChangeLanguage;

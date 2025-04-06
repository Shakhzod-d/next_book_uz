"use client";

import React, { useContext } from "react";
import { TabsStyled } from "./Tab.style";
import { Tab as MUITab } from "@mui/material";
import { ITab, TTabValue } from "./Tab.types";
import { useTranslation } from "react-i18next";
import { BookDescription, Commentary, Quotes } from "../components";
import { BookDetailsContext } from "../../../context";

const Tab: React.FC<ITab> = ({ description, isLoading, bookId }) => {
  const { t } = useTranslation();

  // const [value, setValue] = React.useState<TTabValue>(
  //   (state as TTabValue) || "information"
  // ); // MUST CHECK
  const [value, setValue] = React.useState<TTabValue>(
    ((typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("tab")) as TTabValue) ||
      "information"
  );

  const {
    state: {},
    actions: {},
  } = useContext(BookDetailsContext);

  const handleChange = (event: React.SyntheticEvent, newValue: TTabValue) => {
    setValue(newValue);
  };

  const tabComponent = React.useMemo(
    () => ({
      information: (
        <BookDescription description={description} isLoading={isLoading} />
      ),
      commentary: <Commentary bookId={bookId} />,
      quote: <Quotes />,
    }),
    [description, bookId]
  );

  return (
    <>
      <TabsStyled
        value={value}
        onChange={handleChange}
        className="mb-3"
        variant="scrollable"
      >
        <MUITab
          value="information"
          label={t("BOOK_DETAILS.INFORMATION")}
          className="me-4 tab-item"
        />
        <MUITab
          value="commentary"
          label={t("BOOK_DETAILS.COMMENTARY")}
          className="me-4 tab-item"
        />
        <MUITab
          value="quote"
          label={t("BOOK_DETAILS.QUOTES")}
          className="me-4 tab-item"
        />
      </TabsStyled>
      <div className="mb-5">
        <React.Suspense fallback="">{tabComponent[value]}</React.Suspense>
      </div>
    </>
  );
};

export default Tab;

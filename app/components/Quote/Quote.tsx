"use client";

import React, { useContext, useEffect } from "react";
import get from "lodash.get";

import { QuoteStyled } from "./Quote.style";
import { REQUEST_STATUS } from "@/hooks/useRequest/useRequest.constants";
import { HomeContext } from "../../context";

const Quote = () => {
  const {
    state: {
      getQuoteState: { getQuoteResponse, getQuoteStatus, getQuoteError },
    },
    actions: { getQuote },
  } = useContext(HomeContext);

  useEffect(() => {
    getQuote();
  }, []);

  if (REQUEST_STATUS.failed === getQuoteStatus) {
    return get(getQuoteError, "response.data.message", "");
  }

  if (REQUEST_STATUS.loading === getQuoteStatus) {
    return null;
  }

  if (!get(getQuoteResponse, "data", null)) return null;
  return (
    <QuoteStyled>
      <div className="container">
        <div className="quote">
          <div className="quote-top">
            <h1>{get(getQuoteResponse, "data.quote", "")}</h1>
          </div>
          <div className="quote-bottom">
            <p className="author-name">
              {get(getQuoteResponse, "data.author", "")}
            </p>
          </div>
        </div>
      </div>
    </QuoteStyled>
  );
};

export default Quote;

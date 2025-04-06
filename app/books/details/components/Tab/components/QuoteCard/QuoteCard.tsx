import React from "react";
import { QuoteCardStyled } from "./QuoteCard.style";

const QuoteCard = () => {
  return (
    <QuoteCardStyled className="py-2">
      <div className="quote-msg mb-2">
        “Yeqilganingni o’zi sen uchun o’rningdan turish uchun eng yaxshi
        motivatsiya bo’lishi kerak”
      </div>
      <div className="quote-author">© Abdukarim Mirzayev</div>
    </QuoteCardStyled>
  );
};

export default QuoteCard;

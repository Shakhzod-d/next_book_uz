"use client";

import React from "react";
import { Box } from "@mui/material";
import { Info } from "../components";
import { Slider } from "@/components";

const BookDetails = () => {
  const [authorId, setAuthorId] = React.useState<string>();
  const [bookId, setBookId] = React.useState<string>();

  return (
    <div className="container">
      <Box px={{ xs: 0.5 }}>
        <Info setAuthorId={setAuthorId} setBookId={setBookId} />
        <Slider
          url="book"
          search={`authorIds=${authorId}`}
          enabled={!!authorId}
          title="AUTHOR.AUTHOR_BOOKS"
        />
        <Slider
          url="book/same"
          search={`bookId=${bookId}`}
          enabled={!!bookId}
          title="DETAILS.SIMILAR_BOOKS"
        />
      </Box>
    </div>
  );
};

export default BookDetails;

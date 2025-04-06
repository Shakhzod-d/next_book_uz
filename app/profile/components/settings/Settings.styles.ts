import styled from "@emotion/styled";
import get from "lodash.get";

export const Wrapper = styled.div`
  label {
    color: ${({ theme }) => get(theme, "palette.text.8282")} !important;
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
  input,
  textarea {
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
  h1.tab-content-title {
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 24px;
  }
  @media screen and (max-width: 900px) {
    padding: 0 !important;
  }
  @media screen and (max-width: 600px) {
    margin-bottom: 30px;

    .submit-edit {
      padding: 12px;
      width: 100%;
    }
    .gender-select {
    }
    .gender-select > div > div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }
  }
`;

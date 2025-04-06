import styled from "@emotion/styled";
import get from "lodash.get";

export const SearchPanelStyled = styled("form")<{ isVisibleInput: boolean }>`
  position: relative;
  .search-input {
    position: absolute;
    right: 0;
    top: 0;
    top: 50%;
    transform: translateY(-80%);
    .search-icon-wrap {
      .line {
        background-color: ${({ theme, isVisibleInput }) =>
          isVisibleInput ? get(theme, "palette.grey.main") : "transparent"};
        width: 1px;
        height: 14px;
      }
      .cancel-icon {
        svg {
          path {
            fill: ${({ theme }) => get(theme, "palette.grey.main")};
          }
        }
      }
      button.search-icon {
        outline: none;
        border: none;
        background: transparent;
        svg {
          path {
            fill: ${({ theme, isVisibleInput }) =>
              isVisibleInput
                ? get(theme, "palette.mode") === "light"
                  ? get(theme, "palette.grey.main")
                  : "#fff"
                : get(theme, "palette.mode") === "light"
                  ? get(theme, "palette.grey.555")
                  : "#fff"};
          }
        }
      }
    }
    input {
      padding: 8px 12px;
      outline: none;
      box-shadow: none;
      transition: all 0.05s linear;
      width: ${({ isVisibleInput }) => (isVisibleInput ? "300px" : "0")};
      background-color: ${({ theme, isVisibleInput }) =>
        isVisibleInput
          ? get(theme, "palette.background.default")
          : "transparent"};

      @media screen and (max-width: 600px) {
        width: ${({ isVisibleInput }) => (isVisibleInput ? "100px" : "0")};
      }
    }

    fieldset {
      outline: none;
      border: none;
      border-radius: 8px;
      box-shadow: none;
      border: 1px solid
        ${({ theme, isVisibleInput }) =>
          isVisibleInput
            ? get(theme, "palette.text.info")
            : "transparent"} !important;
    }
  }
`;

export const BookListStyled = styled("div")`
  position: absolute;
  top: 15px;
  left: -373px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  background-color: ${({ theme }) =>
    get(theme, "palette.background.whiteInfo")};
  padding: 1rem;
  width: 400px;
  z-index: 5;
  @media screen and (max-width: 900px) {
    width: 320px;
  }
  @media screen and (max-width: 900px) {
    left: -215px;
    width: 260px;
  }
  .search-popover-header {
    .search-popover-label {
      color: ${({ theme }) => get(theme, "palette.text.8282")};
      @media screen and (max-width: 900px) {
        font-size: 14px;
      }
    }
    .search-popover-all-views {
      @media screen and (max-width: 900px) {
        font-size: 14px;
      }
      color: ${({ theme }) => get(theme, "palette.text.warning")};
      svg path {
        fill: ${({ theme }) => get(theme, "palette.text.warning")};
      }
    }
  }

  .no-books-text {
    color: ${({ theme }) => get(theme, "palette.text.main")};
    @media screen and (max-width: 900px) {
      font-size: 14px;
    }
  }

  .search-popover-list {
    .search-popover-list-item {
      :hover {
        cursor: pointer;
      }
      .search-popover-list-img {
        aspect-ratio: 3/4;
        max-height: 80px;
        @media screen and (max-width: 900px) {
          max-height: 60px;
        }
      }
      .popover-list-name {
        color: ${({ theme }) => get(theme, "palette.text.main")};
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        @media screen and (max-width: 900px) {
          font-size: 14px;
        }
        @media screen and (max-width: 900px) {
          padding-right: 5px;
        }
      }
      .popover-list-author-name {
        color: ${({ theme }) => get(theme, "palette.text.8282")};
        font-size: 14px;
        @media screen and (max-width: 900px) {
          font-size: 12px;
        }
      }
      .flex-grow {
        flex-grow: 1;
      }
      .popover-list-price {
        color: ${({ theme }) => get(theme, "palette.text.main")};
        font-family: "Montserrat", sans-serif;
        font-style: normal;
        font-weight: 500;
        @media screen and (max-width: 900px) {
          font-size: 14px;
        }
      }
    }
  }
`;

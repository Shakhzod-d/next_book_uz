import styled from "@emotion/styled";
import get from "lodash.get";

export const AuthorInfoStyled = styled("div")<any>`
  .lazy-load-image-background {
    width: 100%;
    height: 100%;
    img.author-image {
      aspect-ratio: 1/1;
      max-width: 400px;
      max-height: 400px;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .author-fullname {
    color: ${({ theme }) => get(theme, "palette.text.main")};
  }

  .book-number {
    color: ${({ theme }) => get(theme, "palette.text.main")};
  }
  .about-text {
    color: ${({ theme }) => get(theme, "palette.text.main")};
  }
  p.author-years {
    color: ${({ theme }) => get(theme, "palette.text.secondary")};
  }
`;

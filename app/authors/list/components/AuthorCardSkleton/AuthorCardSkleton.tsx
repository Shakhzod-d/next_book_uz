import { Skeleton } from "@mui/material";
import { AuthorCardStyled } from "../AuthorCard/AuthorCard.style";

const AuthorCardSkleton = () => {
  return (
    <AuthorCardStyled className="d-flex">
      <div className="skeleton-left">
        <Skeleton className="author-img" variant="circular" />
      </div>
      <div className="skeleton-right">
        <div>
          <Skeleton
            className="author-name skleton"
            variant="text"
            width="100%"
          />
        </div>
        <div>
          <Skeleton className="skleton mb-1" variant="text" width="50%" />
        </div>

        <div>
          <Skeleton
            className="book-number skleton"
            variant="text"
            width="40%"
          />
        </div>
      </div>
    </AuthorCardStyled>
  );
};

export default AuthorCardSkleton;

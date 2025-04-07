import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const NotFoundPage = () => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<any>(null);

  useEffect(() => {
    // Run only on the client side
    const queryParam = searchParams.get("query");
    setQuery(queryParam);
  }, [searchParams]);

  if (query === null) return <div>Loading...</div>;

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Search Query: {query}</p>
    </div>
  );
};

export default NotFoundPage;

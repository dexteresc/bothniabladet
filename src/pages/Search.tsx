import { useSearchParams } from "react-router-dom";

function Search() {
  // Get the search query from the URL
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div>
      <h1>{query}</h1>
    </div>
  );
}

export default Search;

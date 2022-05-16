import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Photo, searchPhotos } from "@/api/photo";
import PhotoGrid from "@/components/PhotoGrid";

function Search() {
  // Get the search query from the URL
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    if (!query) {
      return;
    }
    searchPhotos(query)
      .then((result) => {
        setPhotos(result);
      })
      .catch(() => {
        setPhotos([]);
      });
  }, [query]);

  return (
    <div>
      <h1>
        Search for <em>&quot;{query}&quot;</em>
      </h1>
      <PhotoGrid photos={photos} text={`No photos found for "${query}"`} />
    </div>
  );
}

export default Search;

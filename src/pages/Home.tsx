import { useEffect, useState } from "react";
import { Photo, getPhotos } from "@/api/photo";
import PhotoGrid from "@/components/PhotoGrid";
import Loading from "@/components/Loading";

function Home() {
  const [error, setError] = useState<null | Error>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    getPhotos()
      .then((result) => {
        setIsLoaded(true);
        setPhotos(result);
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  }, []);

  return (
    <div className="flex flex-col">
      {isLoaded ? (
        <>
          <header className="mb-4">
            <h1 className="font-semibold text-3xl">All</h1>
          </header>
          <section>
            <PhotoGrid photos={photos} text={error?.message} />
          </section>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Home;

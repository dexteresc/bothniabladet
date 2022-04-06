import { useEffect, useState } from "react";
import { Photo, getPhotos } from "@/api/photo";
import PhotoGrid from "@/components/PhotoGrid";
import ThemeButton from "@/components/ThemeButton";

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
    <main className="flex flex-col">
      <header className="mb-4">
        <h1 className="font-semibold text-2xl">All</h1>
      </header>
      <main>
        {error && <div>Error: {error.message}</div>}
        {!isLoaded && <div>Loading...</div>}
        {isLoaded && !error && <PhotoGrid photos={photos} />}
      </main>
      <ThemeButton />
    </main>
  );
}

export default Home;

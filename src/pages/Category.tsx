import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Photo } from "@/api/photo";
import Loading from "@/components/Loading";
import PhotoGrid from "@/components/PhotoGrid";
import { useAlert } from "@/contexts/alert";

export default function Category() {
  const params = useParams();
  console.log(params);
  const { addAlert } = useAlert();

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<null | Error>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex flex-col">
      <header className="mb-4">
        <h1 className="font-semibold text-2xl">{params["*"]}</h1>
      </header>
      <section>
        {!isLoaded && <Loading />}
        {isLoaded && !error && <PhotoGrid photos={photos} />}
      </section>
    </div>
  );
}

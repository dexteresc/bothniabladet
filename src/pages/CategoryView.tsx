import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Photo } from "@/api/photo";
import Loading from "@/components/Loading";
import PhotoGrid from "@/components/PhotoGrid";
import { useAlert } from "@/contexts/alert";
import { Category, getCategory, getPhotosByCategory } from "@/api/category";

export default function CategoryView() {
  const params = useParams();
  const navigate = useNavigate();
  const { addAlert } = useAlert();

  const [category, setCategory] = useState<Category | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const parameterStr = params["*"];
    if (!parameterStr) {
      navigate("/");
      return;
    }
    // Split parameterStr by / then take the last one
    let categoryId: string | number | undefined = parameterStr.split("/").pop();
    // categoryId to number
    if (categoryId) {
      categoryId = parseInt(categoryId, 10);
      if (Number.isNaN(categoryId)) {
        addAlert("error", "Invalid category id");
        navigate("/");
        return;
      }
    } else {
      addAlert("error", "Invalid category id");
      navigate("/");
      return;
    }
    // Create promise
    Promise.all([getCategory(categoryId), getPhotosByCategory(categoryId)])
      .then(([cat, pho]) => {
        setCategory(cat);
        setPhotos(pho);
        setIsLoaded(true);
      })
      .catch((err) => {
        setError(
          err.response.data ? new Error(err.response.data.message) : err
        );
        addAlert("error", err.response?.data || err.message);
        if (err.response?.status === 404) {
          navigate("/");
        }
      });
  }, [params]);

  return (
    <div className="flex flex-col">
      {isLoaded ? (
        <>
          {category && (
            <header className="mb-4 flex justify-between">
              <h1 className="font-semibold text-3xl">{category.name}</h1>
            </header>
          )}
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

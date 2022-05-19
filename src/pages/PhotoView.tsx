import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { deletePhoto, getPhoto, Photo } from "@/api/photo";
import Modal from "@/components/Modal";
import { useAlert } from "@/contexts/alert";
import { useCart } from "@/contexts/cart";
import Image from "@/components/Image";

function PhotoView({ photo }: { photo: Photo }) {
  const navigate = useNavigate();
  const { addAlert } = useAlert();
  const { addItem, cart } = useCart();
  const handleDelete = () => {
    deletePhoto(photo.id)
      .then(() => {
        addAlert("success", "Photo deleted");
      })
      .catch((err) => {
        addAlert("error", err.message);
      })
      .finally(() => {
        navigate(-1);
      });
  };

  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    // on click anywhere, close
    const handleClick = (e: MouseEvent) => {
      if (e.target) setInfoOpen(false);
    };
    if (infoOpen) {
      // Click outside to close
      document.addEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [infoOpen]);

  return (
    <div className="flex flex-col">
      <section className="mb-2">
        <h1 className="text-2xl font-bold mr-14 mb-2">{photo.title}</h1>
        <p className="mb-4">{photo.description}</p>
        <Image
          url={photo.url}
          alt={photo.title}
          owned={!!photo.useCount}
          className="max-h-[60vh] h-auto max-w-full rounded-lg mx-auto"
        />
      </section>
      <footer className="relative flex justify-end">
        <button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-700 rounded-lg px-2 py-1 ml-1"
          onClick={() => setInfoOpen(!infoOpen)}
        >
          <Icon value="info" className="text-white" />
        </button>
        {/* Info hover box */}
        {infoOpen && (
          <div className="absolute bottom-full mb-2 right-0 px-4 py-2 bg-black rounded text-white">
            <p>
              <span className="font-semibold">Photo id:</span> {photo.id}
            </p>
            <p>
              <span className="font-semibold">Created at:</span>{" "}
              {new Date(photo.createdAt).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Updated at:</span>{" "}
              {new Date(photo.updatedAt).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">URL:</span> {photo.url}
            </p>
            {photo.useCount && (
              <p>
                <span className="font-semibold">Uses left:</span>{" "}
                {photo.useCount}
              </p>
            )}
          </div>
        )}

        <button
          type="button"
          className=" bg-blue-500 hover:bg-blue-700 rounded-lg px-2 py-1 ml-1"
          onClick={() => {
            if (cart.find((p) => p.id === photo.id)) {
              addAlert("error", "Photo already in cart");
              return;
            }
            addItem(photo);
            navigate(-1);
            addAlert("success", "Photo added to cart");
          }}
        >
          <Icon value="shopping_cart" className="text-white" />
        </button>
        <a
          href={`http://localhost:8080${photo.url}/download`}
          download={photo.title}
          className="hover:text-white bg-green-500 hover:bg-green-700 rounded-lg px-2 py-1 ml-1"
        >
          <span className="material-icons flex h-7 justify-center items-center">
            download
          </span>
        </a>
        <button
          type="button"
          className="text-white bg-red-500 hover:bg-red-700 rounded-lg px-2 py-1 ml-1"
          onClick={handleDelete}
        >
          <Icon value="delete" className="text-inherit" />
        </button>
      </footer>
    </div>
  );
}

export function PhotoViewFull() {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const { addAlert } = useAlert();
  useEffect(() => {
    getPhoto(Number(photoId))
      .then((result) => {
        setPhoto(result);
      })
      .catch((err) => {
        addAlert("error", err.message);
      });
  }, [photoId]);

  return <div>{photo && <PhotoView photo={photo} />}</div>;
}

export function PhotoModal() {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const navigate = useNavigate();
  const { addAlert } = useAlert();

  useEffect(() => {
    getPhoto(Number(photoId))
      .then((result) => {
        setPhoto(result);
      })
      .catch((err) => {
        addAlert("error", err.message);
        navigate(-1);
      });
  }, [photoId]);

  return (
    <Modal isOpen={!!photo} onClose={() => navigate(-1)} className="px-2">
      {photo && <PhotoView photo={photo} />}
    </Modal>
  );
}

export default PhotoView;

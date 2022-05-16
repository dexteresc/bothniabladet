import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { deletePhoto, getPhoto, Photo } from "@/api/photo";
import Modal from "@/components/Modal";
import { useAlert } from "@/contexts/alert";

function PhotoView({ photo }: { photo: Photo }) {
  const navigate = useNavigate();
  const { addAlert } = useAlert();
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

  return (
    <div className="flex flex-col">
      <section className="mb-2">
        <h1 className="text-2xl font-bold">{photo.title}</h1>
        {photo.description}
        <img
          src={`http://localhost:8080${photo.url}`}
          alt={photo.title}
          className="max-h-64 h-auto max-w-full rounded-lg"
        />
      </section>
      <footer className="flex justify-end">
        <a
          href={`http://localhost:8080${photo.url}/download`}
          download={photo.title}
          className="hover:text-white"
        >
          <Icon value="get_app" className="text-inherit" />
        </a>
        <button
          type="button"
          className="ml-2 text-white bg-red-500 hover:bg-red-700 rounded-lg"
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
    <Modal isOpen={!!photo} onClose={() => navigate(-1)}>
      {photo && <PhotoView photo={photo} />}
    </Modal>
  );
}

export default PhotoView;

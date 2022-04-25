import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { deletePhoto, getPhoto, Photo } from "@/api/photo";
import Modal from "@/components/Modal";

function PhotoView({ photo }: { photo: Photo }) {
  const navigate = useNavigate();
  const handleDelete = () => {
    deletePhoto(photo.id)
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col">
      <section className="mb-2">
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

  useEffect(() => {
    console.log(photoId);
    getPhoto(Number(photoId))
      .then((result) => {
        setPhoto(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [photoId]);

  return <div>{photo && <PhotoView photo={photo} />}</div>;
}

export function PhotoModal() {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPhoto(Number(photoId))
      .then((result) => {
        setPhoto(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [photoId]);

  return (
    <Modal isOpen={!!photo} onClose={() => navigate(-1)} title={photo?.title}>
      {photo && <PhotoView photo={photo} />}
    </Modal>
  );
}

export default PhotoView;

import { Link, useLocation } from "react-router-dom";
import { Photo } from "@/api/photo";
import Icon from "./Icon";
import Image, { ImageDownload } from "./Image";

function PhotoItem({ photo }: { photo: Photo }) {
  const location = useLocation();

  return (
    <div className="rounded-lg bg-gray-200 dark:bg-gray-700 relative z-0 m-2 h-min">
      <Link to={`/photo/${photo.id}`} state={{ backgroundLocation: location }}>
        <Image
          url={photo.url}
          alt={photo.title}
          className="max-h-64 h-auto max-w-full peer rounded-lg"
        />
      </Link>
      <div className="flex justify-between absolute p-1 right-0 top-0 left-0 w-full rounded-t-lg bg-gray-900 transition-opacity opacity-0 hover:opacity-50 peer-hover:opacity-50">
        <div className="text-white "> {photo.title} </div>
        <ImageDownload
          url={photo.url}
          download={photo.title}
          className="hover:text-white"
        >
          <Icon value="get_app" className="text-inherit" />
        </ImageDownload>
      </div>
    </div>
  );
}
function PhotoGrid({ photos, text }: { photos: Photo[]; text?: string }) {
  return photos.length > 0 ? (
    <div className="-mx-2 flex flex-wrap">
      {photos.map((photo) => (
        <PhotoItem key={photo.id} photo={photo} />
      ))}
    </div>
  ) : (
    <div className="text-center p-4 border border-gray-500 rounded">
      {text ?? "No photos found"}
    </div>
  );
}

export default PhotoGrid;

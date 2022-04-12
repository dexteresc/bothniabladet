import { Photo } from "@/api/photo";

function PhotoItem({ photo }: { photo: Photo }) {
  return (
    <div className="photo-grid__item">
      <img src={photo.url} alt={photo.title} />
    </div>
  );
}
function PhotoGrid({ photos, text }: { photos: Photo[]; text?: string }) {
  return (
    <div className="">
      {photos.length > 0 ? (
        <div className="p-2 grid grid-flow-col grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <PhotoItem key={photo.id} photo={photo} />
          ))}
        </div>
      ) : (
        <div className="text-center p-4 border border-gray-500 rounded">
          {text ?? "No photos found"}
        </div>
      )}
    </div>
  );
}

export default PhotoGrid;
